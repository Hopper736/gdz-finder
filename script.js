function setTheme(theme) {
    document.body.className = theme;
}

document.getElementById("search").addEventListener("click", () => {
    const author = encodeURIComponent(document.getElementById("author").value);
    const grade = encodeURIComponent(document.getElementById("grade").value);
    const subject = encodeURIComponent(document.getElementById("subject").value);

    if (!author && !grade && !subject) {
        alert("Введите хотя бы один параметр!");
        return;
    }

    // Поиск через Google
    const query = `${author} ${grade} класс ${subject} ГДЗ`;
    const url = `https://www.google.com/search?q=${query}`;

    window.open(url, "_blank");
});
