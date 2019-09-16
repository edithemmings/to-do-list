-- NAME YOUR DATABASE: weekend-to-do-app

CREATE TABLE "tasks" (
"id" serial primary key,
"content" varchar(140) not null,
"done" boolean DEFAULT false
);

INSERT INTO "tasks" ("content", "done")
VALUES ('clean the kitchen', false), 
('water plants', false), 
('fold laundry', false), 
('grocery shop', false);