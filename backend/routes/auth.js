const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Fareedis@goodB0y'


// ROUTE 1 create a user using Post '/api/auth/createuser'. No login required
router.post('/createuser', [

    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a correct password').isLength({ min: 5 }),
],
    async (req, res) => {
        // If there are errors return bad request and the errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }
        try {

            let user = await User.findOne({ email: req.body.email })
            if (user) {
                success = false;
                return res.status(400).json({ errors: "Sorry this email is already exist" })
            }
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authTokken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({ success, authTokken })

        }
        catch (error) {
            console.log(error.message)
            res.status(500).send('some error oocured')
        }
    })




//  ROUTE 2 create a user using Post '/api/auth/login'. No login required

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email })

            if (!user) {

                return res.status(400).json({ errors: "please try to login with correct cerdentails" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({ errors: "please try to login with correct cerdentails" })
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authTokken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({ success, authTokken })

        } catch (error) {
            console.log(error.message)
            res.status(500).send('some error oocured')
        }

    })



//  ROUTE 3 create a user using Post '/api/auth/getuser'. login required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('some error oocured')
    }
})

module.exports = router;