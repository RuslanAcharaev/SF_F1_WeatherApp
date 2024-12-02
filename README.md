# Weather App

Простейшее приложение для просмотра информации о погоде.

Необходимые зависимости можно установить при помощи `npm install`.

Приложение создано с использованием фреймворка React. 

Доступные команды:
- `npm run start` - запуск сервера разработки
- `npm run build` - сборка проекта в режиме production
- `npm run lint:write` - запускает линтер для кода
- `npm run stylelint` - запускает линтер для стилей

В файл `.husky/pre-commit` добавлены настройки, осуществляющие запуск `lint-staged` при коммите. `lint-staged` осуществялет проверку:

- файлов с расширениями .js, .jsx через eslint и prettier;
- файлов с расширениями .css через stylelint.