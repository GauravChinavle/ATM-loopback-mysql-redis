"use strict";

module.exports = function(Customer) {


  Customer.createCustomer = async (data) => {
    let {id} = await new Promise((resolve, reject) => {
      Customer.create(data, (err, results) => {
            if (err)
                reject(err) // Reject here
            else
                resolve(results)
        })
    });
   
    return id ? "Account created with Account number "+id : "Error occured while creating account" ;
    
};


}