CREATE TABLE `forums` (
  `forum_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `forum_name` VARCHAR(255) NOT NULL,
  `forum_category` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`forum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `forum_id` INT UNSIGNED NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`forum_id`) REFERENCES `forums`(`forum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

