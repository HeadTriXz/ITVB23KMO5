CREATE TABLE `cars` (
	`id` integer PRIMARY KEY NOT NULL,
	`brand` text NOT NULL,
	`fuel` text NOT NULL,
	`latitude` real NOT NULL,
	`license_plate` text NOT NULL,
	`longitude` real NOT NULL,
	`model` text NOT NULL,
	`model_year` integer NOT NULL,
	`nr_of_seats` integer NOT NULL,
	`picture` text NOT NULL,
	`price` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`car_id` integer NOT NULL,
	FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recent_searches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`query` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rentals` (
	`id` integer PRIMARY KEY NOT NULL,
	`car_id` integer NOT NULL,
	`from_date` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`state` text NOT NULL,
	`to_date` text NOT NULL,
	FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON UPDATE no action ON DELETE no action
);
