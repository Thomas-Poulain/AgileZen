from pymongo import MongoClient

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