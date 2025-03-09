document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('background-video');
    const videoClips = document.querySelectorAll('.video-clip');
    
    // Функция для создания цветных блоков вместо видео
    function setupColorClips() {
        const colors = [
            'linear-gradient(45deg, #FF5722, #FF9800)',
            'linear-gradient(45deg, #FF9800, #FFC107)',
            'linear-gradient(45deg, #FFC107, #FFEB3B)',
            'linear-gradient(45deg, #FFEB3B, #FF5722)'
        ];
        
        videoClips.forEach((clip, index) => {
            // Устанавливаем градиентный фон для каждого клипа
            clip.style.background = colors[index % colors.length];
            clip.style.position = 'relative';
            clip.style.overflow = 'hidden';
        });
    }
    
    // Функция для создания клонов видео для каждого клипа
    function setupVideoClips() {
        videoClips.forEach((clip, index) => {
            try {
                // Создаем клон видео для каждого клипа
                const videoClone = document.createElement('video');
                videoClone.src = 'video.mp4'; // Используем видеофайл из корневой директории
                videoClone.autoplay = true;
                videoClone.loop = true;
                videoClone.muted = true;
                videoClone.playsinline = true;
                
                // Добавляем стили для видео внутри клипа
                videoClone.style.position = 'absolute';
                videoClone.style.top = '0';
                videoClone.style.left = '0';
                videoClone.style.width = '100vw';
                videoClone.style.height = '100vh';
                videoClone.style.objectFit = 'cover';
                
                // Добавляем видео в клип
                clip.appendChild(videoClone);
                
                // Обрабатываем ошибки загрузки видео
                videoClone.addEventListener('error', function() {
                    // Если видео не загрузилось, используем цветной блок
                    clip.removeChild(videoClone);
                    clip.style.background = 'linear-gradient(45deg, #FF5722, #FF9800)';
                });
            } catch (error) {
                console.error('Ошибка при создании видеоклипа:', error);
                // В случае ошибки используем цветной блок
                clip.style.background = 'linear-gradient(45deg, #FF5722, #FF9800)';
            }
        });
    }
    
    // Проверяем доступность видео и настраиваем клипы
    const testVideo = document.createElement('video');
    testVideo.src = 'video.mp4';
    
    testVideo.addEventListener('canplay', function() {
        // Видео доступно, настраиваем видеоклипы
        setupVideoClips();
        
        // Настраиваем основное видео
        if (video) {
            video.src = 'video.mp4';
            video.load();
        }
    });
    
    testVideo.addEventListener('error', function() {
        // Видео недоступно, используем цветные блоки
        setupColorClips();
    });
    
    // Устанавливаем таймаут на случай, если видео не загрузится
    setTimeout(function() {
        if (testVideo.readyState === 0) {
            // Видео не загрузилось, используем цветные блоки
            setupColorClips();
        }
    }, 3000);
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        // Обновляем размеры и позиции при изменении размера окна
        videoClips.forEach(clip => {
            const videoElement = clip.querySelector('video');
            if (videoElement) {
                videoElement.style.width = '100vw';
                videoElement.style.height = '100vh';
            }
        });
    });
}); 