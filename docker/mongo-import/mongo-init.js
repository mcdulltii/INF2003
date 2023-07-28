sh.enableSharding("mongo_db");
sh.shardCollection("mongo_db.posts", {"_id": 1});
sh.shardCollection("mongo_db.comments", {"_id": 1});

use mongo_db;
db.comments.createIndex( { post_id: -1 } );
db.posts.createIndex( { post_id: -1, post_datetime: -1 } );
