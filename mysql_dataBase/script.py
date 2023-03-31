import mysql.connector
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import random

# Connexion à la base de données
db = mysql.connector.connect(user='root',
        password='root',
        host='localhost',
        database='AgileZen'
        )

# Requêtes SQL pour créer les tables
sql = [
    'DROP TABLE IF EXISTS tasks;',
    'DROP TABLE IF EXISTS employee;',
    'DROP TABLE IF EXISTS projects;',
    '''
    CREATE TABLE projects (
        projects_id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        dateStart DATE NOT NULL,
        deadline DATE NOT NULL,
        status VARCHAR(255) CONSTRAINT ck_status CHECK (status = 'in progress' OR status = 'close')
    );
    ''',
    '''
    CREATE TABLE tasks (
        tasks_id INT PRIMARY KEY,
        description VARCHAR(255) NOT NULL, 
        dateStart DATE NOT NULL,
        deadline DATE NOT NULL,
        status VARCHAR(255)  CHECK (status = 'in progress' OR status = 'close'),
        leprojet INT NOT NULL,
        FOREIGN KEY(leprojet) REFERENCES projects(projects_id)
    );
    ''',
    '''
    CREATE TABLE employee (
        employee_id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) CONSTRAINT ck_role CHECK (role = 'maintainer' OR role = 'designer' OR role = 'developer'),
        leprojet INT NOT NULL,
        FOREIGN KEY(leprojet) REFERENCES projects(projects_id)
    );
    '''
]

# Connexion à la base de données et exécution des requêtes SQL
try:
    cursor = db.cursor()
    for query in sql:
        cursor.execute(query)
    db.commit()
    print('Tables créées avec succès')
except mysql.connector.Error as error:
    print('Erreur lors de la création des tables :', error)

#Nombre itération

it = 100000
nbTasks = 0

# Fonction pour générer une date aléatoire entre deux dates données
def random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds()))
    )

try:
    # Insertion de données dans la table 'projects'
    for i in range(1, it):
        name = "name " + str(i)
        description = "Description for " + str(i)
        dateStart = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        deadline = random_date(datetime.now(), datetime(2025, 12, 31)).strftime('%Y-%m-%d %H:%M:%S')
        status = random.choice(["in progress", "close"])
        sql = "INSERT INTO projects (projects_id, name, description, dateStart, deadline, status) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (i, name, description, dateStart, deadline, status)
        cursor.execute(sql, val)
        db.commit()
        nbTasks += 1

    # Insertion de données dans la table 'tasks'
    for i in range(1, it):
        description = "Description task " + str(i)
        dateStart = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        deadline = random_date(datetime.now(), datetime(2025, 12, 31)).strftime('%Y-%m-%d %H:%M:%S')
        status = random.choice(["in progress", "close"])
        leprojet = random.randint(1, nbTasks)
        sql = "INSERT INTO tasks (tasks_id, description, dateStart, deadline, status, leprojet) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (i, description, dateStart, deadline, status, leprojet)
        cursor.execute(sql, val)
        db.commit()

    # Insertion de données dans la table 'employee'
    for i in range(1, it):
        name = "Employee " + str(i)
        role = random.choice(["maintainer", "designer", "developer"])
        leprojet = random.randint(1, nbTasks)
        sql = "INSERT INTO employee (employee_id, name, role, leprojet) VALUES (%s, %s, %s, %s)"
        val = (i, name, role, leprojet)
        cursor.execute(sql, val)
        db.commit()
except mysql.connector.Error as error:
    print('Erreur lors de l\'insertion des données :', error)
finally:
    print('Données insérées avec succès')

# Fermeture de la connexion à la base de données
db.close()

# Tracer le graphe avec matplotlib
dates = [datetime.strptime(row[0], '%Y-%m-%d') for row in results]
counts = [row[1] for row in results]
plt.plot(dates, counts)
plt.xlabel('Date')
plt.ylabel('Nombre d\'insertions')
plt.title('Nombre d\'insertions par jour')
plt.show()
