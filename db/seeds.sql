INSERT INTO department (name)
VALUES ("Produce"), ("Cheese"), ("Seafood"), ("Bakery"), ("Meat");

INSERT INTO role (title, salary, department_id)
VALUE ("Stocker", 20000.00, 5), ("Supervisor", 35000.00, 4), ("Buyer", 45000.00, 3),("Assist Team Leader", 55000.00, 2), ("Team Leader", 70000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE("Austin", "Stancil", 1, 2), ("Jake", "Smith", 5, 5), ("Erin", "Boulder", 4, 3),("Sarah", "kloter", 2, 3), ("Eric", "Fromen", 3, 4);