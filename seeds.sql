-- Insert departments
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources'),
('Marketing');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Senior Software Engineer', 100000, 1),
('Accountant', 60000, 2),
('HR Manager', 75000, 3),
('Marketing Specialist', 70000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Robert', 'Brown', 3, NULL),
('Emily', 'Davis', 4, NULL),
('Michael', 'Wilson', 5, NULL);
