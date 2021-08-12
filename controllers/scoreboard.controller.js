const Scoreboard = require('../models/scoreboard.model');

const postScore = async (req, res) => {
	const { quizId, score } = req.body;
	const { userId } = req;
	try {
		const findQuiz = await Scoreboard.findOne({ userId, quizId });
		if (findQuiz) {
			await Scoreboard.findOneAndUpdate(
				{ userId, quizId },
				{ score, numberOfAttempts: findQuiz.numberOfAttempts + 1 },
			);
		} else {
			const newScore = new Scoreboard({
				quizId,
				userId,
				numberOfAttempts: 1,
				score,
			});
			await newScore.save();
		}
		const attemptedQuizScores = await Scoreboard.find({ userId }).populate({
			path: 'quizId',
		}).exec();
		res.json({ attemptedQuizScores });
	} catch (error) {
		console.error({ error });
		res.status(401).json({ error: error.message });
	}
};

const getQuizOfAUser = async (req, res) => {
	const { userId } = req;
	try {
		const attemptedQuizScores = await Scoreboard.find({ userId }).populate({
			path: 'quizId',
		}).exec();
		res.json({ attemptedQuizScores });
	} catch (error) {
		console.error({ error });
		res.status(401).json({ error: error.message });
	}
};

module.exports = { postScore, getQuizOfAUser};

const Scoreboard = require('../models/scoreboard.model');

const postScore = async (req, res) => {
	const { quizId, score } = req.body;
	const { userId } = req;
	try {
		const findQuiz = await Scoreboard.findOne({ userId, quizId });
		if (findQuiz) {
			await Scoreboard.findOneAndUpdate(
				{ userId, quizId },
				{ score, numberOfAttempts: findQuiz.numberOfAttempts + 1 },
			);
		} else {
			const newScore = new Scoreboard({
				quizId,
				userId,
				numberOfAttempts: 1,
				score,
			});
			await newScore.save();
		}
		const attemptedQuizScores = await Scoreboard.find({ userId }).populate({
			path: 'quizId',
		}).exec();
		res.json({ attemptedQuizScores });
	} catch (error) {
		console.error({ error });
		res.status(401).json({ error: error.message });
	}
};

const getQuizOfAUser = async (req, res) => {
	const { userId } = req;
	try {
		const attemptedQuizScores = await Scoreboard.find({ userId }).populate({
			path: 'quizId',
		}).exec();
		res.json({ attemptedQuizScores });
	} catch (error) {
		console.error({ error });
		res.status(401).json({ error: error.message });
	}
};

module.exports = { postScore, getQuizOfAUser};

