import Update from "../Model/updatedModel.js";

export const recommendMovie= async (req,res) =>{
    try{
        const {moviename,image,aboutmovie,cast,crew,ratings}=req.body;

        const recommendMovie =new Update({
            moviename,
            image,
            aboutmovie,
            cast,
            crew,
            ratings,
        })
         await recommendMovie.save()
         res.status(201).json({
            sucess:true,
            message:"movie added sucess"
         })   
    } catch(error){
        res.status(500).json({
      success: false,
      message: "Error adding movie",
      error: error.message,
    });
    }
}
//get-movie

export const getmovie=async (req,res) => {
    try{
     const movie =await Update.find()
     if(!movie.length){
        return res.status(404).json({
            sucess:false,
            message:'no movies found',
        })
     }
      res.status(200).json({
        sucess:true,
        message:"Movies fetched sucessfully",
        movie,
      })
    }catch(error){
        console.log("error")
    }

}