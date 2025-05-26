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
