
export default function catchError(myFunc){
    return(req,res) => {
        myFunc(req,res).catch((err) => {
            res.status(500).json({message: err.message})
        })
    }
}
