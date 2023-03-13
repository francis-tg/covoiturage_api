const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

module.exports = router

    .post("/register", async(req, res) => {
        if(Object.keys(req.body).length>0){
        
        const {username,email,password,tel} = req.body;
        if(!username&&!email&&!password&&!tel) return res.status(400).send("Could not continuous");
        if(username&&email&&password){
            const newUser = new User({
                username,
                email,
                tel,
                password: bcrypt.hashSync(password,10)
            });

            try {
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
            } catch (err) {
                res.status(500).json(err);
            }
        }
        } else return res.status(400).send("Body is empty");
        
        
    })
.post("/login",async(req,res)=>{
    if(Object.keys(req.body)){
        const {username,password} = req.body;
        if(!username&&!password) return res.status(400).send("Could not continuous");
        if(username&&password){
            try {
                const user = await User.findOne({
                    tel:username
                });
                if(!user) return res.status(401).json("Wrong User Name");

                if(bcrypt.compareSync(password,user.password)){
                    const payload = user
                    const token = jwt.sign(payload,process.env.JWT_SEC, {expiresIn:"1d"});
                    const {password,...others} = user._doc;
                    return res.status(200).json({
                        ...others,
                        token
                    })
                }else return res.status(401).json("Wrong Password");
            } catch (err) {
                res.status(500).json(err);
            }
        }
    }else return res.status(400).send("Body is empty");
})
.get("/logout",(req,res)=>{
    req.logOut();
    return res.status(200).send("you are logout")
})