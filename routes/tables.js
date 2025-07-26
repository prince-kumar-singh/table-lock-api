const express = require('express');
const router = express.Router();
const lockStore = require('../utils/lockStore');

// POST /api/tables/lock
router.post('/lock', (req, res) => {
  const { tableId, userId, duration } = req.body;

  if (!tableId || !userId || !duration) {
    return res.status(400).json({ success: false, message: "Missing parameters." });
  }

  const existingLock = lockStore.getLock(tableId);
  if (existingLock) {
    return res.status(409).json({
      success: false,
      message: "Table is currently locked by another user."
    });
  }

  lockStore.setLock(tableId, userId, duration);
  return res.status(200).json({ success: true, message: "Table locked successfully." });
});

// POST /api/tables/unlock
router.post('/unlock', (req, res) => {
  const { tableId, userId } = req.body;

  if (!tableId || !userId) {
    return res.status(400).json({ success: false, message: "Missing parameters." });
  }

  const success = lockStore.releaseLock(tableId, userId);

  if (!success) {
    return res.status(403).json({ success: false, message: "Unlock failed. Unauthorized or table not locked." });
  }

  return res.status(200).json({ success: true, message: "Table unlocked successfully." });
});

// GET /api/tables/:tableId/status
router.get('/:tableId/status', (req, res) => {
  const { tableId } = req.params;

  const isLocked = lockStore.isLocked(tableId);
  return res.status(200).json({ isLocked });
});

module.exports = router;
