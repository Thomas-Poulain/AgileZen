import random
import string
from pymongo import MongoClient

# Connection à la base de données
client = MongoClient('mongodb://localhost:27017/')
db = client['ma_base_de_donnees']

# Création de la liste des rôles
roles = ["maintainer", "designer", "developer"]

# Fonction pour générer une date aléatoire au format ISO
def random_date():
    year = random.randint(2000, 2022)
    month = random.randint(1, 12)
    day = random.randint(1, 28)
    return f"{year}-{month:02}-{day:02}T00:00:00Z"

# Boucle pour insérer 100000 projets et tâches dans les collections
for i in range(100000):
    # Génération des données pour un projet
    project_data = {
        "_id": i+1,
        "name": f"Projet {i+1}",
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

    # Génération des données pour une tâche
    task_data = {
        "_id": i+1,
        "project_id": i+1,
        "desc": "".join(random.choices(string.ascii_letters, k=50)),
        "dateStart": random_date(),
        "deadline": random_date(),
        "status": random.choice(["todo", "in progress", "close"])
    }
    # Insertion de la tâche dans la collection "tasks"
    db.tasks.insert_one(task_data)

print("Insertion terminée !")
