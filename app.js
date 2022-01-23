const uri = require("./config/config")

const express = require("express")
const mongoose = require("mongoose")
const tasks = require("./model/model")
const res = require("express/lib/response")
const app = express()

app.use(express.urlencoded({extended : true}));

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology : true}).then(()=>console.log("connected"))

app.use(express.static("static"))
app.get("/", async(req,res)=>{
const alltasks= await tasks.find()
    res.render("index" , {todo:alltasks})
})
app.post("/add", (req,res)=>{
    const task = req.body.task;
    console.log("hello")
    tasks({task : task}).save(function(err, doc){
        if(err){
            console.log(err)
        }
        res.redirect("/")
    })
})
app.get("/delete/todo/:_id" , (req,res) => {
    const { _id } = req.params;
    tasks.deleteOne({ _id })
    .then(()=>{
        console.log("Deleted Todo Successfully");
        res.redirect("/")
    })
    .catch((err) => console.log(err))
})

app.listen(3000)