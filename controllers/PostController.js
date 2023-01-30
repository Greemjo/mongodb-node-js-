import PostModel from "../models/Post.js";

export const getAll = async (req, res ) =>{
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'Не удалось получить статью',
        });
        
    }
};
export const getOne = async (req, res ) => {
    try {
        const postId = req.params.id;

        PostModel.findByIdAndUpdate(
        {
            _id: postId,
        },
        {
            $inc: { viewsCountL: 1},
        },
        {
            returnDocument: 'after',
        },
        (err,doc) => {
            if(err){
                console.log(err);
            return res.status(500).json({
                    massage: 'Не удалось верунть статью',
                });
            }
            if(!doc){
                return res.status(404).json({
                    massage:'Статья не найдена'
                });
            }
            res.json(doc);
        },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'Не удалось получить статью',
        });
        
    }
};

export const remove = async (req, res ) => {
    try {
        const postId = req.params.id;

        PostModel.findByIdAndUpdate(
        {
            _id: postId,
        },
        {
            $inc: { viewsCountL: 1},
        },
        {
            returnDocument: 'after',
        },
        (err,doc) => {
            if(err){
                console.log(err);
            return res.status(500).json({
                    massage: 'Не удалось верунть статью',
                });
            }
            if(!doc){
                return res.status(404).json({
                    massage:'Статья не найдена'
                });
            }
            res.json(doc);
        },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'Не удалось получить статью',
        });
        
    }
};
export const create = async (req, res ) =>{
    try {
        const doc = new PostModel({
            title: req.body.title,
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            user:req.body.userId,
        });

        const post = await doc.save();
        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'Не удалось создать статью'
        })
    }
}