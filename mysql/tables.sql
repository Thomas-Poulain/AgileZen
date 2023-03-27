DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employee;

CREATE TABLE projects (
    projects_id NUMBER
        CONSTRAINT pk_projects PRIMARY KEY,
    name VARCHAR(255)
        CONSTRAINT nn_name NOT NULL,
    desc VARCHAR(255)
        CONSTRAINT nn_desc NOT NULL,
    dateStart DATE
        CONSTRAINT nn_dateStart NOT NULL,
    deadline DATE
        CONSTRAINT nn_deadline NOT NULL,
    status VARCHAR(255)
        CONSTRAINT ck_status CHECK (statut = 'in progress' OR statut = 'close')
);

CREATE TABLE tasks (
    tasks_id NUMBER
        CONSTRAINT pk_tasks_id PRIMARY KEY,
    desc VARCHAR(255)
        CONSTRAINT nn_desc NOT NULL,
    dateStart DATE
        CONSTRAINT nn_dateStart NOT NULL,
    deadline DATE
        CONSTRAINT nn_deadline NOT NULL,
    status VARCHAR(255)
        CONSTRAINT ck_status CHECK (statut = 'in progress' OR statut = 'close'),
    leprojet NUMBER
        CONSTRAINT fk_leprojet REFERENCES projects (projects_id)
);

CREATE TABLE employee (
    employee_id NUMBER
        CONSTRAINT pk_employee_id PRIMARY KEY,
    name VARCHAR(255)
        CONSTRAINT nn_name NOT NULL,
    role VARCHAR(255)
        CONSTRAINT ck_role CHECK (role = 'maintainer' OR role = 'designer' OR role = 'developer'),
    leprojet NUMBER
        CONSTRAINT fk_leprojet REFERENCES projects (projects_id)
);

