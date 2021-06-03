# ATM machine app using Loopback 3.x , MySQL and redis 

### Description
This project provides ATM functionalities  as following : 
- Sign up as customer
- Login with response session id
- Perform Credit & Debit operation with give session id
- Logout with given session id

### How to use ?
  - Create SQL table and trigger
  - Run 
  ```
  git clone https://github.com/GauravChinavle/ATM-loopback3-mysql-redis.git
  cd ATM-loopback3-mysql-redis
  npm install
  nodemon .
  ```

### Technologies used
- [Nodejs](https://nodejs.org/en/) - _JavaScript runtime built on Chrome's V8 JavaScript engine_
- [Loopback 3.x](https://loopback.io/doc/en/lb3/) - _Highly-extensible, open-source Node. js framework that enables you to: Create dynamic end-to-end REST APIs with little or no coding. Access data from major relational databases, MongoDB, SOAP and REST APIs_

### Database used
- [MySQL](https://www.mysql.com/) - _Open-source relational database management system_
  - used to store Customer Data and transaction data
- [redis](https://redis.io/) - _In-memory data structure store, used as a database, cache, and message broker_
  - used to for caching the session id

### Credentials 
- Add your MySQL credentials to datasources.json file