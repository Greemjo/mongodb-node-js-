import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';


export const register = async (req, res)=>{
    try{
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json(errors.array());
     }
     const password = req.body.password;
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);
     const doc = new UserModel({
         email: req.body.email,
         fullName: req.body.fullName,
         avatarUrl: req.body.avatarUrl,
         passwordHash: hash,
     });
 
     const user = await doc.save();
     const token = jwt.sign(
         {
         _id: user._id,
         },
         'secret123',
         {
             expiresIn: '30d',
         },
     );
     const { passwordHash, ...userData } = user._doc;
 
     res.json({
         ...userData,
         token,
     });
 
    } catch (err){
     console.log(err)
         res.status(500).json({
             massage:'Не удалос зарегистрироватся',
         });
    }
};
export const login = async (req, res) => {
    try{
        const user = await UserModel.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).json({
                massage: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass){
            return res.status(400).json({
                massage: 'Неверный пароль или логин',
            });
        }
        const token = jwt.sign(
            {
            _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );
        const { passwordHash, ...userData } = user._doc;

        res.json({
           
        });

    } catch (err){
    console.log(err)
        res.status(500).json({
            massage:'Нет доступа',
        });
   }
};
export const getAll = async (req, res ) =>{
    try {
        const posts = await UserModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'Не удалось получить пользователей',
        });
        
    }
};
export const getMe = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId);
        if(!user){
            return res.status(404).json({
                massage: 'Пользователь не найден',
            })
        }
        res.json({
            success: true,
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            massage:'Не удалос авторизоватся',
        });
    }
};