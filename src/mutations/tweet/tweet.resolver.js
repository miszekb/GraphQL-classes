
const addTweet = async (parent, args, context) => {
    const createdAt = new Date();
    console.log(createdAt)
    // check if user is already in DB
    //if yes - assiociate him with this tweet
    //if no - create him
    let values = [args.username]
    const checkUserQuery = 'SELECT * FROM "User" WHERE username = $1';
    let userAdded = null;
    const resultUser = await context.db.query(checkUserQuery, values);
    if (!resultUser.rows[0]) {
        const addUserQuery = 'INSERT INTO "User" ("username") VALUES ($1) RETURNING *';
        userAdded = await context.db.query(addUserQuery, values);

    }

    const addTweetQuery = 'INSERT INTO "Tweet" ("text", "createdAt", "user") VALUES ($1, $2, $3) RETURNING *';
    values = [args.text, createdAt, userAdded.rows[0].id];
    const result = await context.db.query(addTweetQuery, values);
    return result.rows[0];
}

const removeTweet = async (parent, args, context) => {
    const removeTweetQuery = 'DELETE FROM "Tweet" WHERE id = $1 RETURNING *';
    const values = [args.id];
    const result = await context.db.query(removeTweetQuery, values);
    return result.rows[0];
}

const likeTweet = async (parent, args, context) => {
    const value = [args.id];
    const get = 'SELECT likes FROM "Tweet" WHERE Id = ($1)';
    const resultTweet = await context.db.query(get, value);
    // if(!resultTweet.rows[0]) {

    // }

    let likes = resultTweet.rows[0].likes;
    console.log("TYLE LAJKOW: "+ likes)
    likes++;

    const removeTweetQuery = 'UPDATE "Tweet" SET "likes" = $2 WHERE id = $1 RETURNING *';
    const values = [args.id, likes];
    const result = await context.db.query(removeTweetQuery, values);
    return result.rows[0];
}

const addComment = async (parent, args, context) => {
    
    // check if user is already in DB
    //if yes - assiociate him with this comment
    //if no - create him
    let values = [args.username]
    const checkUserQuery = 'SELECT * FROM "User" WHERE username = $1';
    const resultUser = await context.db.query(checkUserQuery, values);
    let userAdded = resultUser.rows[0];

    console.log("AAAAA" + resultUser);
    if (!userAdded) {
        const addUserQuery = 'INSERT INTO "User" ("username") VALUES ($1) RETURNING *';
        const temp = await context.db.query(addUserQuery, values);
        userAdded = temp.rows[0];
    }
    const createdAt = new Date();
    values = [args.text, createdAt, userAdded.id, args.tweetId];
    console.log("HALO: " + args.tweetId)
    const addCommentQuery = 'INSERT INTO "Comment" ("text", "createdAt", "user", "tweet") VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await context.db.query(addCommentQuery, values);

    return result.rows[0];

}

const getAllComments = async (parent, args, context) => {
    const addCommentQuery = 'SELECT * FROM "Comment"';
    const result = await context.db.query(addCommentQuery);
    return result.rows;
}

const commentTweet = async (parent, args, context) => {
    const value = [args.id];
    const get = 'SELECT likes FROM "Tweet" WHERE Id = ($1)';
    const resultTweet = await context.db.query(get, value);
    let comments = resultTweet.rows[0].comments;

    comments.push(args.comment);

    const addCommentQuery = 'UPDATE "Tweet" SET "comments" = ${comments} WHERE id = $1 RETURNING *';

}

// getTweetComments =

module.exports = {addTweet, removeTweet, likeTweet, commentTweet, addComment, getAllComments};
