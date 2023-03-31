import random
import string
from pymongo import MongoClient
import matplotlib.pyplot as plt
import time

# Connection à la base de données
client = MongoClient('mongodb://localhost:27017/')
db = client['AgileZen']

# Création de la liste des rôles
roles = ["maintainer", "designer", "developer"]

# Fonction pour générer une date aléatoire au format ISO
def random_date():
    year = random.randint(2000, 2022)
    month = random.randint(1, 12)
    day = random.randint(1, 28)
    return f"{year}-{month:02}-{day:02}T00:00:00Z"

# Supprimer tous les documents de la collection 'projects'
db.projects.delete_many({})

# Supprimer tous les documents de la collection 'tasks'
db.tasks.delete_many({})

print("Collections vidées !")

def count(i, insertion):
    if i % pas == 0:
        counts.append(insertion)
        times.append(time.time() - start_time)


#Var
it = 100001
pas = 100
insertion = 0
counts = []
times = []

start_time = time.time()

# Boucle pour insérer 100000 projets et tâches dans les collections
for i in range(1,it):
    # Génération des données pour un projet
    project_data = {
        "_id": i,
        "name": f"Projet {i}",
        "description": "".join(random.choices(string.ascii_letters, k=50)),
        "startDate": random_date(),
        "deadline": random_date(),
        "status": random.choice(["todo", "in progress", "closed"]),
        "employee": [
            {
                "name": "".join(random.choices(string.ascii_letters, k=10)),
                "role": random.choice(roles)
            },
            {
                "name": "".join(random.choices(string.ascii_letters, k=10)),
                "role": random.choice(roles)
            }
        ]
    }
    # Insertion du projet dans la collection "projects"
    db.projects.insert_one(project_data)
    insertion += 1
    count(i, insertion)

    # Génération des données pour une tâche
    task_data = {
        "_id": i,
        "project_id": i,
        "desc": "".join(random.choices(string.ascii_letters, k=50)),
        "dateStart": random_date(),
        "deadline": random_date(),
        "status": random.choice(["todo", "in progress", "close"])
    }
    # Insertion de la tâche dans la collection "tasks"
    db.tasks.insert_one(task_data)
    insertion += 1
    count(i, insertion)

print("Insertion terminée !")
# Tracer le graphe avec matplotlib
plt.plot(times, counts)
plt.xlabel('Temps (s)')
plt.ylabel('Nombre d\'insertions')
plt.title('Monté en charge pour une base de données MongoDB')
plt.show()