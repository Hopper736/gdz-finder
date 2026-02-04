<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GDZ Finder</title>
<link rel="stylesheet" href="style.css">
</head>
<body class="light">
    <div class="container">
        <h1>📚 GDZ Finder</h1>
        <p class="subtitle">Найди ГДЗ по автору, классу и предмету</p>

        <div class="input-group">
            <input type="text" id="author" placeholder="Автор учебника">
            <input type="text" id="grade" placeholder="Класс">
            <input type="text" id="subject" placeholder="Предмет">
            <button id="search">🔍 Найти ГДЗ</button>
        </div>

        <div class="theme-switcher">
            <button onclick="setTheme('light')">Светлая</button>
            <button onclick="setTheme('dark')">Тёмная</button>
        </div>

        <div id="results" class="results"></div>
    </div>

<script src="script.js"></script>
</body>
</html>
