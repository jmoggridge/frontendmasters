const path = require("path");
const express = require("express");
const router = express.Router();

// client side static assets
router.get("/", (_, res) => res.sendFile(path.join(__dirname, "./index.html")));
router.get("/client.js", (_, res) =>
  res.sendFile(path.join(__dirname, "./client.js"))
);
router.get("/detail-client.js", (_, res) =>
  res.sendFile(path.join(__dirname, "./detail-client.js"))
);
router.get("/style.css", (_, res) =>
  res.sendFile(path.join(__dirname, "../style.css"))
);
router.get("/detail", (_, res) =>
  res.sendFile(path.join(__dirname, "./detail.html"))
);

/**
 * Student code starts here
 */

// connect to postgres
// connect to postgres
const pg = require("pg");
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "recipeguru",
  password: "lol",
  port: 5432,
});

router.get("/search", async function (req, res) {
  console.log("search recipes");

  const { rows } = await pool.query(
    // return recipe_id, title, and the first photo as url
    // for recipes without photos, return url as default.jpg
    `SELECT DISTINCT ON (r.recipe_id)
      r.recipe_id, r.title, COALESCE(p.url, 'default.jpg') AS url
    FROM
      recipes r
    LEFT JOIN
      recipes_photos p
    ON 
      r.recipe_id = p.recipe_id;`
  );
  res.status(200).json({ rows });

  //
});

router.get("/get", async (req, res) => {
  const recipeId = req.query.id ? +req.query.id : 1;
  console.log("recipe get", recipeId);

  //    name the ingredient image `ingredient_image`
  //    name the ingredient type `ingredient_type`
  //    name the ingredient title `ingredient_title`
  const ingredientsPromise = await pool.query(
    `SELECT
      i.title as ingredient_title,
      i.type as ingredient_type,
      i.image as ingredient_image
    FROM
      ingredients i
    INNER JOIN
      recipe_ingredients ri
    ON
      i.id = ri.ingredient_id
    WHERE
      ri.recipe_id = $1`,
    [recipeId]
  );

  const photoPromise = await pool.query(
    `SELECT
      r.title as title,
      r.body as body,
      COALESCE(rp.url, 'default.jpg') AS url
    FROM
      recipes r
    LEFT JOIN
      recipes_photos rp
    ON
      r.recipe_id = rp.recipe_id
    WHERE
      r.recipe_id = $1`,
    [recipeId]
  );

  // return the title, body, and url (named the same)
  // return all photo rows as photos
  const [{ rows: photosRows }, { rows: ingredientsRows }] = await Promise.all([
    photoPromise,
    ingredientsPromise,
  ]);
  res.status(200).json({
    photos: photosRows.map((p) => p.url),
    // return all ingredient rows as ingredients
    ingredients: ingredientsRows,
    // return the title as title
    title: photosRows[0].title,
    // return the body as body
    body: photosRows[0].body,
    // if no row[0] has no photo, return it as default.jpg
    url: photosRows[0]?.url || "default.jpg",
  });
});

module.exports = router;
