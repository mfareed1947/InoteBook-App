const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Fareedis@goodB0y'

const fetchuser = (req, res, next) => {

    const tokken = req.header('auth-token')
    if (!tokken) {
        res.status(401).send({ error: " tokken " })
    }

    try {
        const data = jwt.verify(tokken, JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid tokken " })
    }




}


module.exports = fetchuser;












