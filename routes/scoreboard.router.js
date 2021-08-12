const express = require('express');
const {
	postScore,
	getQuizOfAUser
} = require('../controllers/scoreboard.controller');
const { isAuthorized } = require('../middlewares/authHandler');
const router = express.Router();



router.post('/scoreboard', isAuthorized, postScore);
router.get('/scoreboard', isAuthorized, getQuizOfAUser);

module.exports = router;