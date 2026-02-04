function setTheme(theme) {
    document.body.className = theme;
}

// Список сайтов ГДЗ (для справки)
const gdzSites = [
    "https://gdz.ru",
    "https://resh.skysmart.ru",
    "https://gdz-raketa.ru",
    "https://kzgdz.com",
    "https://reshutka.ru"
];

// База учебников с заранее проверенными ссылками
const gdzDatabase = [
    { 
        author: "Виленкин", grade: "5", subject: "Математика", 
        links: [
            "https://gdz.ru/matematika/vilenkin/5",
            "https://resh.skysmart.ru/matematika/vilenkin/5"
        ]
    },
    {
        author: "Мерзляк", grade: "7", subject: "Физика",
        links: [
            "https://gdz.ru/physics/merzlyak/7",
            "https://kzgdz.com/physics/merzlyak/7"
        ]
    },
    {
        author: "Александров", grade: "6", subject: "Химия",
        links: [
            "https://gdz.ru/chem/aleksandrov/6",
            "https://gdz-raketa.ru/chem/aleksandrov/6"
        ]
    }
];

// Подсказки для input
const hints = [
    "Попробуй Виленкин 5 класс Математика",
    "Попробуй Мерзляк 7 класс Физика",
    "Попробуй Александров 6 класс Химия"
];

// Меняем placeholder на случайную подсказку каждые 4 сек
const authorInput = document.getElementById("author");
setInterval(() => {
    const hint = hints[Math.floor(Math.random() * hints.length)];
    authorInput.placeholder = hint;
}, 4000);

// Функция нормализации текста
function normalize(str) {
    return str.trim().toLowerCase().replace(/ё/g,'е'); // заменяем ё на е
}

// Обработчик кнопки поиска
document.getElementById("search").addEventListener("click", () => {
    const author = normalize(document.getElementById("author").value);
    const grade = document.getElementById("grade").value.trim();
    const subject = normalize(document.getElementById("subject").value);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!author && !grade && !subject) {
        alert("Введите хотя бы один параметр!");
        return;
    }

    // Поиск по базе с нормализацией
    const matches = gdzDatabase.filter(item =>
        (!author || normalize(item.author).includes(author)) &&
        (!grade || item.grade.toString().includes(grade)) &&
        (!subject || normalize(item.subject).includes(subject))
    );

    if (matches.length === 0) {
        // Если нет в базе → Google fallback
        const query = `${author} ${grade} класс ${subject} ГДЗ`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        resultsDiv.innerHTML = `<p>ГДЗ не найдено в базе 😿 Попробуй поискать сам:</p>
                                <a class="card show" href="${url}" target="_blank">🔍 Искать в Google</a>`;
    } else {
        // Выводим карточки с ссылками
        matches.forEach(item => {
            item.links.forEach(link => {
                const a = document.createElement("a");
                a.href = link;
                a.target = "_blank";
                a.className = "card";
                a.textContent = `${item.author}, ${item.grade} класс, ${item.subject}`;
                resultsDiv.appendChild(a);

                // Плавная анимация появления карточек
                setTimeout(() => a.classList.add("show"), 50);
            });
        });
    }
});
