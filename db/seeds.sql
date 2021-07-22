USE employeeTracker;

INSERT INTO departments 
   (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles 
    (title, salary, department_id)
VALUES
('sales manager', 60000, 1),
('sales associate', 45000, 1),
('engineer manager', 110000, 2),
('engineer', 75000, 2),
('finance manager', 80000, 3),
('financial analyst', 60000, 3),
('lawyer', 70000, 4);

INSERT INTO employees
 (first_name, last_name, role_id, manager_id)
 VALUES 
('John', 'Williams', 1, null),
('Edward', 'Snowden', 1, null),
('Jon', 'Crist', 2, 1),
('Krista', 'Jones', 3, 1),
('Malik', 'Reed', 4, 4),
('Willow', 'Haart', 5, 2),
('Yareil', 'Mendoza', 6, 2),
('Wilbur', 'Stark', 7, 2)
;
