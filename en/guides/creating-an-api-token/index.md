---
title: Creating an API token
description: "Tutorial: creating an API token"
---
# Creating an API token

By creating an API token, you can authorize external applications, such as the [Dodona plugin for JetBrains IDEs](https://plugins.jetbrains.com/plugin/11166-dodona), to act on your behalf, without ever providing them with your password. To create an API token, simply follow these four steps:

## 1. Go to your profile page

First, go to your profile page by clicking the link in the dropdown menu. Alternatively, you can browse to [dodona.ugent.be/profile](https://dodona.ugent.be/profile).

![My Profile](./my-profile.png)

## 2. Create a token

Scroll to the middle of the page and generate a new token by clicking the `+`-button. Fill in a description of your choice (ex. _pycharm_). This allows you to identify the token later on, as it tells you which program uses that specific token.

![Create a token](./create-new-token.png)

## 3. Copy the token

Copy the newly generated token and paste it in the authentication dialog of the [PyCharm plugin](../pycharm-plugin) or the [VS Code extension](../vs-code-extension). On Dodona, you can see a list of all your active tokens. Be aware that you can't see the tokens themselves out of security considerations. You can delete a token at any time. Removing a token will cause it to stop functioning immediately.

![Token generated](./token-generated.png)
