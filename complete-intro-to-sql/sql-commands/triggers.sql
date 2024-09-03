-- trigger is a specific type of function
-- use \df to see procedures and funcitons

CREATE TABLE updated_recipes (
  id INT GENERATED ALWAYS AS IDENTITY,
  recipe_id INT,
  old_title VARCHAR (255),
  new_title VARCHAR (255),
  time_of_update TIMESTAMP
);
-- timestamp is a datetime type



-- create a trigger
-- returns TRIGGER for a specific function 
CREATE OR REPLACE FUNCTION log_updated_recipe_name()
  RETURNS
    TRIGGER
  LANGUAGE
    plpgsql
AS
$$
BEGIN
  -- this is a conditional to control behavior
  IF OLD.title <> NEW.title THEN
    INSERT INTO
      updated_recipes (recipe_id, old_title, new_title, time_of_update)
    VALUES
      (NEW.recipe_id, OLD.title, NEW.title, NOW());
  END IF;
  -- need to close the block
  RETURN NEW;
END;
$$;

-- set the TRIGGER to run when recipes is updated
-- will run the trigger function for each row 
CREATE OR REPLACE TRIGGER updated_recipe_trigger
AFTER UPDATE ON recipes
  FOR EACH ROW EXECUTE PROCEDURE log_updated_recipe_name();

UPDATE recipes SET title = 'cookie dogs' WHERE recipe_id = 1;
SELECT * FROM recipes WHERE recipe_id = 1;
SELECT * FROM updated_recipes;