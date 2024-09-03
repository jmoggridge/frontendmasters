-- procedures are more limited than functions

-- imagine needing to switch a bunch of nulls to default image tags
INSERT INTO ingredients (title, type) VALUES ('venison', 'meat');

SELECT * FROM ingredients WHERE image IS NOT NULL;

CREATE PROCEDURE 
    set_null_ingredient_img_to_default()
LANGUAGE    
    sql
AS 
$$
UPDATE
    ingredients
SET 
    image = 'default.jpg'
WHERE
    image IS NULL;
$$;

--  use CALL to run the procedure
CALL set_null_ingredient_img_to_default();

