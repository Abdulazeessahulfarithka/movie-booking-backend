import mongoose from "mongoose";

const orderSchema= new mongoose.Schema({
    products:[
        {
            type:mongoose.ObjectId,
            ref:"Products",
        },
    ],
    payments:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"users"
    },
    status:{
        type:String,
        default:"Not process",
        enum:["Not procees","procesing","shipped","delivered","cancel"]

    },

},
{timestamps:true}
)
export default mongoose.model("Order",orderSchema)