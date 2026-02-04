function setTheme(theme) {
    document.body.className = theme;
}

// Пример базы учебников (можно расширять)
const gdzDatabase = [
    {author: "Виленкин", grade: "5", subject: "Математика", links: ["https://gdz.ru/math/vilenkin/5", "https://resheba.me/vilenkin/5"]},
    {author: "Мерзляк", grade: "7", subject: "Физика", links: ["https://gdz.ru/physics/merzlyak/7"]},
    {author: "Александров", grade: "6", subject: "Химия", links: ["https://gdz.ru/chem/aleksandrov/6"]}
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

    // Поиск совпадений в базе
    const matches = gdzDatabase.filter(item => {
        return (!author || item.author.toLowerCase().includes(author)) &&
               (!grade || item.grade === grade) &&
               (!subject || item.subject.toLowerCase().includes(subject));
    });

    if (matches.length === 0) {
        resultsDiv.innerHTML = "<p>ГДЗ для этого учебника не найдено 😿</p>";
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
    }
});
