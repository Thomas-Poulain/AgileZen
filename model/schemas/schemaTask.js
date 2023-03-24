db.createCollection("tasks",
{
  "validator":{
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["task_id", "desc", "dateStart", "deadline", "status"],
      "properties": { 
        "project_id": {
          "bsonType":"number",
          "description": "The id of the task must be a objectId (required)."
        },
        "desc": {
          "bsonType": "string",
          "description": "The description of the task must be a string (required)."
        },
        "dateStart": {
          "bsonType": "date",
          "description": "The date start of the task must be a date (required)."
        },
        "deadline": {
          "bsonType": "date",
          "description": "The dead line of the task must be a date (required)."
        },
        "status": {
          "enum": ["in progress", "close"],
          "description": "The description of the task is either 'in progress or close' (required)."
        }
      }
    }
  }
})   