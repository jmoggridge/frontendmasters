# frontend masters: complete intro to sql   

- course website - https://sql.holt.courses/lessons/welcome/docker   

## Setup

needs  
- docker  
- docker images  

psql is the client to interact with postgres databases

Commands:  
- \? help  
- \l list databases  
- \d list relations  

Templates: don't use these, just create tables from scratch. Never alter template0  

## Notes

- Single quotes in SQL means "this is a literal value". 
- Double quotes in SQL mean "this is an identifier of some variety".
- `--` starts a comment
- `x = y` single equals tests for equality; `x <> y` tests for not-equal 
 


##  Procedures

### Creational

#### Create db, tables, and columns 
  
- CREATE DATABASE name;    
- CREATE TABLE name;    
- ALTER TABLE name ...commands...;    
  - ADD COLUMN varname ... ;  
  - DROP COLUMN varname;  

#### Insert & Upsert
   
  - INSERT INTO table ( vars ) VALUES ('row1'), ('row2');
  - ON CONFLICT DO ...
    - NOTHING, UPDATE SET, ...

#### Update
  
- `UPDATE table SET var = 'something' WHERE searchvar = 'target'`;  
- `WHERE` is a filter on a predicate  
- `RETURNING vars` gives a printout of the rows  

#### Delete Rows

- DELETE FROM table WHERE var='something' RETURNING *; 



### Querying

- SELECT * FROM table
- WHERE (=, <>, AND, OR, ...)
- LIMIT and OFFSET
  - OFFSET can miss insertion/deletion so use `WHERE id > last_id LIMIT x;` to get the next chunk
- ORDER BY ... DESC | ASC
- HAVING


### Pattern matching

- WHERE var LIKE 'pattern'
- LIKE & ILIKE for case insensitive
- `%` wildcard for rest of string (suffix and/or prefix)
- `_` wildcard for single character

### FUNCTIONS

- LOWER(x)  
- UPPER(x)  
- WHERE CONCAT(x, y) ILIKE
- NOW
 


### JOINS

- SELECT * FROM lefttable x INNER JOIN righttable y ON x.id = y.id
- FULL JOIN
- LEFT JOIN
- RIGHT JOIN 
- NATURAL JOIN 
- CROSS JOIN 


### Deleting relations

- need to remove linked data across multiple tables to avoid pointless dead data being left in tables
- we use the REFERENCES tables(var) ON DELETE (CASCADE | DO NOTHING | SET NULL | NO ACTION)

```
CREATE TABLE recipes_photos (
  photo_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  url VARCHAR(255) NOT NULL,
  recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE CASCADE
);
```


- what if there are multiple foreign keys??
  - eg. this mapping between recipes and ingredients needs to not be deleted by itself
- here we allow only distinct rows by setting both columns as the primary key

```
CREATE TABLE recipe_ingredients (
  recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE NO ACTION,
  ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE NO ACTION,
  CONSTRAINT recipe_ingredients_pk PRIMARY KEY (recipe_id, ingredient_id)
);
```


### Constraints

we put these on our columns already when using CREATE TABLE and ADD COLUMN

- NOT NULL
- UNIQUE
- foreign keys also put constraints

#### Check values

ADD CHECK constraint is good for data validation and enforcing enums / factor levels

```
ALTER TABLE ingredients
ADD CONSTRAINT type_enums
CHECK
  (type IN ('meat','fruit','vegetable','other'));
```















