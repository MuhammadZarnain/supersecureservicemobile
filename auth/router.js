const express = require('express');
const controller = require('./smsauth')
const router = express.Router();

router.post('/send-code', controller.sendVerificationCode);
router.post('/verify-code', controller.verifyCode)

module.exports = router;