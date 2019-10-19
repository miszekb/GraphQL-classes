const {GraphQLServer} = require('graphql-yoga');
const {hello, helloWithName} = require('./src/queries/helloQueries/hello.resolver');
const {incrementMutation} = require('./src/mutations/helloMutations/hello.resolver');
const {getTweet, getTweets} = require('./src/queries/tweet/tweet.resolver');
const {addTweet, removeTweet, likeTweet, commentTweet, addComment, getAllComments} = require('./src/mutations/tweet/tweet.resolver');
const {Client} = require('pg');
const {getUser} = require('./src/mutations/user/user.resolver');
const {getAllUsers} = require('./src/queries/user/user.resolver');

const DATABASE_URL = "postgresql://admin321:admin123@htdacademy.cuh9o35zdbq1.eu-west-1.rds.amazonaws.com/graphql";

const client = new Client({connectionString: DATABASE_URL});

client.connect();

const resolvers = {
    Query: {
        hello,
        helloWithName,
        getTweet,
        getTweets,
        getUser,
        getAllUsers,
        getAllComments
    },
    Mutation: {
        incrementMutation,
        addTweet,
        removeTweet,
        likeTweet,
        commentTweet,
        addComment
    },
    Tweet: {
        user: (tweet, args, context) => getUser(tweet, {id: tweet.user}, context),
        comments: (tweet, args, context) => getUser(tweet, {id: tweet.user}, context),
    },
    Comment: {
        user: (comment, args, context) => getUser(comment, {id: comment.user}, context),
        tweet: (comment, args, context) => getTweet(comment, {id: comment.tweet}, context)
    },
    User: {
        tweets:  (user, args, context) => getTweets(user, context)
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db: client,
    }
});

server.start({port: 3333}).then(() => {
    console.log("Server is running on port 3333");
}).catch(() => {
    console.log("Error occured");
    process.exit(1);
})
