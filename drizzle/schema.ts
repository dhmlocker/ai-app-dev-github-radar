import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"), email: varchar("email", { length: 320 }), loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(), lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export const workbenchStates = mysqlTable("workbench_states", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull().unique(), state: text("state").notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export const workbenchSnapshots = mysqlTable("workbench_snapshots", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull(), label: varchar("label", { length: 160 }).notNull(), state: text("state").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type WorkbenchState = typeof workbenchStates.$inferSelect;
export type WorkbenchSnapshot = typeof workbenchSnapshots.$inferSelect;
