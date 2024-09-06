const jwt = require('jsonwebtoken');

module.exports.verifyUser = (req, res, next) => {
    
    const token = req.cookies.token;
    console.log(token ,"$############")
    if (!token) {
        return res.json({ error: "You are not authenticated" });
    } else {
        jwt.verify(token,"jwt-secret-key",(err,decoded) => {
            if(err){
                return res.json({error:"Token is not okay"})
            } else {
                req.body = decoded;
                next();
            }
        })
    }
}