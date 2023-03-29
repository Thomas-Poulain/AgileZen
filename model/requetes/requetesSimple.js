//Basic insertion in project:
db.projets.insertOne({
    "_id":1,
    "name": "Project 1 URGENT",
    "description": "Desc",
    "startDate": "2022-01-01",
    "deadline": "2022-12-31",
    "status": "in progress",
    "employee": [
        {
            "name": "Pierre",
            "role": "developper"
        },
        {
            "name": "Jean",
            "role": "designer"
        }
    ]
})

//Search all documents
db.projets.find({})

//Search for a specific document by id
db.projets.findOne({_id: ObjectId("61f0e2b75bae321a9c65e140")})

//Search for all documents meeting a certain condition (here with a status set to 'in progress')
db.projets.find({ "status": "in progress" })

//Search for all documents containing a substring (here all projects containing "URGENT" in the name)
db.projects.find({ "name": /URGENT/ })

