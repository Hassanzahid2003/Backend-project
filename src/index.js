import connect_db from "./db/db_connection";
import dotenv from 'dotenv'

dotenv.config({
    path:'./env'
});

connect_db()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`app is running on port ${process.env.PORT}` )
    })
})
.catch((error)=>{
    console.log("Database connection failed!!", error)
})