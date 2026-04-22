const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Dashboard Stats
router.get('/stats', authenticateToken, authorizeAdmin, adminController.getDashboardStats);
router.get('/dashboard/stats', authenticateToken, authorizeAdmin, adminController.getDashboardStats);

// Pending Items
router.get('/pending-items', authenticateToken, authorizeAdmin, adminController.getPendingItems);
router.get('/items/pending', authenticateToken, authorizeAdmin, adminController.getPendingItems);

// Verify Item
router.post('/verify-item', authenticateToken, authorizeAdmin, adminController.verifyItem);
router.put('/items/verify', authenticateToken, authorizeAdmin, adminController.verifyItem);

// Reject Item
router.post('/reject-item', authenticateToken, authorizeAdmin, adminController.rejectItem);
router.put('/items/reject', authenticateToken, authorizeAdmin, adminController.rejectItem);

// Pending Matches
router.get('/pending-matches', authenticateToken, authorizeAdmin, adminController.getPendingMatches);
router.get('/matches/pending', authenticateToken, authorizeAdmin, adminController.getPendingMatches);

// Approve Match
router.post('/approve-match/:matchId', authenticateToken, authorizeAdmin, adminController.approveMatchAsAdmin);
router.put('/matches/:matchId/approve', authenticateToken, authorizeAdmin, adminController.approveMatchAsAdmin);

// Reject Match
router.post('/reject-match/:matchId', authenticateToken, authorizeAdmin, adminController.rejectMatchAsAdmin);
router.put('/matches/:matchId/reject', authenticateToken, authorizeAdmin, adminController.rejectMatchAsAdmin);

// Users
router.get('/users', authenticateToken, authorizeAdmin, adminController.getAllUsers);

// Suspend/Activate User
router.post('/suspend-user/:userId', authenticateToken, authorizeAdmin, adminController.suspendUser);
router.put('/users/:userId/suspend', authenticateToken, authorizeAdmin, adminController.suspendUser);
router.post('/activate-user/:userId', authenticateToken, authorizeAdmin, adminController.activateUser);
router.put('/users/:userId/activate', authenticateToken, authorizeAdmin, adminController.activateUser);

// Clear Database
router.post('/clear-database', authenticateToken, authorizeAdmin, adminController.clearDatabase);

module.exports = router;
