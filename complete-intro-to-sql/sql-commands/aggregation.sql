-- how many rows
SELECT COUNT(*) FROM ingredients;

-- how many levels
SELECT COUNT(DISTINCT type) FROM ingredients;

-- what levels
SELECT DISTINCT type FROM ingredients;

-- how many for each level ie. groups
SELECT 
    type, COUNT(*)
FROM
    ingredients 
GROUP BY
     type;
 
--  selected columns must appear in the GROUP BY clause or be used in an aggregate func

-- WHERE doesn't work for filtering the aggregate values created in the select clause
-- instead we need to use HAVING
SELECT
  type, COUNT(type)
FROM
  ingredients
GROUP BY
  type
HAVING
  COUNT(type) < 10;

-- but we can still use where on the other variables
SELECT
  type, COUNT(type)
FROM
  ingredients
WHERE
  id > 30
GROUP BY
  type
HAVING
  COUNT(type) < 10;

-- other agg functions are min, max, avg, ...