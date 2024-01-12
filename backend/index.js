require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {connectDb} = require('./db/conn');
const port = process.env.PORT|| 5000;
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const start = async () => {
    try{
        await connectDb(process.env.MONGODB_URL);
        console.log("Database Connected!!!")
        

    }
    catch(err){
        console.log(err);
    }    
}

start();

const histSchema = new mongoose.Schema({
    result: String
})

const History = new mongoose.model("history", histSchema);
app.get('/getHist',async (req,res)=>{
    try{
        const data = await History.find();
        // console.log(data);
        res.json(data);
    }
    catch(err){
        res.status(500).send('server error!!');
    }
})
app.post('/addHist', async (req, resp) => {
    try {
      const { ans } = req.body;
  
      const hist = new History({
        result: ans,
      });
  
      await hist.save();
  
      return resp.status(200).json({ msg: "Added" });
    } catch (error) {
      console.error(error);
      return resp.status(500).json({ error: "Internal Server Error" });
    }
  });

app.listen(port, ()=>{
    console.log(`Server connected to port ${port}`)
});