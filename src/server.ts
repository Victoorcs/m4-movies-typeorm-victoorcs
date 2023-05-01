import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(()=>{
    console.log('Data base is connected')

    app.listen(3000, () =>{
        console.log('Server is Running')
    })
}).catch((err)=> console.log(err))