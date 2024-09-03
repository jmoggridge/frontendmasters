-- QUESTIONS

-- which made most $
SELECT name, coalesce(revenue, 0) AS revenue FROM movies ORDER BY revenue DESC LIMIT 1;

SELECT 
    name, revenue 
FROM movies 
ORDER BY revenue DESC NULLS LAST 
LIMIT 1;
-- Avengers: Endgame | 2797501328

-- coalesce(x, 0)


-- how much money did keanu movies make in total ( sum (revenue) )
--  Keanu Reeves | 5,065,803,558

 SELECT 
    p.name, SUM(COALESCE(m.revenue,0))
 FROM 
    people p
 INNER JOIN 
    casts c ON c.person_id = p.id
 INNER JOIN 
    movies m ON m.id = c.movie_id
GROUP BY
    p.name
HAVING
    p.name = 'Keanu Reeves';
 

 

-- which 5 people were in the movies that had the most revenue



-- which 10 movies have the most keywords
SELECT m.id, m.name, COUNT(c.id) FROM movies m
INNER JOIN movie_keywords mk ON mk.movie_id = m.id
INNER JOIN categories c ON mk.category_id = c.id
GROUP BY m.id, m.name
ORDER BY count DESC
LIMIT 10;

--   id   |        name         | count 
-- -------+---------------------+-------
--  68123 | Iskanderija... lih? |   201
--   4251 | वीर-ज़ारा              |   184
--  67368 | Awaara              |   179
--  66731 | Pyaasa              |   157
--  64394 | Agneepath           |   153
--  63820 | Mogambo             |   150
--  61019 | 3 Idiots            |   124
--    227 | The Outsiders       |   121
--  64393 | Agneepath           |   120
--  66095 | Bhalo Theko         |   117



-- which category has the most movies



SELECT c.id, c.name, COUNT(m.id)
FROM movies m
INNER JOIN movie_keywords mk ON mk.movie_id = m.id
INNER JOIN categories c ON mk.category_id = c.id
GROUP BY c.id, c.name
ORDER BY count DESC
LIMIT 10;

--            name           | count 
-- --------------------------+-------
--  Falling in Love          |  2921