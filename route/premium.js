const express=require('express');
const router=express.Router();

const premiumController = require('../controller/premium');

router.get('/premium/leaderboard', premiumController.getleaderboarddata);

module.exports = router;