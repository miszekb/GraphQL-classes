const hello = () => {
    return "Hello"
};

const helloWithName = (parent, args) => {
    return "Hello, " + args.name;
};

module.exports = {
    hello,
    helloWithName
};