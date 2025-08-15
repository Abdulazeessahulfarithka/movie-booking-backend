import mongoose from "mongoose";

const updateSchema =new mongoose.Schema({

    moviename:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    aboutmovie:{
        type:String
    },
    cast:{
        type:String
    },
    crew:{
        type:String
    },
    ratings:{
        type:String
    }
})
const Update =mongoose.model("update",updateSchema)
export default Update