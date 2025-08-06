import mongoose from "mongoose";

const movieschema=new mongoose.Schema ({

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
const movie= mongoose.model("movie",movieschema)
export default movie