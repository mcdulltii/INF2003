CREATE TABLE `users` (
  `user_id` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  `user_password_hash` VARCHAR(255) NOT NULL,
  `is_admin` BOOLEAN NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX `idx_user` USING HASH ON `users` (`user_name`, `user_password_hash`);

CREATE TABLE `forums` (
  `forum_id` VARCHAR(255) NOT NULL,
  `forum_name` VARCHAR(255) NOT NULL,
  `forum_category` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`forum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX `idx_forum` USING HASH ON `forums` (`forum_name`, `forum_category`);

CREATE TABLE `posts` (
  `post_id` VARCHAR(255) NOT NULL,
  `user_id` VARCHAR(255) NOT NULL,
  `forum_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`post_id`),
  FOREIGN KEY (`forum_id`) REFERENCES `forums`(`forum_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX `idx_post` USING HASH ON `posts` (`user_id`, `forum_id`);

CREATE TABLE `votes` (
  `vote_id` VARCHAR(255) NOT NULL,
  `vote_counter` INT NOT NULL,
  `upvote_ratio` VARCHAR(255) NOT NULL,
  `post_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`vote_id`),
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX `idx_vote` USING HASH ON `votes` (`post_id`);

LOAD DATA INFILE '/mysql-import/users.csv' INTO TABLE users FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA INFILE '/mysql-import/forums.csv' INTO TABLE forums FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA INFILE '/mysql-import/posts.csv' INTO TABLE posts FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA INFILE '/mysql-import/votes.csv' INTO TABLE votes FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
