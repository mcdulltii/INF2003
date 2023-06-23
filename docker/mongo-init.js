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
              bsonType: "int",
              description: "must be an integer and is required"
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
})
db.createCollection("comments");
