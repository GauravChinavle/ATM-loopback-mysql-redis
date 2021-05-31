"use strict";
const auth = require('./auth');

module.exports = function(Transaction) {
  Transaction.debit = async data => {
    if(await auth.isLoggedIn(data) === false){
      return "Session expired"
    }
    let {amount} = await new Promise((resolve, reject) => {
      data.transaction_id = "DB" + Math.floor(Math.random() * 100000);
      data.transaction_type = "DEBIT";
      Transaction.create(data, (err, results) => {
        if (err) reject(err) // Reject here
        else resolve(results);
      });
    });
    console.log(amount + " debited to your account.");
    return amount + " debited from your account."
  };

  Transaction.credit = async data => {
    if(await auth.isLoggedIn(data) === false){
      return "Session timeout"
    }
    let {amount} = await new Promise((resolve, reject) => {
      data.transaction_id = "CR" + Math.floor(Math.random() * 100000);
      data.transaction_type = "CREDIT";
      Transaction.create(data, (err, results) => {
        if (err) reject(err); // Reject here
        else resolve(results);
      });
    });
    console.log(amount + " credited to your account.");
    return amount + " credited to your account."
  };
};
