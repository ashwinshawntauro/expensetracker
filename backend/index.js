// require('./db')
const mongodb = require('mongodb').MongoClient
var database;
mongodb.connect('mongodb://0.0.0.0:27017/',{useNewUrlParser: true,
useUnifiedTopology: true },(error,client)=>{
    database=client.db('mydb');
    console.log("MongoDB connected"); 
})
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer= require('multer')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:3000'}))
app.listen(4000,()=>console.log('Server started at : 4000'))


app.get('/api/sample',(request,response)=>{
    var mysort = { date: -1 };
    database.collection("transactions").find({}).sort(mysort).toArray((error,result)=>{
        response.send(result);
    })
})

app.get('/api/category/food',(request,response)=>{
    database.collection("transactions").aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Food"}}
      ]).toArray((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Salary',(request,response)=>{
    database.collection("transactions").aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Salary"}}
      ]).toArray((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Shopping',(request,response)=>{
    database.collection("transactions").aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Shopping"}}
      ]).toArray((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Bills',(request,response)=>{
    database.collection("transactions").aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Bills"}}
      ]).toArray((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Bills',(request,response)=>{
    database.collection("transactions").aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Bills"}}
      ]).toArray((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Transport',(request,response)=>{
    database.collection("transactions").aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Transport"}}
      ]).toArray((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Gym',(request,response)=>{
    database.collection("transactions").aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Gym"}}
      ]).toArray((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/salary',(request,response)=>{
    database.collection("transactions").aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Salary"}}
      ]).toArray((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/avgincome',(request,response)=>{
    database.collection("transactions").aggregate([{$match: {value: { $gt: 0 }}},{$group: {_id:"$id",total:{$avg:"$value"}}}]).toArray((error,result)=>{
        response.send(result);
    })
})

app.get('/api/totalincome',(request,response)=>{
    database.collection("transactions").aggregate([{$match: {value: { $gt: 0 }}},{$group: {_id:"$id",total:{$sum:"$value"}}}]).toArray((error,result)=>{
        response.send(result);
    })
})
app.get('/api/totalexpense',(request,response)=>{
    database.collection("transactions").aggregate([{$match: {value: { $lt: 0 }}},{$group: {_id:"$id",total:{$sum:"$value"}}}]).toArray((error,result)=>{
        response.send(result);
    })
})
app.get('/api/avgexpense',(request,response)=>{
    database.collection("transactions").aggregate([{$match: {value: { $lt: 0 }}},{$group: {_id:"$id",total:{$avg:"$value"}}}]).toArray((error,result)=>{
        response.send(result);
    })
})

app.get('/api/category',(request,response)=>{
    database.collection("transactions").aggregate([{$group: {_id:"$category", total:{$sum:"$value"}}}]).toArray((error,result)=>{
        response.send(result);
    })
})

app.get('/api/wallets',(request,response)=>{
    database.collection("wallets").aggregate([
        {
          $group: {
            _id: "$id",
            ele: {
              $firstN: {
                input: { ch: "$cash", bk: "$bank"},
                n: 1
              }
            }
          }
        },
        { $sort: { _id: -1 } }
      ]).toArray((error, result) => {
        response.send(result);
      });
      
})

app.get('/api/walletsChart',(request,response)=>{
    var mysort = { date: 1 };
    database.collection("wallets").find({}).sort(mysort).toArray((error,result)=>{
        response.send(result);
    })
})

app.get('/api/date',(request,response)=>{
    var mysort = { _id: 1 };
    database.collection("transactions").aggregate([{$group: {_id:"$date",total:{$sum:"$value"}, category:{$first:"$category"} }}]).sort(mysort).toArray((error,result)=>{
        response.send(result);
    })
})

app.get('/api/income',(request,response)=>{
    database.collection("transactions").aggregate([{$match: {value: { $gt: 0 }}},{$group: {_id:"$category",total:{$sum:"$value"}}}]).toArray((error,result)=>{
        response.send(result);
    })
})
app.get('/api/expense',(request,response)=>{
    database.collection("transactions").aggregate([{$match: {value: { $lt: 0 }}},{$group: {_id:"$category",total:{$sum:"$value"}}}]).toArray((error,result)=>{
        response.send(result);
    })
})
app.post('/api/post',urlencodedParser,(req,response)=>{
    database.collection("users").insertOne({
        name: req.body.name,
    })
    response.status(200).send('Added Successfully \n' + req.body.name)
})
