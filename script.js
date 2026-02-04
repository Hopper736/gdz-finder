function setTheme(theme) {
    document.body.className = theme;
}

// Список сайтов ГДЗ
const gdzSites = [
    "https://gdz.ru",
    "https://resh.skysmart.ru",
    "https://gdz-raketa.ru",
    "https://kzgdz.com",
    "https://reshutka.ru"
];

// Пример базы учебников с шаблонами ссылок для каждого сайта
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
    }
];

// Подсказки для input
const hints = [
    "Попробуй Виленкин 5 класс Математика",
    "Попробуй Мерзляк 7 класс Физика"
];

const authorInput = document.getElementById("author");
setInterval(() => {
    const hint = hints[Math.floor(Math.random() * hints.length)];
    authorInput.placeholder = hint;
}, 4000);

document.getElementById("search").addEventListener("click", () => {
    const author = document.getElementById("author").value.trim().toLowerCase();
    const grade = document.getElementById("grade").value.trim();
    const subject = document.getElementById("subject").value.trim().toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!author && !grade && !subject) {
        alert("Введите хотя бы один параметр!");
        return;
    }

    // Поиск по базе
    const matches = gdzDatabase.filter(item =>
        (!author || item.author.toLowerCase().includes(author)) &&
        (!grade || item.grade.toString().includes(grade)) &&
        (!subject || item.subject.toLowerCase().includes(subject))
    );

    if (matches.length === 0) {
        // Если нет в базе → Google fallback
        const query = `${author} ${grade} класс ${subject} ГДЗ`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        resultsDiv.innerHTML = `<p>ГДЗ не найдено в базе 😿 Попробуй поискать сам:</p>
                                <a class="card show" href="${url}" target="_blank">🔍 Искать в Google</a>`;
    } else {
        matches.forEach(item => {
            item.links.forEach(link => {
                const a = document.createElement("a");
                a.href = link;
                a.target = "_blank";
                a.className = "card";
                a.textContent = `${item.author}, ${item.grade} класс, ${item.subject}`;
                resultsDiv.appendChild(a);
                setTimeout(() => a.classList.add("show"), 50);
            });
        });
    }
});
