-- Ajout d'un nouveau projet
INSERT INTO projects (projects_id, name, description, dateStart, deadline, status)
VALUES (1, 'Projet 1', 'Description du projet 1', '2023-04-01', '2023-05-31', 'in progress');

-- Ajout d'une tâche pour le projet 1
INSERT INTO tasks (tasks_id, description, dateStart, deadline, status, leprojet)
VALUES (1, 'Tâche 1 du projet 1', '2023-04-01', '2023-04-30', 'in progress', 1);

-- Ajout d'un employé assigné au projet 1
INSERT INTO employee (employee_id, name, role, leprojet)
VALUES (1, 'John Doe', 'developer', 1);

-- Ajout d'un nouveau projet
INSERT INTO projects (projects_id, name, description, dateStart, deadline, status)
VALUES (2, 'Projet 2', 'Description du projet 2', '2023-06-01', '2023-07-31', 'in progress');

-- Ajout de deux tâches pour le projet 2
INSERT INTO tasks (tasks_id, description, dateStart, deadline, status, leprojet)
VALUES (2, 'Tâche 1 du projet 2', '2023-06-01', '2023-06-30', 'in progress', 2),
(3, 'Tâche 2 du projet 2', '2023-07-01', '2023-07-31', 'close', 2);

-- Ajout de deux employés assignés au projet 2
INSERT INTO employee (employee_id, name, role, leprojet)
VALUES (2, 'Jane Smith', 'designer', 2),
(3, 'Bob Johnson', 'developer', 2);

-- Ajout d'un nouveau projet
INSERT INTO projects (projects_id, name, description, dateStart, deadline, status)
VALUES (3, 'Projet 3', 'Description du projet 3', '2023-08-01', '2023-09-30', 'in progress');

-- Ajout de trois tâches pour le projet 3
INSERT INTO tasks (tasks_id, description, dateStart, deadline, status, leprojet)
VALUES (4, 'Tâche 1 du projet 3', '2023-08-01', '2023-08-31', 'in progress', 3),
(5, 'Tâche 2 du projet 3', '2023-09-01', '2023-09-15', 'in progress', 3),
(6, 'Tâche 3 du projet 3', '2023-09-16', '2023-09-30', 'close', 3);

-- Ajout de deux employés assignés au projet 3
INSERT INTO employee (employee_id, name, role, leprojet)
VALUES (4, 'Alice Brown', 'developer', 3),
(5, 'Samuel Lee', 'maintainer', 3);