db.createUser(
    {
        user: "user",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "mongo_db"
            }
        ]
    }
);

db.createCollection("posts", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "post_id", "post_datetime", "post_title", "post_url", "flair_text" ],
         properties: {
           post_id: {
              bsonType: "string",
              description: "must be an string and is required"
           },
           post_datetime: {
              bsonType: "string",
              description: "must be a string and is required"
           },
           post_title: {
              bsonType: "string",
              description: "must be a string and is required"
           },
           post_url: {
              bsonType: "string",
              description: "must be a string and is required"
           },
           flair_text: {
              bsonType: "string",
              description: "must be a string and is required"
           }
         }
      }
   }
});

db.createCollection("comments", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "comment_message", "post_id" ],
         properties: {
           comment_message: {
              bsonType: "string",
              description: "must be a string and is required"
           },
           post_id: {
              bsonType: "string",
              description: "must be an string and is required"
           }
         }
      }
   }
});

