SELECT
  tran_review.id,
  tran_user.id as `user_id`,
  tran_user.name as `user_name`,
  tran_review.score,
  tran_review.visit_date,
  tran_review.post_date,
  tran_review.description
FROM
  tran_review
  LEFT JOIN
    tran_user
  ON  tran_review.user_id = tran_user.id
WHERE
  tran_review.shop_id = ?