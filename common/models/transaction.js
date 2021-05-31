"use strict";
const auth = require("./auth");

module.exports = function(Transaction) {
  Transaction.debit = async data => {
    const response = await auth.isLoggedIn(data);
    if (response === false) {
      return "Session expired";
    }
    data.account_no = response.account_no;
    let { amount } = await new Promise((resolve, reject) => {
      data.transaction_id = "DB" + Math.floor(Math.random() * 100000);
      data.transaction_type = "DEBIT";
      Transaction.create(data, (err, results) => {
        if (err) reject(err);
        // Reject here
        else resolve(results);
      });
    });
    console.log(amount + " debited from Account number : " + data.account_no);
    return amount + " debited from Account number : " + data.account_no;
  };

  Transaction.credit = async data => {
    const response = await auth.isLoggedIn(data);
    if (response === false) {
      return "Session expired";
    }
    data.account_no = response.account_no;
    let { amount } = await new Promise((resolve, reject) => {
      data.transaction_id = "CR" + Math.floor(Math.random() * 100000);
      data.transaction_type = "CREDIT";
      Transaction.create(data, (err, results) => {
        if (err) reject(err);
        // Reject here
        else resolve(results);
      });
    });
    console.log(amount + " credited to Account number : " + data.account_no);
    return amount + " credited to Account number : " + data.account_no;
  };
};
