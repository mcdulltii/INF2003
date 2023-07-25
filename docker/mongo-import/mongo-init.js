sh.enableSharding("mongo_db")
sh.shardCollection("mongo_db.posts", {"post_id": 1})
sh.shardCollection("mongo_db.comments", {"post_id": 1})
