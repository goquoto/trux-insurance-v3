ALTER TABLE `users` ADD `accountStatus` enum('pending','approved','rejected') DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `authProvider` varchar(64);