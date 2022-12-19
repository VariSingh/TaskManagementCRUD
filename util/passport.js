const passportJwt = require('passport-jwt');
const User = require('../routes/v1/users/users.model');
const { JWT_ACCESS_TOKEN_SECRET } = require('./config');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const passport = require("passport");
const { getUserByEmail } = require("../routes/v1/users/users.service");
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = JWT_ACCESS_TOKEN_SECRET;
    passport.use(new JwtStrategy(opts, async(jwt_payload, next) => {
        try{
            const user = await getUserByEmail(jwt_payload.email);
            if(user){
                next(null,user);
            }else{
                next(null,false);
            }
        }catch(error){
            next(error,false);
        }
    }));