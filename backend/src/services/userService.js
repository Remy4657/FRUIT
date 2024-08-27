import bcrypt from "bcryptjs";
import db from "../models/index";
import jwtAction from "../jwt/jwtAction.js"
import jwt from 'jsonwebtoken';
require("dotenv").config();
const { sign, verify } = jwt;


const getUserByEmail = async (userEmail) => {
    const user = await db.User.findOne({
        where: { email: userEmail }
    })
    return user
}

const checkEmailExist = async (userEmail) => {
    const isExist = await db.User.findOne({
        where: { email: userEmail }
    })
    if (isExist == null) {
        return false
    }
    return true
}
const checkPhoneExist = async (userPhone) => {
    const isExist = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (isExist == null) {
        return false
    }
    return true
}
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};


const salt = bcrypt.genSaltSync(10);

const createNewUser = async (userInfo) => {
    const IsExistEmail = await checkEmailExist(userInfo.email)
    const IsExistPhone = await checkPhoneExist(userInfo.phone)


    if (IsExistEmail) {
        return {
            EM: "Email exist",
            EC: 2
        }
    }
    if (IsExistPhone) {
        return {
            EM: "Phone exist",
            EC: 2
        }
    }
    const hash = bcrypt.hashSync(userInfo.password, salt);

    try {
        const resData = await db.User.create({
            username: userInfo.username,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
            password: hash
        },
        );

        await db.User_Role.create({
            UserId: resData.dataValues.id,
            RoleId: 2
        })

        return {
            EM: "Create new user successfully",
            EC: 1,
            DT: ""
        }
    } catch (error) {
        return {
            EM: error,
            EC: 0,
            DT: ""
        }
    }
};
const UserRole = async (user) => {
    const data = await db.User.findOne({
        where: { id: user.id },
        attributes: ["id", "username", "email"],
        include: {
            model: db.Role,
            attributes: ["id", "RoleName"],
            through: { attributes: [] }
        },
        nest: true,
        raw: true
    })
    return data ? data : {}
}
const loginService = async (userInfo) => {
    try {

        const user = await db.User.findOne({
            where: {
                email: userInfo.email,

            }
        })
        if (user) {
            const isValidPass = checkPassword(userInfo.password, user.dataValues.password)
            if (user && isValidPass) {
                const userRole = await UserRole(user.dataValues)
                const payload = {
                    email: user.dataValues.email,
                    userRole
                }
                const obj_token = jwtAction.GenerateToken(payload)
                return {
                    EM: "Login successfully",
                    EC: 1,
                    DT: {
                        payload: payload,
                        access_token: obj_token.access_token,
                        refresh_token: obj_token.refresh_token
                    }
                }
            }
            else {
                return {
                    EM: "Email or password not valid!",
                    EC: 2,
                    DT: ""
                }
            }
        }
        else {
            return {
                EM: "Email or password not valid!",
                EC: 2,
                DT: ""
            }
        }


    } catch (error) {
        return {
            EM: error,
            EC: -1,
            DT: ""
        }
    }

}
const getAllUser = async () => {
    try {
        let users = await db.User.findAll();
        if (users) {

            return {
                EM: 'get data succes',
                EC: 0,
                DT: users
            }
        }
        else {

            return {
                EM: 'no get user',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
    }
}
const refreshToken = async (refresh_token) => {
    try {
        if (refresh_token) {
            const decoded = jwtAction.VerifyToken(refresh_token)
            // console.log("decoded: ", decoded)
            if (decoded) {
                // lấy được biến cleanedDecoded giống biến decoded nhưng loại bỏ iat và exp
                const { iat, exp, ...cleanedDecoded } = decoded;

                try {
                    const access_token = jwt.sign(cleanedDecoded, process.env.JWT_SECRET, {
                        expiresIn: JWT_ACCESS_EXPIRES_IN
                    });

                    return {
                        EM: 'refresh token succes',
                        EC: 1,
                        DT: access_token
                    }

                } catch (error) {
                    console.log("error: ", error)
                }
            }
            else {
                return {
                    EM: 'decoded null',
                    EC: 0,
                    DT: []
                }
            }
        }
        else {
            return {
                EM: 'refresh token not found',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        return {
            EM: error,
            EC: -1,
            DT: ""
        }
    }
}
module.exports = {
    createNewUser, getAllUser, loginService, refreshToken
}