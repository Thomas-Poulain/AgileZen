db.createCollection("tasks",
{
  "validator":{
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["_id", "project_id", "desc", "dateStart", "deadline", "status"],
      
      "properties": { 
        "_id": {
          "bsonType":"number",
          "description": "The id of the task must be a number (required)."
        }, 
        "project_id": {
          "bsonType":"number",
          "description": "The id of the associated project must be a number (required)."
        },
        "desc": {
          "bsonType": "string",
          "description": "The description of the task must be a string (required)."
        },
        "dateStart": {
          "bsonType": "string",
          "description": "The date start of the task must be a string (required)."
        },
        "deadline": {
          "bsonType": "string",
          "description": "The dead line of the task must be a string (required)."
        },
        "status": {
          "enum": ["todo", "in progress", "close"],
          "description": "The description of the task is either 'in progress or close' (required)."
        }
      }
    }
  }
})   