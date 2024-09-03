--  docker run -e POSTGRES_PASSWORD=lol --name=pg --rm -d -p 5432:5432 btholt/complete-intro-to-sql
-- docker exec -u postgres -it pg psql

ALTER TABLE recipes
ADD COLUMN meta JSONB;

-- get attribute from json object
SELECT meta -> 'tags' FROM recipes WHERE meta IS NOT NULL;
-- get item from array in attribute, -> gives json object
SELECT meta -> 'tags' -> 0 FROM recipes WHERE meta IS NOT NULL;
-- get text data out of json string obj
SELECT meta -> 'tags' ->> 0 FROM recipes WHERE meta IS NOT NULL;

-- '? checks for top level key
SELECT recipe_id, title, meta -> 'tags' FROM recipes WHERE meta -> 'tags' ? 'cake';
-- the @> is doing a "does this array contains this
SELECT recipe_id, title, meta -> 'tags' FROM recipes WHERE meta -> 'tags' @> '"cake"';


