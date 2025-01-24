CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`body` text NOT NULL,
	`is_read` integer DEFAULT false NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`rental_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`rental_id`) REFERENCES `rentals`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP TABLE `recent_searches`;