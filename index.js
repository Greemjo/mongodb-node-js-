import experss from 'express';
import mongoose from 'mongoose';
import { registerValidation , loginValidation, postValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose
        .connect('mongodb+srv://admin:admin@cluster0.2iotmds.mongodb.net/blog')
        .then (() => console.log('db ok'))
        .catch((err) => console.log('db error', err ));  

const app = experss();

app.use(experss.json());

app.post('/auth/login',loginValidation, UserController.login );
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/users', UserController.getAll);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth,postValidation, PostController.create);
 
app.listen(5000, (err) => {
    if(err){
        return console.log(err);
    }  
    console.log('Server OK');
});