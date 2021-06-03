 /**Customer TABLE **/
CREATE TABLE customer( account_no varchar(255) primary key, name varchar(255), mobile_no bigint, pin int, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); 

/**Transaction table**/
CREATE TABLE transactions( transaction_id bigint primary key, account_no bigint not null, transaction_type varchar(30), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (account_no) REFERENCES customer(account_no)); 