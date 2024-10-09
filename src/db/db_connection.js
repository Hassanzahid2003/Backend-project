import mongoose from "mongoose";
const connect_db = (async ()=>{
    try {
        const connection_db = await mongoose.connect(`${process.env.MONGODB_URI }`)
        console.log(`${connection_db.connection.host}`)
    } catch (error) {
        console.error(error)
    }
})()

export default connect_db