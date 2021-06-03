"use strict";
require('dotenv').config()
const auth = require("./auth");

module.exports = function(Transaction) {
  Transaction.debit = async data => {
    const response = await auth.isLoggedIn(data);
    if (response === false) {
      return "Session expired";
    }
    data.account_no = response.account_no;
    let { amount } = await new Promise((resolve, reject) => {
      data.transaction_id = process.env.TYPE_DEBIT + Math.floor(Math.random() * 100000);
      data.transaction_type = process.env.TYPE_DEBIT;
      Transaction.create(data, (err, results) => {
        err ? reject(err) : resolve(results)
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
      data.transaction_id = process.env.TYPE_CREDIT + Math.floor(Math.random() * 100000);
      data.transaction_type = process.env.TYPE_CREDIT;
      Transaction.create(data, (err, results) => {
        err ? reject(err) : resolve(results)
      });
    });
    console.log(amount + " credited to Account number : " + data.account_no);
    return amount + " credited to Account number : " + data.account_no;
  };
};
