const db = require('./db');

module.exports.loginUser = async (obj) => {
    const records = await db.query('select email, user_password from headstarter_ai.user_credentails where email like ? and user_password like ?',
        [obj.email, obj.password]);
        console.log(records)
    return records[0].length > 0 ? records[0][0] : false;
}