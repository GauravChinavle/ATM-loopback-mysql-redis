"use strict";
const auth = require("./auth");

module.exports = function(Customer) {
  Customer.login = async data => {
    const msg = auth.loginSession({ ...data });
    return msg;
  };

  Customer.logout = async data => {
    const msg = auth.logoutSession({ ...data });
    return msg;
  };

  Customer.createCustomer = async data => {
    let { id } = await new Promise((resolve, reject) => {
      Customer.create(data, (err, results) => {
        if (err) reject(err);
        // Reject here
        else resolve(results);
      });
    });

    return id
      ? "Account created with Account number " + id
      : "Error occured while creating account";
  };
};
