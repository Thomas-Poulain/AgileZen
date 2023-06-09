db.createCollection("projects",
{
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["_id", "name", "description", "startDate","deadline", "status", "employee"],
            "properties": {
                "_id": {
                    "bsonType": "number",
                    "description": "Project id must be a number (required)."
                },
                "name": {
                    "bsonType": "string",
                    "description": "Project name must be a string (required)."
                },
                "description": {
                    "bsonType": "string",
                    "description": "Project description must be a string and is (required)."
                },
                "startDate": {
                    "bsonType": "string",
                    "description": "The start date must be a date (required)."
                },
                "deadline": {
                    "bsonType": "string",
                    "description": "The dead line must be a date (required)."
                },
                "status": {
                    "enum": ["todo", "in progress", "closed"],
                    "description": "Status project must be either in progress either closed (required)."
                },
                "employee": {
                    "bsonType": "array",
                    "items": {
                        "bsonType": "object",
                        "required": ["name", "role"],
                        "properties": {
                            "name": {
                                "bsonType": "string",
                                "description": "The name of the employee must be a string (required)."
                            },
                            "role": {
                                "enum": ["maintainer", "designer", "developer"],
                                "description": "Role of the employee is either maintainer, either designer either developer (required)."
                            }
                        }
                    }
                }
            }
        }
    }
})