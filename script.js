// =========================
// LOADER
// =========================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// =========================
// ENVELOPE
// =========================

document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');

    if (!envelope) {
        console.error('❌ Конверт не найден!');
        return;
    }

    console.log('✅ Конверт найден, жду клика...');

    function openEnvelope() {
        envelope.classList.toggle('open');

        // ===== ЗАПУСК МУЗЫКИ ПРИ ОТКРЫТИИ КОНВЕРТА =====
        const audio = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicBtn');
        if (audio) {
            audio.play().catch(() => {});
            if (musicBtn) {
                musicBtn.textContent = '⏸';
                musicBtn.style.background = '#b99868';
                musicBtn.style.color = '#fff';
            }
        }

        setTimeout(function() {
            const intro = document.querySelector('.intro');
            if (intro) {
                intro.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 5000);
    }

    envelope.addEventListener('click', function(e) {
        openEnvelope();
    });
});

// =========================
// FADE ANIMATION
// =========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {
    section.classList.add("fade");
    observer.observe(section);
});

// =========================
// TIMER - 27 августа 2026, 12:00 МСК
// =========================

function updateTimer() {
    const targetDate = new Date('2026-08-27T12:00:00+03:00').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// =========================
// RSVP FORM → Google Sheets
// =========================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();

            if (!name) {
                alert('Пожалуйста, введите ваше имя ❤️');
                return;
            }

            const formData = new FormData(form);
            const url = 'https://script.google.com/macros/s/AKfycbxKrJFUxxVZ-9diAsztrUtdBhccEH8eqVjet-UyNVeyQgpo-sdqMK9PR-ZGzEWCo97U/exec';

            fetch(url, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(() => {
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.textContent = '✅ Спасибо!';
                button.style.background = '#4CAF50';
                form.reset();
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#b99868';
                }, 4000);
            })
            .catch(() => {
                alert('❌ Ошибка соединения. Проверьте интернет.');
            });
        });
    }
});

// =========================
// MUSIC PLAYER
// =========================

document.addEventListener('DOMContentLoaded', function() {
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('bgMusic');
    let isPlaying = false;

    if (musicBtn && audio) {
        // Громкость 30%
        audio.volume = 0.3;

        // Бесконечное повторение
        audio.addEventListener('ended', function() {
            audio.currentTime = 0;
            audio.play();
        });

        // Кнопка управления музыкой
        musicBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                musicBtn.textContent = '♫';
                musicBtn.style.background = '#fff';
                musicBtn.style.color = '#5B4C40';
                isPlaying = false;
            } else {
                audio.play().catch(() => {});
                musicBtn.textContent = '⏸';
                musicBtn.style.background = '#b99868';
                musicBtn.style.color = '#fff';
                isPlaying = true;
            }
        });
    }
});