CREATE TABLE `submission_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submissionId` int NOT NULL,
	`s3Key` varchar(512) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`size` int NOT NULL,
	`mime` varchar(100) NOT NULL,
	CONSTRAINT `submission_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ref` varchar(20) NOT NULL,
	`type` enum('policy_change','certificate','claim','account_review','contact','fast_quote','full_quote') NOT NULL,
	`userId` int,
	`customerEmail` varchar(255),
	`takenByUserId` int,
	`workStatus` enum('new','in_progress','done') NOT NULL DEFAULT 'new',
	`data` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `submissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `submissions_ref_unique` UNIQUE(`ref`)
);
--> statement-breakpoint
CREATE TABLE `vin_cache` (
	`vin` varchar(17) NOT NULL,
	`decodedJson` json NOT NULL,
	`status` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vin_cache_vin` PRIMARY KEY(`vin`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `title` varchar(255);