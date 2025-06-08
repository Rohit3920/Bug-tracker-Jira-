const Jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET_KEY;

export default function verifyToken(req, resp, next){

    let token = req.headers['authorization'];

    if(token){
        token = token.split(' ')[1];

        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                resp.status(403).send({result : "please provide valid token"})
            }else{
                next();
            }
        })
    }else{
        resp.status(401).send({result : "please add token with headers"})
    }
}

