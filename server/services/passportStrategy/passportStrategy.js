
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

import db from '../../models'
import JWT_TOKEN from '../../config/auth'

// Hooks the JWT Strategy.
function hookJWTStrategy(passport)
{
    var options = {};

    options.secretOrKey =  JWT_TOKEN;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    options.ignoreExpiration = false;

    passport.use(new JwtStrategy(options, function(JWTPayload, callback)
    {
        console.log("PAYLOAD: "+JWTPayload)
        db.user.findOne({ where: { id: JWTPayload.id } })
            .then(function(user)
            {   
                if(!user) {
                    callback(null, false);
                    return;
                }
                callback(null, user); 
            }).catch(function (error) {
                console.log(error);
                res.sendStatus(403)
            })

        ;
    }));
}


module.exports = hookJWTStrategy;