let counter = 0;

const incrementMutation = (parent, args) => {
    counter += args.number;
    return counter;
}

module.exports = {incrementMutation};