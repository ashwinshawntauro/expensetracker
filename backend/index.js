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
    category: String,
    note: { type: String, required: false }
});
  
const CatSchema = new mongoose.Schema({
    category: String,
    logo: String
});

const Transaction = mongoose.model('transactions', TransactionSchema);
const Categories = mongoose.model('categories', CatSchema);

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
app.get('/api/category', (request, response) => {
    Categories.find({})
    .then(categories => {
        // Create an array of promises that resolve to the total for each category
        const totalsPromises = categories.map(category => {
            return Transaction.aggregate([
                {$group: {_id:"$category", total:{$sum:"$value"}}},
                {$match: {"_id": category.category}}
            ]).then(result => result.length > 0 ? result[0].total : 0);
        });

        // Wait for all promises to resolve
        Promise.all(totalsPromises)
        .then(totals => {
            // Add the total to each category and send the response
            const categoriesWithTotals = categories.map((category, index) => ({...category.toObject(), total: totals[index]}));
            response.json(categoriesWithTotals);
        });
    })
    .catch(err => console.log(err));
});
// app.get('/api/category/:categoryName', (request, response) => {
//     const categoryName = request.params.categoryName;
//     Transaction.aggregate([
//         {$group: {_id:"$category", total:{$sum:"$value"}}},
//         {$match: {"_id": categoryName}}
//     ]).exec((error,result) => {
//         response.send(result);
//     })      
// }) 
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
app.post('/api/newcategory', urlencodedParser, (req, response) => {
    Categories.create(req.body, (error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).send('Added Successfully \n' + req.body.category)
        }
    });
});
app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params;
    // Find the transaction with the given id
    Transaction.findById(id, (error, transaction) => {
        if (error) {
        res.status(500).send({ message: 'Server error.' });
        } else if (!transaction) {
        res.status(404).send({ message: 'Transaction not found.' });
        } else {
        // Delete the transaction
        transaction.remove(error => {
            if (error) {
            res.status(500).send({ message: 'Server error.' });
            } else {
            res.status(200).send({ message: 'Transaction deleted successfully.' });
            }
        });
        }
    });
});