import jwt from 'jsonwebtoken';
require("dotenv").config();
const { sign, verify } = jwt;

// những api sẽ không phải check user jwt
const nonSecurePaths = ['/login', '/register', '/refresh_access_token', '/set_new_access_token']

const GenerateToken = (payload) => {
    let access_token = null;
    let refresh_token = null;
    try {
        access_token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
        });
        refresh_token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        });
        //console.log("access_token: ", access_token)
    } catch (error) {
        console.log("error: ", error)
    }
    return {
        access_token,
        refresh_token,
    }
}
const VerifyToken = (token) => {
    // let token = GenerateToken()
    let data = null
    try {

        // let decoded = jwt.verify(token, process.env.JWT_SECRET);
        // data = decoded;
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            // console.log(decoded) // bar
            data = decoded;
        });
    } catch (error) {
        console.log("error: ", error)
    }

    return data;
}
const extractToken = req => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
const checkUserJWT = async (req, res, next) => {

    if (nonSecurePaths.includes(req.path)) return next(); // req.path = "/refresh"
    // console.log("req cookie: ", req)

    if (req.cookies && req.cookies.access_token) {
        var access_token = req.cookies.access_token // lay duoc cookie
    }

    let tokenFromHeader = extractToken(req)

    if (access_token) {
        let token = access_token ? access_token : tokenFromHeader
        let decoded = VerifyToken(token)

        if (decoded) {

            // set req user de truyen len server
            req.user = decoded
            next()
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated the userrr'
            })
        }
    }
    else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the userrrrrr'
        })
    }
}

module.exports = {
    GenerateToken, checkUserJWT, VerifyToken
}