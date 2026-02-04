function setTheme(theme) {
    document.body.className = theme;
}

// База учебников с рабочими ссылками
const gdzDatabase = [
    {
        author: "Виленкин",
        grade: "5",
        subject: "Математика",
        links: [
            "https://resheba.me/matematika/vilenkin/5",
            "https://gdz.ru/math/vilenkin/5"
        ]
    },
    {
        author: "Мерзляк",
        grade: "7",
        subject: "Физика",
        links: [
            "https://gdz.ru/physics/merzlyak/7"
        ]
    },
    {
        author: "Александров",
        grade: "6",
        subject: "Химия",
        links: [
            "https://gdz.ru/chem/aleksandrov/6"
        ]
    }
];

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

    // Ищем совпадения в базе
    const matches = gdzDatabase.filter(item => {
        return (!author || item.author.toLowerCase().includes(author)) &&
               (!grade || item.grade === grade) &&
               (!subject || item.subject.toLowerCase().includes(subject));
    });

    if (matches.length === 0) {
        // Если нет совпадений → открываем Google
        const query = `${author} ${grade} класс ${subject} ГДЗ`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        resultsDiv.innerHTML = `<p>ГДЗ не найдено в базе, ищем через Google...</p>
                                <a href="${url}" target="_blank">🔍 Искать в Google</a>`;
        resultsDiv.classList.add("show");
    } else {
        matches.forEach(item => {
            item.links.forEach(link => {
                const a = document.createElement("a");
                a.href = link;
                a.target = "_blank";
                a.textContent = `${item.author}, ${item.grade} класс, ${item.subject}`;
                resultsDiv.appendChild(a);
            });
        });
        resultsDiv.classList.add("show");
    }
});
