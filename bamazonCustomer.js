var mysql = require("mysql");
var inquirer = require("inquirer");
var console_table = require("console.table");
var currentQ = 0;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "XXXXXXXX",
    database: "bamazon"
});

connection.connect();
run()
function run() {
  console.log("*********************************************************")
  console.log("*                                                       *")
  console.log("*                                                       *")
  console.log("*\t WELCOME TO BAMAZON Customer Poral\t\t*")
  console.log("*                                                       *")
  console.log("*        Author : Vinod Ramadasasan                     *")
  console.log("*                                                       *")
  console.log("*********************************************************")
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
          {
            type: "input",
            name: "itemID",
            message: "Select product from the itemID : "
          },
          {
            type: "input",
            name: "quantity",
            message: "How many units would you like to purchase?  "
          }
        ]).then(function(user) {
          // console.log(user.itemID)
          // console.log(user.quantity)
          checkQuatity(user.itemID, user.quantity)

        })
    })
};

function checkQuatity(items, quatity){
  connection.query("SELECT quantity FROM products WHERE itemID='"+items+"'", function(err, res) {
    if (err) throw err;
    if(res[0].quantity < quatity){
      console.log("ERROR : INSUFFICIENT QUANTITY, PLEASE USE QUANTITY LESS THAN : "+res[0].quantity)
    }
    else{
      var currentQ = res[0].quantity - quatity
      connection.query("UPDATE products SET quantity = " + currentQ + " WHERE itemID = " +items, function(err, res) {
        if (err) throw err;
        console.log("Updated Products Database")
        console.log("Thanks for Shopping with Us! \nHave a Wonderfulday!")
        connection.end();
    });
    }
  });
}
