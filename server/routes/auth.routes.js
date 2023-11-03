const Router = require('express');
const User = require('../models/User');
const router = new Router();
const bcrypt = require('bcryptjs');
const config = require('config');

//for create json web token
const jwt = require('jsonwebtoken');

//for validate password and email use this - npm i express-validator
const {check, validationResult} = require('express-validator');

const {authMiddleware} = require('../middleware/auth.middleware');
const fileService = require('../services/fileService');
const File = require('../models/File')

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
        const hashPassword = await bcrypt.hash(password, 7);
        const user = new User({email, password: hashPassword});

        //save user in DB
        await user.save();

        //after user saved in DB create folder with user id
        await fileService.createDir(new File({user:user.id, name: ''}));

        return res.json({message: 'User was created'})

    } catch (e) {
        console.log(e)
        res.send({
            message: 'Server error'
        })
    }
});

router.post('/login',
    async (req, res) => {
        try {

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }

            //we need compare password in request and user password from DB/before that we need encrypt pass
            const isPassValid = bcrypt.compareSync(password, user.password);

            if (!isPassValid) {
                return res.status(404).json({message: 'Invalid password'})
            }

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: '1h'} );

            //return result to client
            //return example Postman https://prnt.sc/08Mc_-dxuIRf
            return res.json({
                token,
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            })

        } catch (e) {
            console.log(e)
            res.send({
                message: 'Server error'
            })
        }
    });

//router.get('/auth', authMiddleware,
//@TODO problem with middleware
router.get('/auth',
    async (req, res) => {


    //without this block it is not working, need to fix
        /*const token = localStorage.getItem('token');
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }
        const decoded = jwt.verify(token, config.get('secretKey'))
        req.user = decoded;*/

        console.log('req', req.user);
        try {
            //const user = await User.findOne({_id: req.user.id})
            //@TODO need to fix authorization
            const user = await User.findOne({_id: '652fe669110ed35eea8097b3'});

            console.log('user', user);

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router;