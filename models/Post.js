import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const PostSchema = new mongoose.Schema(
    {
    title: {
        type:String,
        required:true,

    },
    text:{
        type:String,
        required:true,
        unique:true,
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:3,
    },
    viewsCountL:{
        type: Number,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },

    ImageUrl: String,
    },
    {
        timestamps:true,
    },
);
PostSchema.plugin(mongoosePaginate);
export default mongoose.model('Post', PostSchema );