import mongoose from "mongoose";

const bookticket =new mongoose.Schema({
    time:{
        type:String
    },
    seats:{
        type:String
    }
})
const book=mongoose.model("book",bookticket)
export default book