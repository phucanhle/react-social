import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/api/notifications', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setNotifications(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy thông báo:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`/api/notifications/${notificationId}/read`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setNotifications(notifications.map(notification => 
                notification._id === notificationId 
                    ? { ...notification, read: true }
                    : notification
            ));
        } catch (error) {
            console.error('Lỗi khi đánh dấu thông báo đã đọc:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.put('/api/notifications/mark-all-read', {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setNotifications(notifications.map(notification => ({
                ...notification,
                read: true
            })));
        } catch (error) {
            console.error('Lỗi khi đánh dấu tất cả thông báo đã đọc:', error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'like':
                return <i className="fas fa-heart text-danger"></i>;
            case 'comment':
                return <i className="fas fa-comment text-primary"></i>;
            case 'follow':
                return <i className="fas fa-user-plus text-success"></i>;
            case 'mention':
                return <i className="fas fa-at text-warning"></i>;
            default:
                return <i className="fas fa-bell text-secondary"></i>;
        }
    };

    if (loading) {
        return (
            <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Thông báo</h5>
                            <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={markAllAsRead}
                            >
                                Đánh dấu tất cả đã đọc
                            </button>
                        </div>
                        <div className="card-body">
                            {notifications.length > 0 ? (
                                <div className="notifications-list">
                                    {notifications.map(notification => (
                                        <div 
                                            key={notification._id}
                                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="notification-icon me-3">
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                                <div className="notification-content flex-grow-1">
                                                    <p className="mb-1">{notification.message}</p>
                                                    <small className="text-muted">
                                                        {format(new Date(notification.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                                                    </small>
                                                </div>
                                                {!notification.read && (
                                                    <button 
                                                        className="btn btn-sm btn-link mark-read"
                                                        onClick={() => markAsRead(notification._id)}
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <i className="fas fa-bell-slash fa-2x text-muted mb-3"></i>
                                    <p className="text-muted">Chưa có thông báo nào</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification; 