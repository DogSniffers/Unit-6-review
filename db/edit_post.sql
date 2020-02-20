UPDATE post SET text = $1
WHERE post_id = $2
-- Without this line will update every line of text