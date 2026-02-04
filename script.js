function setTheme(theme) {
    document.body.className = theme;
}

// База учебников
const gdzDatabase = [
    { author: "Виленкин", grade: "5", subject: "Математика", links: ["https://resheba.me/matematika/5-klas/vilenkin"] },
    { author: "Мерзляк", grade: "7", subject: "Физика", links: ["https://gdz.ru/physics/merzlyak/7"] },
    { author: "Александров", grade: "6", subject: "Химия", links: ["https://gdz.ru/chem/aleksandrov/6"] }
];

// Массив подсказок
const hints = [
    "Попробуй Виленкин 5 класс Математика",
    "Попробуй Мерзляк 7 класс Физика",
    "Попробуй Александров 6 класс Химия"
];

// Смена placeholder на случайную подсказку
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

    // Поиск по базе (чётко + частично)
    const matches = gdzDatabase.filter(item =>
        (!author || item.author.toLowerCase().includes(author)) &&
        (!grade || item.grade.toString().includes(grade)) &&
        (!subject || item.subject.toLowerCase().includes(subject))
    );

    if (matches.length === 0) {
        // Нет в базе → Google fallback
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

                // Анимация появления карточек
                setTimeout(() => a.classList.add("show"), 50);
            });
        });
    }
});
