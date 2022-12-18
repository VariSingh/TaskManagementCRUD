const User = require("./users.model");

exports.signUp = async (data) => {
    const {email,password,name} = data;
        const user  = new User({
            email,
            password,
            name
    });
     return await user.save();
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
       return user;
}
