//Request to update a field of a document (here maj of the project description with the name 'Project 1 URGENT')
db.projects.updateOne(
    { "name": "Project 1 URGENT" },
    { $set: { "description": "New desc for project 1" } }
)

//Query to add an element in a list (here add an employee in project 2)
db.projects.updateOne(
    { "name": "Project 2" },
    { $push: { "employee": { "name": "Bobby", "task_id": ObjectId("61a5fd1be8b74d7e1be64d49"), "role": "maintainer" } } }
)

//Request to modify several documents at once (here change the description of all projects with 'URGENT' in the name)
db.projects.updateMany(
    { "name": /URGENT/ },
    { $set: { "description": "URGENT !" } }
)

//Deleting a project (here the project named "Project 3")
db.projects.deleteOne({ "name": "Projet 3" })

//Suppression of several projects at the same time (here all projects with a 'Closed' status)
db.projects.deleteMany({ "status": "closed" })


  
  