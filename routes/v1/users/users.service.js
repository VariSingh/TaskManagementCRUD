const User = require("./users.model");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { JWT_ACCESS_TOKEN_SECRET } = require("../../../util/config");

exports.signUp = async (data) => {
    const {email,password,name} = data;
        const user  = new User({
            email,
            password,
            name
    });
     const savedUser = await user.save();
     const payload = {
        email:savedUser.email
       }
     const accessToken = jwt.sign(payload,JWT_ACCESS_TOKEN_SECRET,{expiresIn:'1d'});
       return accessToken;
}

exports.getUserByEmail = async (email)=> {
    return await User.findOne({email});
}

exports.signIn = async (data) => {
    const {email,password} = data;
       const user = await this.getUserByEmail(email);
       if(!user){
        return null;
       }
       const match = await compare(password,user.password);
       if(!match){
        return null;
       }
       const payload = {
        email:email
       }
       const accessToken = jwt.sign(payload,JWT_ACCESS_TOKEN_SECRET,{expiresIn:'1d'});
       return accessToken;
}
