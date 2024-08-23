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

- DELETE ... WHERE ... RETURNING *; 

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
 
