UPDATE
  tran_shop
SET
  score = (
    SELECT round(avg(score), 2) FROM tran_review WHERE shop_id = ?
  )
WHERE
  id = ?
