//AIzaSyD9wb1HoMuZ9f6Vpk1rJ6MFEsUOovpVxKE


var http = require('http');
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/onlineShop";
var ObjectId = require('mongodb').ObjectId;

http.createServer(function (req, res) {

if(req.url === "/"){
sendFileContent(res, "index.html", "text/html");
}  else if(req.url === "/location"){
sendFileContent(res, "location.html", "text/html");
} else if(req.url === "/payment"){
sendFileContent(res, "payment.html", "text/html");

} else if(req.url === "/rating"){
sendFileContent(res, "userRating.html", "text/html");
}
else if(req.url === "/adminLogin"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
if(obj.login=="admin"&&obj.password=="admin"){
    res.write("ok");
}else{
    res.write("no permission");
}
res.end();

});
}else{
noPermission(res,req);
}
}
else if(req.url==="/cartListHandle"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
console.log(formData);
var name = "userCartList";
insert(obj,name);
res.end();
});
}else{
noPermission(res,req);
}
}
else if(req.url==="/ratingHandle"){

    data = "commentLists";
    getList(data).then(function(value){
    console.log("rating");
    res.write(value);
    res.end();
})
}
else if(req.url==="/delCartList"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
console.log(formData);

var obj = JSON.parse(formData);
//import pdts list from admin mode
var myquery = {"_id":ObjectId(obj.id)};

del("userCartList",myquery);
res.write ("ok");
res.end();

});
}else{
noPermission(res,req);
}
}
else if(req.url==="/cartListShow"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;




var obj = JSON.parse(formData);
console.log(formData);
var data = "userCartList";
//find the key(user email), put the data to the client side

var query = {email:obj.email}

findSecondVerson(data,query).then(function(value){
var thing = JSON.parse(value);
  res.write (value);
res.end();

});


});
}else{
noPermission(res,req);
}
}
else if(req.url==="/login"){
if (req.method === "POST") {

formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
//find the email in the databases reg or not
console.log(obj.email);
var data="registers";
var query = {email:obj.email}

findSecondVerson(data,query).then(function(value){
   var thing = JSON.parse(value);
   switch (true){
       case(value.length==2):
           res.write("user not found");
           break;
       case (obj.pass!=thing[0].password):
           res.write ("Please check your entry");
           break;
       case(obj.pass==thing[0].password):
           res.write (value);
           break;
   }
    res.end();
   
});
         
});


}else{
noPermission(res,req);
}
}


else if(req.url==="/test"){
data = "pdtsList";
getList(data).then(function(value){
console.log("data send to client side");
res.write(value);
res.end();
})
}

else if(req.url === "/admin"){
sendFileContent(res, "admin.html", "text/html");

}
else if(req.url === "/handle"){

if (req.method === "POST") {
formData="";
return req.on('data', function(data) {
formData += data;

var obj = JSON.parse(formData);
//import pdts list from admin mode

console.log(formData+"input success");
insert(obj,"pdtsList");
res.end();
});

}else{
noPermission(res,req);
}
}
else if(req.url === "/adminForDel"){

if (req.method === "POST") {
formData="";
return req.on('data', function(data) {
formData += data;

    var obj = JSON.parse(formData);
//import pdts list from admin mode
    var myquery = {"_id":ObjectId(obj.id)};
    
    del("pdtsList",myquery);
        res.end();
});
}


else{
noPermission(res,req);
}

}

else if(req.url === "/reg"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
    console.log(obj.email);
find(obj,obj.email,res);

});

}else{
noPermission(res,req);
}
}
else if(req.url === "/changePSW"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
var data="registers";
var email= {email:obj.email};
var newpsw = {password:obj.newpsw};
console.log(obj.email+" "+obj.newpsw);
console.log(email+" "+newpsw);
update(data,email,newpsw).then(function(value){
console.log(value);
var thing = JSON.parse(value);
res.write("your password has been updated, pls login again");
res.end();

});
});

}else{
noPermission(res,req);

}

}    else if(req.url === "/address"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
var data="userCartList";
var address = {"_id":ObjectId(obj.id),"address":obj.address,"lat":obj.lat,"lng":obj.lng}
var myquery = {"_id":ObjectId(obj.id)};
console.log(address);
update(data,myquery,address).then(function(value){
  console.log(value);
  var thing = JSON.parse(value);
   res.end();

});
});


}else{
noPermission(res,req);

}

}

else if(req.url === "/creditcard"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
var data="userCartList";
var creditcard = {"_id":ObjectId(obj._id),"creditcard":obj.creditcard}
var myquery = {"_id":ObjectId(obj._id)};
console.log(ObjectId(obj._id));



update(data,myquery,creditcard).then(function(value){
     console.log(value);
     var thing = JSON.parse(value);
res.write("ok");
      res.end();

 });
});


}else{
noPermission(res,req);

}

}
else if(req.url === "/comment"){
if (req.method === "POST") {
formData='';
msg='';
return req.on('data', function(data) {
formData += data;
var obj = JSON.parse(formData);
var name="commentLists";
insert(obj,name)

var data="userCartList";
var rating = {"_id":ObjectId(obj.id),"rating":obj.rating}
var myquery = {"_id":ObjectId(obj.id)};
console.log(ObjectId(obj.id));
update(data,myquery,rating).then(function(value){
     console.log(value);
     var thing = JSON.parse(value);
res.write("ok");
      res.end();

 });

});


}else{
noPermission(res,req);

}

}






else{
res.writeHead(404);
res.write("Not Found!");
res.end();
}




}).listen(8080);



function noPermission(res,req){
res.writeHead(500);
res.write("no permission");
res.end();
}






function sendFileContent(response, fileName, contentType){
fs.readFile(fileName, function(err, data){
if(err){
response.writeHead(404);
response.write("Not Found!");
}
else{
response.writeHead(200, {'Content-Type': contentType});
response.write(data);
}
response.end();
});
}




function insert(obj,name){
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("onlineShop");
dbo.collection(name).insertOne(obj, function(err, res) {
if (err) throw err;
console.log("1 document inserted");
db.close();
});
});
}

let findSecondVerson = function (data,query){return new Promise(function(resolve,reject){
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("onlineShop");
dbo.collection(data).find(query).toArray(function(err, result){
if (err) throw err;
db.close();
thing = JSON.stringify(result);
resolve(thing);
});
});
});
}

function find(obj,key,res){
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("onlineShop");
var query = {email:key}

dbo.collection("registers").find(query).toArray(function(err, result) {
db.close();
if (result.length>0){
console.log("hv rec");
res.write("This email has been used, please check it again");

res.end();
}else{
res.write("Your registration is completed,please enjoy your service on ABC online shop now");
var name = "registers";
insert(obj,name);
res.end();
}

});
});
}

function del(name,myquery){
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("onlineShop");
dbo.collection(name).deleteOne(myquery, function(err, obj) {
if (err) throw err;
console.log("1 document deleted");
db.close();
});
});
}

let update = function (data,myquery,changedValue){return new Promise(function(resolve,reject){
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("onlineShop");
var newvalues = { $set: changedValue };
dbo.collection(data).updateOne(myquery, newvalues, function(err, result) {
if (err) throw err;
db.close();
thing = JSON.stringify(result);
resolve(thing);
});
});
});
}



let getList = function (data){return new Promise(function(resolve,reject){
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("onlineShop");
dbo.collection(data).find({}).toArray(function(err, result) {
if (err) throw err;
db.close();
thing = JSON.stringify(result);
resolve(thing);
});
});
});
}


