const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/toDoList', {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();

const itemsSchema = {
  name:String
};

const itemAdd = mongoose.model("itemsSchema", itemsSchema);

const item1 = new itemAdd({
  name:"Welcome to your todo List!"
});
const item2 = new itemAdd({
  name:"Hit the + Button to add a new item."
});
const item3 = new itemAdd({
  name:"Hit the - Button to delete items."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name:String,
  items:[itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){

itemAdd.find({}, function(err, foundItems){

    if(foundItems.length === 0){
      itemAdd.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        } else{
          console.log("super");
        }
      });
      res.redirect("/");
    }else{
      res.render("list", { listTitle:"Today", newListItem: foundItems});
    }
  });
});

app.post("/", function(req,res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new itemAdd({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else{
    List.findOne({name: listName}, function(err, foundList){

      foundList.items.push(item);
      foundList.save();
      console.log(foundList);
      res.redirect("/" + listName);
    })
  }
});

app.get("/:postName", function(req, res){
  const postName = req.params.postName;



  List.findOne({name: postName}, function(err, foundItems){
    if(!err){
      if(!foundItems){
        const list = new List({
          name: postName,
          items:defaultItems
        });
        list.save();
        res.redirect("/" + postName);
      } else{
        res.render("list", {listTitle:foundItems.name, newListItem:foundItems.items});
      }
    }
  });
});


app.get("/about", function(req, res){
  res.render("about");
});

app.post("/delete", function(req,res){
  const itemDelete = req.body.checkBox;
  itemAdd.deleteOne({_id: itemDelete}, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("noice");
    }
  });
  res.redirect("/");
});


app.listen(3000, function(){

});
