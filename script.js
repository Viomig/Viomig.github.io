// Инициализация карты
function initMap() {
    const location = { lat: 47.2210, lng: 39.7209 }; // Координаты клуба Голицын
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
        styles: [
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ saturation: 36 }, { color: "#5a3e3e" }, { lightness: 40 }]
            },
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ visibility: "on" }, { color: "#f9f3e9" }, { lightness: 16 }]
            },
            {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{ color: "#f9f3e9" }, { lightness: 20 }]
            },
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#f9f3e9" }, { lightness: 17 }, { weight: 1.2 }]
            },
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#f9f3e9" }, { lightness: 20 }]
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#f3e5e5" }, { lightness: 21 }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#e8c4c4" }, { lightness: 17 }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#e8c4c4" }, { lightness: 29 }, { weight: 0.2 }]
            },
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#f3e5e5" }, { lightness: 18 }]
            },
            {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{ color: "#f9f3e9" }, { lightness: 16 }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#d2a6a6" }, { lightness: 17 }]
            }
        ]
    });
    new google.maps.Marker({
        position: location,
        map: map,
        title: "Загородный клуб Голицын"
    });
}

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Обратный отсчет до свадьбы
var weddingDate = new Date("September 18, 2025 15:00:00").getTime();

// Обновление отсчета каждую секунду
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = weddingDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown-timer").innerHTML = days + "д " + hours + "ч "
    + minutes + "м " + seconds + "с ";

    // Если отсчет закончится
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown-timer").innerHTML = "Свадьба состоялась!";
    }
}, 1000);

// Инициализация Яндекс карты
function initMap() {
    // Указываем координаты места проведения свадьбы
    var weddingLocation = [47.215762, 39.806875]; // Например, Москва

    // Создаем объект карты
    var map = new ymaps.Map("map", {
        center: weddingLocation, // Центр карты
        zoom: 15, // Уровень масштабирования
        controls: ['zoomControl', 'typeSelector', 'searchControl'] // Добавляем элементы управления
    });

    // Добавляем метку на карту
    var placemark = new ymaps.Placemark(weddingLocation, {
        hintContent: 'Место проведения свадьбы',
        balloonContent: 'Здесь мы будем отмечать важный день!'
    });

    map.geoObjects.add(placemark); // Добавляем метку на карту
}

// Обработка формы RSVP
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = {
        name: document.getElementById('guestName').value,
        phone: '+7' + document.getElementById('guestPhone').value,
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        timestamp: new Date().toISOString()
    };
    
    // Отправка данных на сервер для сохранения в Excel
    sendDataToServer(formData);
    
    // Очистка формы
    this.reset();
    document.getElementById('willAttend').checked = true;
    
    // Показываем уведомление
    alert('Спасибо! Ваш ответ успешно сохранён.');
});

// Функция для отправки данных на сервер
function sendDataToServer(data) {
    // В реальном проекте здесь будет fetch-запрос к вашему серверу
    console.log('Данные для сохранения в Excel:', data);
    
    // Пример реализации с использованием SheetJS (xlsx)
    // Для работы этого кода нужно подключить библиотеку xlsx
    /*
    if (typeof XLSX !== 'undefined') {
        const ws = XLSX.utils.json_to_sheet([data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Responses");
        
        // Получаем существующие данные из файла (если есть)
        fetch('responses.xlsx')
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const existingData = XLSX.read(buffer);
                if (existingData.SheetNames.includes("Responses")) {
                    const existingWs = existingData.Sheets["Responses"];
                    const existingJson = XLSX.utils.sheet_to_json(existingWs);
                    existingJson.push(data);
                    const newWs = XLSX.utils.json_to_sheet(existingJson);
                    XLSX.utils.book_append_sheet(wb, newWs, "Responses");
                }
                
                // Сохраняем обновленный файл
                XLSX.writeFile(wb, 'responses.xlsx');
            })
            .catch(() => {
                // Если файла нет, создаем новый
                XLSX.writeFile(wb, 'responses.xlsx');
            });
    }
    */
}

// Инициализация маски для телефона
document.getElementById('guestPhone').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4')
        .substr(0, 11);
});

// Обработка кнопки "присоединиться"
document.querySelector('.btn-telegram').addEventListener('click', function(e) {
    e.preventDefault();
    // Здесь можно добавить ссылку на Telegram-группу
    alert('Ссылка на Telegram-группу будет доступна ближе к дате свадьбы');
    
    // Или для реального использования:
    // window.open('https://t.me/yourgroup', '_blank');
});