const express = require("express");
const mongoose = require('mongoose');
const app = express()
const newUser = require('./Routes/CreateUser')

mongoose.connect("mongodb+srv://admin-kanupriya:kanu1234@cluster0.pt5e7k4.mongodb.net/kappuFood?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log('Connected to the database.');

  try {
    const fetched_data = mongoose.connection.db.collection("Food-items");
    const data = await fetched_data.find({}).toArray({});
    const foodCategory = mongoose.connection.db.collection("Food-category")
    const catData =await foodCategory.find({}).toArray({});
    global.Food_items = data;
    global.Food_category = catData;
  } catch (err) {
    console.error(err);
  }

  
});
  

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json());
app.use("/api", newUser);
app.use("/api", require('./Routes/Displaydata'))
app.listen(5000,()=>{
    console.log("server started at port 5000");
})