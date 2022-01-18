SELECT
  shop_category.id,
  shop_category.name,
  shop_category.tel,
  shop_category.address,
  shop_category.score,
  GROUP_CONCAT(mst_shop_category.name separator ', ') as categories
FROM
(
  SELECT
    shop.id,
    shop.name,
    shop.tel,
    shop.address,
    shop.score,
    shop.price_range,
    tran_shop_category.shop_id,
    tran_shop_category.category_id
  FROM
    (
      SELECT * FROM tran_shop ORDER BY score DESC LIMIT ?, ?
    ) as shop
  LEFT JOIN tran_shop_category ON shop.id = tran_shop_category.shop_id
) as shop_category
LEFT JOIN mst_shop_category ON shop_category.category_id = mst_shop_category.id
GROUP BY shop_category.id
ORDER BY score DESC