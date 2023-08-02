const express = require("express");
const app = express();
let userRouter = require("./routes/users");
const models = require("./models/index");
const redis = require('redis');
const PORT = process.env.PORT;
var cors = require('cors');
const redisdb = redis.createClient({ url: 'redis://127.0.0.1:6379' });

redisdb.connect();
app.use(cors());
app.use(express.json())

app.get('/health',async (req,res)=>{
    res.send("SEARCH BACKEND IS RUNNING - HEALTH FINE");
})


app.use('/article', userRouter)

app.listen(PORT, () => { console.log("NODE PG Listening on Port ", PORT) })