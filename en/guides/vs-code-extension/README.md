---
title: Dodona VS Code extension
description: "The Dodona VS Code extension"
---

# Dodona VS Code extension

If you're programming in Visual Studio Code, you can make use of the Dodona extension to easily submit your solutions.

## Create an API token
Before installing the extension, you need to create an API token on the Dodona website. Using such token, VS Code can submit solution on your behalf without needing your password. To create an API token, follow [this guide](/en/guides/creating-an-api-token). Keep the created token nearby because you'll need it in a few minutes when you use the extension for the first time.

## Install the extension

You can install the extension directly from VS Code. In the `Extensions` menu (<img src="./extensions-view-icon.png" alt="Extensions" width=30px; />), search for `Dodona` and click on the search result. Finally, click `Install`.

![settings](./vs_code_dodona_marketplace.png)

You can also install the extension directly from the  VS Code Marketplace. Surf to [https://marketplace.visualstudio.com/items?itemName=thepieterdc.dodona-plugin-vscode](https://marketplace.visualstudio.com/items?itemName=thepieterdc.dodona-plugin-vscode), click on the green `Install` button.

## Insert API token

In the settings you have to paste the the generated token. Click on the cogwheel <img src="./cogwheel.png" alt="cogwheel" width=30px;/> (icon in bottom left corner), Settings (`Ctrl+,`).

![Settings](./vs_code_settings.png)

Finally click `Extensions` (last item in list), `Dodona`. Paste the API token in text box.
![API token](./api-token.png)

## Start a new exercise

Of course, VS Code must know for which exercise it has to submit your solution. Paste the Dodona URL of the exercise in VS Code on the first line of your solution. Make sure this URL is marked as a comment.

> **Example**
>
> ```javascript
> // https://dodona.ugent.be/nl/activities/1545120484/
> function echo(i) {
> return i;
> }
> ```

VS Code uses this first line to submit to the correct exercise, so don't remove it. If you hold `ctrl` (or `cmd` on a mac) while clicking the URL, the exercise description will open in a new browser window.

## Submit your solution

Once you've solved the exercise, it's easy to submit your solution. Execute the `Submit to Dodona`-command by opening the command palette using `Ctrl-Shift-P` by typing (parts of) `Submit to Dodona` and pressing `Enter`. You can also make a [shortcut](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-editor) for this. This command will submit your code to Dodona and trigger an automatic test.

![Submit](./submit.png)

After a few seconds, you should see a popup in the bottom right corner containing the result of your submission. If you click the `View results` button, the result should open in a new browser version. If you're ready to submit again, simply execute the same command. You can submit as many times as you want.

![correct solution](./vs_code_correct_view_results.png)
![incorrect solution](./vs_code_incorrect_view_results.png)