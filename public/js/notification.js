// Xử lý thông báo mới
socket.on('newNotification', (notification) => {
    // Cập nhật số lượng thông báo
    const notificationCount = document.getElementById('notificationCount');
    if (notificationCount) {
        const currentCount = parseInt(notificationCount.textContent) || 0;
        notificationCount.textContent = currentCount + 1;
    }

    // Hiển thị thông báo mới
    showNotification(notification);
});

// Hàm hiển thị thông báo
function showNotification(notification) {
    // Tạo nội dung thông báo dựa vào loại
    let message = '';
    switch(notification.type) {
        case 'like':
            message = `${notification.senderName} đã thích bài viết của bạn`;
            break;
        case 'comment':
            message = `${notification.senderName} đã bình luận bài viết của bạn`;
            break;
        case 'follow':
            message = `${notification.senderName} đã theo dõi bạn`;
            break;
        case 'mention':
            message = `${notification.senderName} đã nhắc đến bạn trong một bình luận`;
            break;
        default:
            message = notification.message || 'Bạn có thông báo mới';
    }

    // Tạo toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-bell"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Thêm toast vào container
    const container = document.getElementById('toastContainer') || createToastContainer();
    container.appendChild(toast);

    // Xử lý đóng toast
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });

    // Tự động đóng sau 5 giây
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Tạo container cho toast nếu chưa có
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Xử lý khi click vào icon thông báo
const notificationIcon = document.querySelector('.notification-icon');
if (notificationIcon) {
    notificationIcon.addEventListener('click', () => {
        // Reset số lượng thông báo
        const notificationCount = document.getElementById('notificationCount');
        if (notificationCount) {
            notificationCount.textContent = '0';
        }
    });
} 