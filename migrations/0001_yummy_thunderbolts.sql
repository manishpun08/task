ALTER TABLE "products" DROP CONSTRAINT "products_admin_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "brand";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "free_shipping";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "admin_id";