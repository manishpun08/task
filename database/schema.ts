import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);

// Define the 'users' table
export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  image: text('image'),
  role: ROLE_ENUM('role').default('USER'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Define the 'products' table
export const products = pgTable('products', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  name: varchar('name', { length: 55 }).notNull(),
  price: integer('price').notNull(),
  quantity: integer('quantity').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Define the 'categories' table
export const categories = pgTable('categories', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  image: text('image'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
