//Aggregation query to calculate the total number of tasks for each project:
db.tasks.aggregate([
  {$group: {_id: "$project_id", totalTasks: {$sum: 1}}}
])


//Aggregation query to find all open tasks that have a deadline in the next 7 days:
db.tasks.aggregate([
    { $match: {
        status: "in progress",
        deadline: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
      }
    },
    { $lookup: {
        from: "projects",
        localField: "_id",
        foreignField: "project_id",
        as: "project"
      }
    }
  ])


  db.projects.count()


//Aggregation query to calculate the total number of tasks for each project:
db.projets.aggregate([
    {
      $project: {
        _id: 1,
        numberOfEmployees: { $size: "$employee" }
      }
    },
    {
      $group: {
        _id: "$_id",
        totalEmployees: { $sum: "$numberOfEmployees" }
      }
    },
    {
      $project: {
        _id: 1,
        totalEmployees: 1
      }
    }
  ])
  

//Aggregation query to find all projects that have at least one task in progress:
db.projects.aggregate([
    { $lookup: {
        from: "tasks",
        localField: "project_id",
        foreignField: "_id",
        as: "tasks"
      }
    },
    { $match: {
        "tasks.status": "in progress"
      }
    }
  ])

// Aggregation query to get the total number of overdue tasks for each project :
   db.projects.aggregate([
    { $unwind: "$employee" },
    { $lookup: {
        from: "tasks",
        localField: "project_id",
        foreignField: "_id",
        as: "task"
      }
    },
    { $unwind: "$task" },
    { $match: { "task.deadline": { $lt: new Date() } } },
    { $group: {
        _id: "$name",
        count: { $sum: 1 }
      }
    }
  ])
  



  db.tasks.aggregate([
    {$match: {status: "in progress"}},
    {$lookup: {from: "projects", localField: "project_id", foreignField: "_id", as: "project"}},
    {$unwind: "$project"},
    {$group: {_id: "$project._id", project: {$first: "$project"}}},
    {$project: {_id: "$project._id", name: "$project.name"}}
  ])

  
  db.tasks.aggregate([
    {$match: {status: "in progress", deadline: {$lt: new Date()}}},
    {$lookup: {from: "projects", localField: "project_id", foreignField: "_id", as: "project"}},
    {$unwind: "$project"},
    {$group: {_id: "$project._id", project: {$first: "$project"}, lateTasks: {$push: "$$ROOT"}}},
    {$project: {_id: "$project._id", name: "$project.name", lateTasks: 1}}
  ])
  
  
  
  db.tasks.aggregate([
    {$match: {status: "close"}},
    {$project: {duration: {$subtract: [{$toDate: "$deadline"}, {$toDate: "$dateStart"}]}}},
    {$group: {_id: "$_id", totalDuration: {$sum: "$duration"}}}
  ])
  