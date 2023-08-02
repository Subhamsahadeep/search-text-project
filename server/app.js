const express = require("express");
const app = express();
let userRouter = require("./routes/users");
const models = require("./models/index");
const PORT = process.env.PORT;

app.use(express.json())

app.get('/health',async (req,res)=>{
    res.send("SEARCH BACKEND IS RUNNING - HEALTH FINE");
})


app.use('/article', userRouter)

app.listen(PORT, () => { console.log("NODE PG Listening on Port ", PORT) })