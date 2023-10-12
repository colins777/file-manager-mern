const Router = require('express');
const User = require('../models/User');
const router = new Router();
const bcrypt = require('bcryptjs');

//for validate password and email use this - npm i express-validator
const {check, validationResult} = require('express-validator');

router.post('/registration',
    //this from lib express-validator for validate email
        [check('email', 'Email not valid').isEmail(),
        check('password', 'Password should be longer than 3 and shorter than 12').isLength({min: 3, max: 12})
        ],
    async (req, res) => {
    try {

        console.log('req', res);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Uncorrect request', errors
            })
        }


        const {email, password} = req.body;


        //search user in DB
        const candidate = await User.findOne({email});

        if(candidate) {
            return res.status(400).json({
                message: `User with email ${email} already exist.`
            })
        }

        //>for password hash - npm install bcryptjs
        const hashPassword = await bcrypt.hash(password, 15)
        const user = new User({email, password: hashPassword})

        //save user in DB
        await user.save();

        return res.json({message: 'User was created'})




    } catch (e) {
        console.log(e)
        res.send({
            message: 'Server error'
        })
    }
});

module.exports = router;