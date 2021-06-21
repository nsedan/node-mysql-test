const db = require("../connection");

// Retrieve all Users from the database.
exports.getAll = (req, res) => {
  const sql = `SELECT postmeta.post_id as product_id,
                    MAX(CASE WHEN (postmeta.meta_key='_sku') THEN postmeta.meta_value ELSE NULL END) AS 'sku',
                    MAX(CASE WHEN (postmeta.meta_key='unit_cost') THEN postmeta.meta_value ELSE NULL END) AS 'unit_cost',
                    MAX(CASE WHEN (postmeta.meta_key='per_pack') THEN postmeta.meta_value ELSE NULL END) AS 'per_pack',
                    MAX(CASE WHEN (postmeta.meta_key='per_carton') THEN postmeta.meta_value ELSE NULL END) AS 'per_carton',
                    MAX(CASE WHEN (postmeta.meta_key='finishes') THEN postmeta.meta_value ELSE NULL END) AS 'finishes',
                    MAX(CASE WHEN (postmeta.meta_key='packing') THEN postmeta.meta_value ELSE NULL END) AS 'packing',
                    MAX(CASE WHEN (postmeta.meta_key='material') THEN postmeta.meta_value ELSE NULL END) AS 'material'
                FROM wp_postmeta as postmeta
                JOIN wp_posts as posts
                    ON posts.ID = postmeta.post_id
                WHERE posts.post_type = "product"
                GROUP BY postmeta.post_id
                ORDER BY postmeta.post_id DESC`;

  db.query(sql, async (err, results) => {
    if (err) {
      throw err;
    }
    await res.json(results);
  });
};
