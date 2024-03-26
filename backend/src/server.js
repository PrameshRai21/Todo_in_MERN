import "dotenv/config"
import { app } from "./app.js"
import { connectDB } from "./database/index.db.js"

const port = process.env.PORT || 8000;

connectDB()
.then(() => {

    app.on("error", ()=>{
        console.log(`ERROR!!! Server unable to connect with DB.`);
    })

    app.listen(port, ()=>{
        console.log(`Server listening at http://localhost:${port}`);
    })
})
.catch((error) => {
    console.log("ERROR!!! DB connection Failed. ", error);
})