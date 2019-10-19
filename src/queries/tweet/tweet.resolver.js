
const getTweet = async (parent, args, context) => {
    // console.log(tweets);
    // return tweets.map(tweet => {
    //     if(tweet.id === args.id) {
    //         console.log('ID: ' + tweet.id)
    //         return tweet.id;
    //     }
    // })

    // return tweets.find(tweet => {
    //     if(tweet.id === args.id) {
    //         return tweet;
    //     }
    // });
    const value = [args.id];
    const get = 'SELECT * FROM "Tweet" WHERE Id = ($1)';
    const result = await context.db.query(get, value);
    return result.rows[0];

}

const getTweets = async (parent, args, context) => {

    const values = [args.limit, args.offset];
    const get = 'SELECT * FROM "Tweet" LIMIT $1 OFFSET $2';
    const result = await context.db.query(get, values);
    return result.rows;

}

module.exports = {getTweet, getTweets};;