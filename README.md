# gispace-web-client

## Установка зависимостей

Gispace-web-client требует:
- node: 22.2.0. Инструкция по установке [здесь](https://nodejs.org/en/download/package-manager/current).
- yarn: 4.2.2. Инструкция по установке [здесь](https://yarnpkg.com/getting-started/install).

Устанавливаем все зависимости проекта при помощи:

```bash
$ yarn install
```


## Подготовка к запуску и запуск

Создайте файл `.env` со следующим содержимым:

```dotenv
VITE_BACKEND_HOST = "the_host_of_the_server_part"
```

Запустить приложение:
```bash
$ yarn start
```

## Архитектура

- tests: директория для хранения файлов автоматического тестирования.
- src: 
  - assets: изображения используемые в проекте.
  - components: компоненты для отрисовки страниц.
  - context: контекст для управления состоянием пользователя.
  - pages: страницы содержащие компоненты.
  - router: маршрутизация приложения.
  - utils: вспомогательные инстурменты.
