-- SQLite
DELETE FROM userposts where id=1707047278947;
ALTER TABLE userposts
RENAME COLUMN id to post_id;
DROP TABLE IF EXISTS userposts;
UPDATE userposts
SET image = 'server/assets/postImages/1708191553503_pager.jpg', tags='#convert files #excels'
WHERE post_id='ADMIN1708191558199POST_2';