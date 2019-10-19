const getAllUsers = async (parent, args, context) => {
    const get = 'SELECT * FROM "User"';
    const result = await context.db.query(get);
    return result.rows;
}


module.exports = {getAllUsers};