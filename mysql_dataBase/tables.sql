DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employee;

CREATE TABLE projects (
    projects_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    dateStart DATE NOT NULL,
    deadline DATE NOT NULL,
    status VARCHAR(255) CONSTRAINT ck_status CHECK (status = 'in progress' OR status = 'close')
);

CREATE TABLE tasks (
    tasks_id INT PRIMARY KEY,
    description VARCHAR(255) NOT NULL, 
    dateStart DATE NOT NULL,
    deadline DATE NOT NULL,
    status VARCHAR(255)  CHECK (status = 'in progress' OR status = 'close'),
    leprojet INT NOT NULL,
    FOREIGN KEY(leprojet) REFERENCES projects(projects_id)
);

CREATE TABLE employee (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) CONSTRAINT ck_role CHECK (role = 'maintainer' OR role = 'designer' OR role = 'developer'),
    leprojet INT NOT NULL,
    FOREIGN KEY(leprojet) REFERENCES projects(projects_id)
);
