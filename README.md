# План работы
## Main screen
1. Баннер юзера с его фото
2. Баланс справа от юзера, возможно кристалик с числом, надо по умолчанию выдавать юзеру коины, например на создание 1 диспута, для тестовых юхеров выдавать по 20 коинов
3. Список диспутов или текст Вы не участвуете ни в одном из споров, создайте спор или ожидайте пока вас пригласят.
4. Кнопка создать диспут

## Первый вход
1. Сохранение данных юзера в базу данных
2. Выдача тестового баланса пользователю

## Add new dispute
1. Проверка на то что хватает баланса
2. Списание и создание новой странички диспута (тут нужна валидация доступа для определённого юзера на бэке)
3. Если нет коинов перекидывать на страницу пополнения баланса

### Шаг 1.
1. Пригласить юзера, думаю здесь должно быть просто поле ввода для поиска
2. Под полем поиска выводится плитка с юзером на которую можно кликнуть, находится только 1 юзер
3. Если юзер не найден выводить текст: Юзер не найден, скопируйте ссылку для приглашения ползьователя, после того как он войдёт в приложение вы сможете добавить его в этот спор.
4. Выводить кнопку скопировать ссылку для приглашения
5. После выбора пользователя появляется кнопка подтвердить выбор

## Процесс заполнения спора
1. Поле ввода укажите вашу точку зрения 
2. Рядом с полем знак вопроса при клике на который открывается модалка
3. После того как пользователь заполнил поле появляется кнопка Сохранить и ожидать результата
4. При сохранении должно быть подтверждающее окно, что вернуться к редактированию будет невозможно, уверен ли он что всё заполнено корректно.
5. Выводить текст о том что он может вернуться к заполнению позже и весь текущий результат будет сохранён.
   1. Заполненный текст сохраняется в базе
   2. До нажатия на кнопку не считается отправленным
6. После нажатия на кнопку подтвердить пользователь переносится на страницу ожидания результата

## Экран ожидания
1. На экране ожидания Видно двоих пользователей 1vs2
2. Ниже выводится основная по мнению чата тема спора.
3. Далее выводится статус:
   1. Ожидаем описания ситуации от пользователя
   2. Ожидается решение, тут можно всякий текст придумать
      1. Изучаем правовые нормы
      2. Ищем виновных
      3. и т.д. просто по фану выводить разныё текст с задержкой
4. После того как бот дал ответ показываем другой экран

## Экран результата
1. Выводится такая же шапка как и в ожидании
2. Результат: Прав пользователь: Карточка пользователя
3. Для отладочной информации можно выводить текст почему так решил бот

# Telegram Mini Apps Next.js Template

This template demonstrates how developers can implement a web application on the Telegram
Mini Apps platform using the following technologies and libraries:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [@telegram-apps SDK](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk)
- [Telegram UI](https://github.com/Telegram-Mini-Apps/TelegramUI)

> The template was created using [pnpm](https://pnpm.io/). Therefore, it is required to use
> it for this project as well. Using other package managers, you will receive a corresponding error.

## Install Dependencies

If you have just cloned this template, you should install the project dependencies using the
command:

```Bash
pnpm install
```

## Scripts

This project contains the following scripts:

- `dev`. Runs the application in development mode.
- `dev:https`. Runs the application in development mode using self-signed SSL certificate.
- `build`. Builds the application for production.
- `start`. Starts the Next.js server in production mode.
- `lint`. Runs [eslint](https://eslint.org/) to ensure the code quality meets the required
  standards.

To run a script, use the `pnpm run` command:

```Bash
pnpm run {script}
# Example: pnpm run build
```

## Create Bot and Mini App

Before you start, make sure you have already created a Telegram Bot. Here is
a [comprehensive guide](https://docs.telegram-mini-apps.com/platform/creating-new-app) on how to
do it.

## Run

Although Mini Apps are designed to be opened
within [Telegram applications](https://docs.telegram-mini-apps.com/platform/about#supported-applications),
you can still develop and test them outside of Telegram during the development process.

To run the application in the development mode, use the `dev` script:

```bash
pnpm run dev
```

After this, you will see a similar message in your terminal:

```bash
▲ Next.js 14.2.3
- Local:        http://localhost:3000

✓ Starting...
✓ Ready in 2.9s
```

To view the application, you need to open the `Local`
link (`http://localhost:3000` in this example) in your browser.

It is important to note that some libraries in this template, such as `@telegram-apps/sdk`, are not
intended for use outside of Telegram.

Nevertheless, they appear to function properly. This is because the `src/hooks/useTelegramMock.ts`
file, which is imported in the application's `Root` component, employs the `mockTelegramEnv`
function to simulate the Telegram environment. This trick convinces the application that it is
running in a Telegram-based environment. Therefore, be cautious not to use this function in
production mode unless you fully understand its implications.

### Run Inside Telegram

Although it is possible to run the application outside of Telegram, it is recommended to develop it
within Telegram for the most accurate representation of its real-world functionality.

To run the application inside Telegram, [@BotFather](https://t.me/botfather) requires an HTTPS link.

This template already provides a solution.

To retrieve a link with the HTTPS protocol, consider using the `dev:https` script:

```bash
$ pnpm run dev:https

▲ Next.js 14.2.3
- Local:        https://localhost:3000

✓ Starting...
✓ Ready in 2.4s
```

Visiting the `Local` link (`https://localhost:3000` in this example) in your
browser, you will see the following warning:

![SSL Warning](assets/ssl-warning.png)

This browser warning is normal and can be safely ignored as long as the site is secure. Click
the `Proceed to localhost (unsafe)` button to continue and view the application.

Once the application is displayed correctly, submit the
link `https://127.0.0.1:3000` (`https://localhost:3000` is considered as invalid by BotFather) as
the Mini App link to [@BotFather](https://t.me/botfather). Then, navigate
to [https://web.telegram.org/k/](https://web.telegram.org/k/), find your bot, and launch the
Telegram Mini App. This approach provides the full development experience.

## Deploy

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.

## Useful Links

- [Platform documentation](https://docs.telegram-mini-apps.com/)
- [@telegram-apps/sdk-react documentation](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk-react)
- [Telegram developers community chat](https://t.me/devs)