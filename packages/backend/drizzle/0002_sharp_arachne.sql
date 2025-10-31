DROP INDEX IF EXISTS `users_email_unique`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `customers` DROP COLUMN `email`;