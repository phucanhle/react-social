const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

// Lấy danh sách thông báo
router.get('/', auth, notificationController.getNotifications);

// Đánh dấu một thông báo đã đọc
router.put('/:id/read', auth, notificationController.markAsRead);

// Đánh dấu tất cả thông báo đã đọc
router.put('/mark-all-read', auth, notificationController.markAllAsRead);

// Xóa một thông báo
router.delete('/:id', auth, notificationController.deleteNotification);

// Xóa tất cả thông báo
router.delete('/', auth, notificationController.deleteAllNotifications);

module.exports = router; 