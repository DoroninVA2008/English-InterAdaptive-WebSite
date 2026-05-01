Вот пошаговая инструкция для консоли, находясь в папке твоего репозитория `English-InterAdaptive-WebSite`.

---

### Шаг 1: Инициализация проекта и установка пакетов

Открываешь консоль в папке проекта и выполняешь всё подряд:

```bash
# 1. Создаём package.json (сразу заполнит имя папки как имя проекта)
npm init -y

# 2. Устанавливаем Webpack, CLI и сервер разработки
npm install --save-dev webpack webpack-cli webpack-dev-server

# 3. Устанавливаем Bootstrap (CSS и JS)
npm install bootstrap @popperjs/core

# 4. Устанавливаем загрузчики для CSS и HTML в Webpack
npm install --save-dev css-loader style-loader html-webpack-plugin
```

### Шаг 2: Создаём структуру проекта

Прямо в корне репозитория создаём папки и файлы. Можно через консоль:

```bash
mkdir src src/scss src/js
# Обрати внимание: папка dist не нужна, её создаст Webpack
```

Теперь вручную (или через `echo`) создаём следующие файлы:

**`src/index.html`** — главная страница, Bootstrap-шаблон на английском:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive English Website</title>
</head>
<body>
    <!-- Адаптивный навбар -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">EnglishSite</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Lessons</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">About</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Контент -->
    <div class="container mt-5">
        <h1>Welcome to Interactive English!</h1>
        <p class="lead">Learn English with our adaptive, interactive tools.</p>
        
        <!-- Интерактивный компонент: кнопка с модальным окном -->
        <button type="button" class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#lessonModal">
            Start a Lesson
        </button>
    </div>

    <!-- Модальное окно Bootstrap (интерактивный элемент) -->
    <div class="modal fade" id="lessonModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">Lesson 1: Greetings</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>Select the correct answer: "Hello, how ___ you?"</p>
                    <button class="btn btn-outline-primary">is</button>
                    <button class="btn btn-outline-primary">are</button>
                    <button class="btn btn-outline-primary">am</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

**`src/js/index.js`** — точка входа для JavaScript. Импортируем CSS и JS Bootstrap'а:

```javascript
// Импорт пользовательских стилей (потом их создадим)
import '../scss/styles.scss';

// Импорт JS Bootstrap (без этого модалки, навбар не будут работать!)
import 'bootstrap';
```

**`src/scss/styles.scss`** — твои кастомные стили и импорт Bootstrap. Обрати внимание: работаем с **SCSS**, но это тот же CSS, просто с возможностью использовать переменные и вложенность (Bootstrap написан на нём, и нам это удобно).

```scss
// 1. Импортируем весь Bootstrap SCSS целиком
@import '~bootstrap/scss/bootstrap';

// 2. Твои кастомные стили (чистый CSS)
body {
    background-color: #f8f9fa; // светлый фон с переменной Bootstrap
}

.lead {
    font-size: 1.25rem;
    color: #6c757d;
}

// Если хочешь добавить свои классы — смело пиши ниже
```

### Шаг 3: Настройка Webpack

В корне проекта создаём файл **`webpack.config.js`**:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Точка входа — твой JS файл
    entry: './src/js/index.js',
    
    // Куда собирать бандл
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // очищает dist перед каждой сборкой
    },

    // Режим разработки (удобно для отладки)
    mode: 'development',
    
    // Сервер для разработки с автообновлением
    devServer: {
        static: './dist',
        port: 3000,
        open: true, // сам откроет браузер
    },

    module: {
        rules: [
            {
                // Обработка файлов .scss/.css
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',  // встраивает стили в DOM
                    'css-loader',    // понимает @import и url()
                    {
                        loader: 'sass-loader', // компилирует SCSS -> CSS
                        options: {
                            sassOptions: {
                                quietDeps: true, // избегает лишних предупреждений от Bootstrap
                            },
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        // Подключает твой HTML и автоматически вставляет скрипт bundle.js
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Interactive English Website',
        }),
    ],
};
```

Чтобы `sass-loader` работал, его нужно доустановить (Bootstrap требует его):

```bash
npm install --save-dev sass-loader sass
```

### Шаг 4: Добавляем скрипты в package.json

Открываешь `package.json` и в секции `"scripts"` заменяешь на:

```json
"scripts": {
    "start": "webpack serve",
    "build": "webpack"
}
```

### Шаг 5: Запуск и сборка

Всё готово. Запускаем сервер разработки:

```bash
npm start
```

Откроется браузер на `http://localhost:3000`. Можешь нажать на кнопку **Start a Lesson** — появится модальное окно. Навбар тоже полностью рабочий (адаптивный).

Когда будешь готов к деплою — собираешь финальную папку `dist`:

```bash
npm run build
```

Теперь ты можешь закоммитить всё это в свой GitHub-репозиторий (не забудь добавить `node_modules` в `.gitignore` и запушить).