const express  = require('express')
const {handleuserSignup ,handleuserLogin} = require('../controllers/user')
const router = express.Router();

router.post('/',handleuserSignup)
router.post('/login',handleuserLogin)



module.exports = router;