const redis = require('redis');
var _ = require('lodash');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
var loopback = require('loopback');
let Customer = loopback.getModel("customer");

module.exports.loginSession = async function (data){
    let count = await new Promise((resolve, reject) => {
        Customer.count(data, (err, count) => {
          if (err) reject(err) // Reject here
          else resolve(count);
        });
      });
      if(!count){
          return "User not available"
      }

      data.session_id = ""+Math.floor(Math.random() * 1000);
      client.setex( data.session_id, 50000000, JSON.stringify(data));
      console.log("Logging in with account no : "+data.account_no);
      return "Session id is "+data.session_id
};


module.exports.isLoggedIn = async function ({session_id}){
    let result = await new Promise((resolve, reject) => {
        client.get(session_id, (err, data) => {
          if (err) reject(err) // Reject here
          else resolve(data);
        });
      });
      console.log("isLoggedIn : "+!_.isEmpty(result));
      if(_.isEmpty(result)){
        return false;
      }
      return true;
};

module.exports.logoutSession = async function ({session_id}){
    let result = await new Promise((resolve, reject) => {
        client.del( ""+session_id, (err, data) => {
            if (err) reject(err) // Reject here
            else resolve(data);
          });
      });
      if(result === 0) return "Session was not present."
      console.log("Logging out with session id :" + session_id);
      return "You are logged out"
};
