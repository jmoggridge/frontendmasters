
-- imagine this query is common
SELECT r.title FROM recipe_ingredients ri
INNER JOIN recipes r ON r.recipe_id = ri.recipe_id
GROUP BY r.title
HAVING COUNT(r.title) BETWEEN 4 AND 6;

-- use a function to store the query in PLPGSQL
-- doesn't need OR REPLACE, creation will fail if exists
-- can include parameters for variables in function call
-- $$ create a code block
CREATE OR REPLACE FUNCTION
  get_recipes_with_ingredients(low INT, high INT)
RETURNS
  SETOF VARCHAR
LANGUAGE
  plpgsql
AS
$$
BEGIN
  RETURN QUERY SELECT
    r.title
  FROM
    recipe_ingredients ri
  INNER JOIN
    recipes r
  ON
    r.recipe_id = ri.recipe_id
  GROUP BY
    r.title
  HAVING
    COUNT(r.title) between low and high;
END;
$$;

-- use the function in a query
SELECT * FROM get_recipes_with_ingredients(6,7);

-- can also drop functons
DROP FUNCTION get_recipes_with_ingredients;


