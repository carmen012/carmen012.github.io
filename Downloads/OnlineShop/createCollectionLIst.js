var http = require('http');
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/onlineShop";


createDatabaseAndCollection()

 function createDatabaseAndCollection(){
     MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("onlineShop");
       dbo.createCollection("commentLists", function(err, res) {
         if (err) throw err;
         console.log("Collection created!");
         db.close();
       });
     });
     MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           var dbo = db.db("onlineShop");
           dbo.createCollection("pdtsList", function(err, res) {
             if (err) throw err;
             console.log("Collection created!");
             db.close();
           });
         });
     MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           var dbo = db.db("onlineShop");
           dbo.createCollection("registers", function(err, res) {
             if (err) throw err;
             console.log("Collection created!");
             db.close();
           });
         });
     MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           var dbo = db.db("onlineShop");
           dbo.createCollection("userCartList", function(err, res) {
             if (err) throw err;
             console.log("Collection created!");
             db.close();
           });
         });
 }

