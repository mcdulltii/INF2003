CREATE TABLE `users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) NOT NULL,
  `user_password_hash` VARCHAR(255) NOT NULL,
  `is_admin` BOOLEAN NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `forums` (
  `forum_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `forum_name` VARCHAR(255) NOT NULL,
  `forum_category` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`forum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `posts` (
  `post_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `forum_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`post_id`),
  FOREIGN KEY (`forum_id`) REFERENCES `forums`(`forum_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `votes` (
  `vote_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `vote_counter` INT NOT NULL,
  `upvote_ratio` VARCHAR(255) NOT NULL,
  `post_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`vote_id`),
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOAD DATA INFILE '/var/lib/mysql-import/posts.csv' INTO TABLE posts FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA INFILE '/var/lib/mysql-import/forums.csv' INTO TABLE forums FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA INFILE '/var/lib/mysql-import/users.csv' INTO TABLE users FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;