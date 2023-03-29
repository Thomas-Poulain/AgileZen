//Request to update a field of a document (here maj of the project description with the name 'Project 1 URGENT')
db.projets.updateOne(
    { "name": "Project 1 URGENT" },
    { $set: { "description": "New desc for project 1" } }
)

//Query to add an element in a list (here add an employee in project 2)
db.projets.updateOne(
    { "name": "Project 1 URGENT" },
    { $push: { "employee": { "name": "Bobby", "role": "maintainer" } } }
)

//Request to modify several documents at once (here change the description of all projects with 'URGENT' in the name)
db.projets.updateMany(
    { "name": /URGENT/ },
    { $set: { "description": "URGENT !" } }
)

//Deleting a project (here the project named "Project 3")
db.projets.deleteOne({ "name": "Projet 3" })

//Suppression of several projects at the same time (here all projects with a 'Closed' status)
db.projets.deleteMany({ "status": "closed" })


  
  