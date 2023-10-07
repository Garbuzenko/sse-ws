

### Ссылкка на [github-pages](https://garbuzenko.github.io/sse-ws/)
### Ссылкка на [backend сервер](https://ahj-hw8-1.onrender.com)

---
**CI** [![Build status](https://ci.appveyor.com/api/projects/status/gx2q10bnxe77vx39?svg=true)](https://ci.appveyor.com/project/garbuzenko/sse-ws) [GitHub Pages](https://garbuzenko.github.io/sse-ws/)

---

# Домашнее задание к занятию "8. EventSource, Websockets"

Правила сдачи задания:

1. **Важно**: в рамках этого ДЗ можно использовать любой менеджер пакетов
2. Всё должно собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor
3. В README.md должен быть размещён бейджик сборки и ссылка на Github Pages
4. В качестве результата присылайте проверяющему ссылки на ваши GitHub-проекты
5. Авто-тесты писать не требуется
6. Серверная часть должна быть выложена на [Render](https://render.com/).
   Посмотрите [инструкцию](https://github.com/netology-code/ahj-homeworks/tree/video/docs/render#readme)
   или [документацию](https://render.com/docs/deploy-node-express-app), как развертывать серверную часть на Render.

---

## Чат

### Легенда

В рамках реализации корпоративного портала вам поручили организовать чат, и вы решили для этого
использовать веб-сокеты.

### Описание

Ребята из команды backend уже написали сервер, вам необходимо реализовать клиентскую часть.
Изучите backend, чтобы понять, как нужно взаимодействовать.

При загрузке страницы появляется всплывающее окно, в котором запрашивается никнейм, под которым вы будете
зарегистрированы в чате:

![](/pic/chat.png)

Если такой никнейм свободен, то открывается окно чата, в противном же случае вы должны сообщить пользователю о том, что
никнейм занят и ему необходимо выбрать другой (продумайте, как вы реализуете это).

Общее окно чата:

![](/pic/chat-2.png)

Обратите внимание: сообщения всех участников чата (кроме ваших) выравниваются по левому краю, а ваши - по правому.

Важно: `You` - это не никнейм, это указатель на то, что это Вы.

Важная детально: при отключении пользователя он должен удаляться из списка пользователей в левой части.

---
