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
db.createCollection("posts");
db.createCollection("comments");
