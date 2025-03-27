import { useState, useEffect } from 'react';

const useImageCache = (imageUrl) => {
    const [cachedUrl, setCachedUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm nén ảnh
    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    // Tính toán kích thước mới để giảm dung lượng
                    const maxSize = 800;
                    if (width > height && width > maxSize) {
                        height = Math.round((height * maxSize) / width);
                        width = maxSize;
                    } else if (height > maxSize) {
                        width = Math.round((width * maxSize) / height);
                        height = maxSize;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Chuyển đổi sang base64 với chất lượng 0.7
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(compressedBase64);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // Hàm dọn dẹp cache
    const cleanupCache = () => {
        const storage = window.localStorage;
        const imageCacheKeys = [];
        let totalSize = 0;

        // Thu thập thông tin về cache
        for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            if (key.startsWith('image_cache_')) {
                const item = storage.getItem(key);
                totalSize += item.length;
                imageCacheKeys.push({
                    key,
                    size: item.length,
                    timestamp: JSON.parse(item).timestamp
                });
            }
        }

        // Sắp xếp theo thời gian cũ nhất
        imageCacheKeys.sort((a, b) => a.timestamp - b.timestamp);

        // Xóa 50% cache cũ nhất
        const itemsToRemove = Math.ceil(imageCacheKeys.length * 0.5);
        imageCacheKeys.slice(0, itemsToRemove).forEach(item => {
            localStorage.removeItem(item.key);
        });

        return totalSize;
    };

    useEffect(() => {
        if (!imageUrl) {
            setIsLoading(false);
            return;
        }

        const cacheKey = `image_cache_${imageUrl}`;
        setIsLoading(true);
        setError(null);

        const loadImage = async () => {
            try {
                // Kiểm tra cache trước
                const cachedData = localStorage.getItem(cacheKey);
                if (cachedData) {
                    const { url, timestamp } = JSON.parse(cachedData);
                    // Kiểm tra thời hạn cache (24 giờ)
                    if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
                        setCachedUrl(url);
                        setIsLoading(false);
                        return;
                    }
                    // Xóa cache hết hạn
                    localStorage.removeItem(cacheKey);
                }

                // Tải và cache ảnh mới
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                
                // Nén ảnh trước khi lưu
                const compressedBase64 = await compressImage(blob);
                
                try {
                    // Thử lưu vào cache
                    localStorage.setItem(cacheKey, JSON.stringify({
                        url: compressedBase64,
                        timestamp: Date.now()
                    }));
                    setCachedUrl(compressedBase64);
                } catch (storageError) {
                    // Nếu lỗi, thử dọn dẹp cache và lưu lại
                    cleanupCache();
                    try {
                        localStorage.setItem(cacheKey, JSON.stringify({
                            url: compressedBase64,
                            timestamp: Date.now()
                        }));
                        setCachedUrl(compressedBase64);
                    } catch (retryError) {
                        // Nếu vẫn không được, sử dụng URL gốc
                        console.warn('Cache storage error:', retryError);
                        setCachedUrl(imageUrl);
                    }
                }

            } catch (err) {
                console.error('Image loading error:', err);
                setError(err);
                setCachedUrl(imageUrl); // Fallback to original URL
            } finally {
                setIsLoading(false);
            }
        };

        loadImage();
    }, [imageUrl]);

    return { cachedUrl, isLoading, error };
};

export default useImageCache; 