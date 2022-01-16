-- LEFT JOIN tran_shop_categorys ON shop.id = tran_shop_categorys.shop_id
-- →これはshopとしてselectされたテーブルの項目をすべて残して、tran_shop_categorysに対になるデータ（対とする条件はshop.id = tran_shop_categorys.shop_id）があればそれを結合して1つのテーブルとして表示するという事
-- ※https://qiita.com/zaburo/items/548b3c40fee68cd1e3b7 が分かりやすかった

-- GROUP BY shop_category.id
-- →これはshop_categoryというテーブルのidカラムを基準にしてそのテーブル内のレコードをまとめるという事をしている
-- ※今回はGROUP BYしたものを、https://dev.mysql.com/doc/refman/5.6/ja/group-by-functions.html にある関数（GROUP_CONCAT）で文字列を連結して1つのレコードになるように調整している
-- ※単純にmst_shop_category.nameとすると、"Error Code: 1055. Expression #3 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'post-restaurant-reviews.mst_shop_category.name' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by"というエラーになる

SELECT
  shop_category.id,
  shop_category.name,
  shop_category.tel,
  shop_category.address,
  shop_category.score,
  shop_category.price_range,
  GROUP_CONCAT(mst_shop_category.name separator ', ') as categories
FROM
(
  SELECT
    id,
    name,
    tel,
    address,
    score,
    price_range,
    shop_id,
    category_id
  FROM
    (
      SELECT * FROM tran_shop WHERE id = ?
    ) as shop
  LEFT JOIN tran_shop_category ON shop.id = tran_shop_category.shop_id
) as shop_category
LEFT JOIN mst_shop_category ON shop_category.category_id = mst_shop_category.id
GROUP BY shop_category.id
