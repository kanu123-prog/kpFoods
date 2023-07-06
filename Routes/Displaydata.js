const express = require("express");
const router = express.Router();

router.post("/displaydata",(req,res)=>{
    try{
        res.send([global.Food_items, global.Food_category]);
    }
    catch{
        console.error(error.message);
        res.send("server error");
    }
})

module.exports = router;
