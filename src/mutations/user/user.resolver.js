const getUser = async (parent, args, context) => {
    const value = [args.id];
    const get = 'SELECT * FROM "User" WHERE Id = ($1)';
    const result = await context.db.query(get, value);
    return result.rows[0];
}

module.exports = {getUser};