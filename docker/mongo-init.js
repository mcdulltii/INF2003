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

db.comments.createIndex( { post_id: -1 } );
db.posts.createIndex( { post_id: -1, post_datetime: -1 } );