var mysql = require("mysql");
var inquirer = require("inquirer");
var console_table = require("console.table");
var managerRes;
var currentQ;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "XXXXXXX",
    database: "bamazon"
});
connection.connect();
manager()
function manager() {
  console.log("*********************************************************")
  console.log("*                                                       *")
  console.log("*                                                       *")
  console.log("*\t WELCOME TO BAMAZON Managers Poral\t\t*")
  console.log("*                                                       *")
  console.log("*        Author : Vinod Ramadasasan                     *")
  console.log("*                                                       *")
  console.log("*********************************************************")

  inquirer.prompt({
      name: "Select",
      type: "list",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ],

    })
    .then(function(answer) {
      // console.log(answer.Select);
      managerRes = answer.Select
      switch(managerRes){
        case "View Products for Sale":
          viewInvent()
          break;
        case "View Low Inventory":
          lowInvent()
          break;
        case "Add to Inventory":
          addInvent();
          break;
        case "Add New Product":
          addProducts();
          break;
        case "Exit":
          exitOut();
          break;
      }
      // if (managerRes === "View Products for Sale"){
      //   viewInvent()
      // } else if (managerRes === "View Low Inventory") {
      //   lowInvent()
      // }

    });
}

function viewInvent(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end()
    // manager()
  });
}

function lowInvent(){
  // console.log("low")
  connection.query("SELECT * FROM products WHERE quantity < 5", function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end()
    // manager()
  });
}
function addInvent(){
  inquirer.prompt([
    {
      type: "input",
      name: "itemID",
      message: "Select product from the itemID : "
    },
    {
      type: "input",
      name: "quantity",
      message: "How many units would you like to add?  "
    }
  ]).then(function(user) {
    // console.log(user.itemID)
    // console.log(user.quantity)
    connection.query("SELECT quantity FROM products WHERE itemID='"+user.itemID+"'", function(err, res) {
      if (err) throw err;
        var currentQ = parseInt(res[0].quantity)+ parseInt(user.quantity)
        // console.log("CQ "+currentQ)
        connection.query("UPDATE products SET quantity = " + currentQ + " WHERE itemID = " +user.itemID, function(err, res) {
          if (err) throw err;
          console.log("Updated Products Database")
          console.log("Added "+user.quantity+" Units .. \nHave a Wonderfulday!")
          connection.end();
      });
    });
})
}

function addProducts(){
  inquirer.prompt([
    {
      type: "input",
      name: "prodName",
      message: "Enter the Product Name : "
    },
    {
      type: "input",
      name: "dept",
      message: "Enter Product Department/Catogory:  "
    },
    {
      type: "input",
      name: "price",
      message: "Enter Price for the Product:  "
    },
    {
      type: "input",
      name: "quantity",
      message: "Enter Quantity of the Product:  "
    }
  ]).then(function(user) {
        connection.query("INSERT INTO products(products, dept, price, quantity) VALUE('"+user.prodName+"', '"+user.dept.toUpperCase()+"', "+ user.price+", "+user.quantity+")", function(err, res) {
          if (err) throw err;
          console.log("Updated Products Database")
          console.log("Added "+user.prodName+" to the Database .. \nHave a Wonderfulday!")
          connection.end()
          // manager()
      });
})
}

function exitOut() {
  console.log("Thanks for visiting Bamazon ! \nGoodBye !")
  connection.end()

}
