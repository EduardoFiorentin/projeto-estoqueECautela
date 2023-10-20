const jwt = require('jsonwebtoken')
const atob = require('atob')

require('dotenv').config()

const access = (levelRequired) => {
    return function(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({message: "Access denied! An access token is required.", status: 401})
        const secret = process.env.SECRET
        
        try {
            jwt.verify(token, secret)

            var base64Url = token.split(".")[1];
            var base64 = base64Url.replace("-", "+").replace("_", "/");
            const tokenData = JSON.parse(atob(base64));

            if (parseInt(tokenData.level) >= levelRequired) {
                next()
                
            } else {
                
                return res.status(401).json({message: "Access denied! You're not allowed to be here.", status: 401})
            }

        } catch (err) {
            return res.status(401).json({message: "Access denied! Invalid token.", status: 401})
        }

        
    }
}

module.exports = {
    access
}