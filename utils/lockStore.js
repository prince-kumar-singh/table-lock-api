const lockStore = {};

function cleanExpiredLocks() {
  const now = Date.now();
  for (const [tableId, lock] of Object.entries(lockStore)) {
    if (lock.expiry < now) {
      delete lockStore[tableId];
    }
  }
}

module.exports = {
  getLock: (tableId) => {
    cleanExpiredLocks();
    return lockStore[tableId];
  },

  setLock: (tableId, userId, duration) => {
    const expiry = Date.now() + duration * 1000;
    lockStore[tableId] = { userId, expiry };
  },

  releaseLock: (tableId, userId) => {
    if (lockStore[tableId] && lockStore[tableId].userId === userId) {
      delete lockStore[tableId];
      return true;
    }
    return false;
  },

  isLocked: (tableId) => {
    cleanExpiredLocks();
    return !!lockStore[tableId];
  }
};
