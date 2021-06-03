Create Trigger update_balance BEFORE INSERT ON transaction FOR EACH ROW
BEGIN
IF NEW.transaction_type = 'CREDIT' THEN 
update customer set balance = balance + NEW.AMOUNT where account_no = NEW.account_no;
ELSEIF NEW.transaction_type = 'DEBIT' THEN
SET @bal = (SELECT balance FROM customer where account_no = NEW.account_no);
if  @bal < NEW.AMOUNT then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient balance';
end if;
update customer set balance = balance - NEW.AMOUNT where account_no = NEW.account_no ;
END IF;
END //
DELIMITER ;