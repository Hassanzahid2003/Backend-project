// const asynchhandler = (fn) => async (req,res,next) => {
//     try {
//         await fn()
//     } catch (error) {
//         res.status(err.code || 500).json({
//             message:  err.message,
//             successful:  false
//         })
//     }
// }

const asynchandler=  (fn) => {
    (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).catch((err)=>next(err))
    }
}

export {asynchandler}