# AgileZen / Thomas POULAIN, Tiutouan JAMET

### AgileZen c'est quoi ?

AgileZen est une base de données servant à l'organisation d'un projet de groupe

*Représentation d'un magasin composé de rayons et d'articles*
---

---
## Construire une base de données
> use AgileZen
### Schéma de la collection articles
Le shéma de la collection se trouve dans le fichier **schema_articles.json**
il suffit de copier coller le code dans mongoDB

### Pour remplir et tester la base de données
> mongoimport --db AgileZen --collection projets --file scriptTest/data_projet_valid.json --jsonArray 

> mongoimport --db magasin --collection articles --file mauvais_exemples_articles.json --jsonArray

