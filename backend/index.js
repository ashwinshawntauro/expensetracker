const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("MongoDB connected");
  }
});

const TransactionSchema = new mongoose.Schema({
  type: String,
  value: Number,
  date: String,
  category: String
});

const Transaction = mongoose.model('transactions', TransactionSchema);

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
    Transaction.aggregate([
        {
          $addFields: {
            value: {
              $convert: {
                input: "$value",
                to: "int"
              }
            }
          }
        }
      ]).sort(mysort).exec((error,result)=>{
        response.send(result);
    })
})

app.get('/api/category/food',(request,response)=>{
    Transaction.aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Food"}}
      ]).exec((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Salary',(request,response)=>{
    Transaction.aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Salary"}}
      ]).exec((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Shopping',(request,response)=>{
    Transaction.aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Shopping"}}
      ]).exec((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Bills',(request,response)=>{
    Transaction.aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Bills"}}
      ]).exec((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Transport',(request,response)=>{
    Transaction.aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Transport"}}
      ]).exec((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/Gym',(request,response)=>{
    Transaction.aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Gym"}}
      ]).exec((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/category/salary',(request,response)=>{
    Transaction.aggregate([
        {$group: {_id:"$category", total:{$sum:"$value"}}},
        {$match: {"_id": "Salary"}}
      ]).exec((error,result)=>{
        response.send(result);
    })      
})
app.get('/api/avgincome',(request,response)=>{
    Transaction.aggregate([{$match: {value: { $gt: 0 }}},{$group: {_id:"$id",total:{$avg:"$value"}}}]).exec((error,result)=>{
        response.send(result);
    })
})

app.get('/api/totalincome',(request,response)=>{
    Transaction.aggregate([{$match: {value: { $gt: 0 }}},{$group: {_id:"$id",total:{$sum:"$value"}}}]).exec((error,result)=>{
        response.send(result);
    })
})
app.get('/api/totalexpense',(request,response)=>{
    Transaction.aggregate([{$match: {value: { $lt: 0 }}},{$group: {_id:"$id",total:{$sum:"$value"}}}]).exec((error,result)=>{
        response.send(result);
    })
})
app.get('/api/avgexpense',(request,response)=>{
    Transaction.aggregate([{$match: {value: { $lt: 0 }}},{$group: {_id:"$id",total:{$avg:"$value"}}}]).exec((error,result)=>{
        response.send(result);
    })
})

app.get('/api/category',(request,response)=>{
    Transaction.aggregate([{$group: {_id:"$category", total:{$sum:"$value"}}}]).exec((error,result)=>{
        response.send(result);
    })
})

app.get('/api/date',(request,response)=>{
    var mysort = { _id: 1 };
    Transaction.aggregate([{$group: {_id:"$date",total:{$sum:"$value"}}}]).sort(mysort).exec((error,result)=>{
        response.send(result);
    })
})

app.get('/api/income',(request,response)=>{
    Transaction.aggregate([{$match: {value: { $gt: 0 }}},{$group: {_id:"$category",total:{$sum:"$value"}}}]).exec((error,result)=>{
        response.send(result);
    })
})
app.get('/api/expense',(request,response)=>{
    Transaction.aggregate([{$match: {value: { $lt: 0 }}},{$group: {_id:"$category",total:{$sum:"$value"}}}]).exec((error,result)=>{
        response.send(result);
    })
})
app.post('/api/post', urlencodedParser, (req, response) => {
    Transaction.create(req.body, (error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).send('Added Successfully \n' + req.body.category)
        }
    });
});
// app.post('/api/post', urlencodedParser, (req, response) => {
//     Transaction.create(req.body)
//     .then(transact=>res.json(transact))
//     .catch(err=>res.json(err))
// });
// app.post("/api/post", async (req, resp) => {
//     try {
//         const user = new Transaction(req.body);
//         let result = await user.save();
//         result = result.toObject();
//         if (result) {
//             delete result.password;
//             resp.send(req.body);
//             console.log(result);
//         } else {
//             console.log("User already register");
//         }
 
//     } catch (e) {
//         resp.send("Something Went Wrong");
//     }
// });