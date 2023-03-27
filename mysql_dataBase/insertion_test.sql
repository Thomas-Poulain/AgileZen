INSERT INTO projects (projects_id, name, desc, dateStart, deadline, status)
VALUES (1, 'Projet A', 'Description du projet A', '2023-01-01', '2023-03-31', 'in progress');

INSERT INTO projects (projects_id, name, desc, dateStart, deadline, status)
VALUES (2, 'Projet B', 'Description du projet B', '2023-02-01', '2023-05-31', 'in progress');

INSERT INTO employee (employee_id, name, role, leprojet)
VALUES (1, 'Alice', 'designer', 1);

INSERT INTO employee (employee_id, name, role, leprojet)
VALUES (2, 'Bob', 'developer', 1);

INSERT INTO employee (employee_id, name, role, leprojet)
VALUES (3, 'Charlie', 'maintainer', 2);

INSERT INTO tasks (tasks_id, desc, dateStart, deadline, status, leprojet)
VALUES (1, 'Tâche 1 du projet A', '2023-01-15', '2023-02-15', 'in progress', 1);

INSERT INTO tasks (tasks_id, desc, dateStart, deadline, status, leprojet)
VALUES (2, 'Tâche 2 du projet A', '2023-02-01', '2023-03-01', 'close', 1);

INSERT INTO tasks (tasks_id, desc, dateStart, deadline, status, leprojet)
VALUES (3, 'Tâche 1 du projet B', '2023-02-15', '2023-03-15', 'in progress', 2);

INSERT INTO tasks (tasks_id, desc, dateStart, deadline, status, leprojet)
VALUES (4, 'Tâche 2 du projet B', '2023-03-01', '2023-04-01', 'in progress', 2);