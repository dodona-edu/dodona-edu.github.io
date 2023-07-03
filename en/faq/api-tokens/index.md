---
title: API and API tokens
---

# FAQ: API tokens

[[toc]]

## What is an API token?

An API token is a unique identifier that allows external applications to interact with your account on a platform without needing your password. It acts as an authentication key that these applications can use to perform actions on your behalf. For example, you can use an API token to authorise the [Dodona plugin for JetBrains IDEs](/en/faq/ide-plugins/#how-do-i-install-the-pycharm-plugin) to access your Dodona account.

## How do I create an API token?

Follow the steps below to create an API token on Dodona:

1. **Go to your profile page**: Navigate to your profile page by clicking on the appropriate link in the drop down menu. You can also go directly to [dodona.ugent.be/profile](https://dodona.ugent.be/en/profile).
  ![My Profile](./my-profile.png)

2. **Generate a new token**: Once you're on your profile page, scroll to the middle of the page and click the '+' button to generate a new token. You will need to enter a description for your token (e.g. "pycharm"). This description will help you identify the purpose of the token in the future.
  ![Create a token](./create-new-token.png)

3. **Copy the token**: Once the token is generated, copy and paste it into the authentication dialog of the application you want to authorise, e.g. the PyCharm plugin or the VS Code extension.
  ![Token generated](./token-generated.png)

::: tip
Please note that for security reasons you will not be able to view the tokens on Dodona after creation. However, you can see a list of all your active tokens. You can delete a token at any time and it will stop working immediately.
:::

## How can I use the Dodona API?

::: warning
If you want to build an application, tool or plugin that uses the Dodona API, please contact us at [dodona@ugent.be](mailto:dodona@ugent.be) so we can help you out. This will also allow us to notify you if we make any changes to the API.
:::

Many of the actions you can perform on Dodona can also be done through the API. Unfortunately, we do not have a complete documentation of the API yet. The easiest way to check if a certain action is possible through the API is to add `.json` to the end of the URL. For example, if you want to get a list of all the featured courses on Dodona, you can go to [dodona.ugent.be/courses.json?tab=featured](https://dodona.ugent.be/courses.json?tab=featured). This will return a JSON object with all the featured courses on Dodona.

For endpoints where you need to be signed in, you can use an [API token](#what-is-an-api-token) to authenticate. You can do this by adding the token to an `Authorization` header with your request:

```bash
curl \
  -H "Authorization: {YOUR TOKEN}" \
  -H "Accept: application/json" \
  "https://dodona.ugent.be/nl/submissions.json"
```

In Python, this would look like:

```python
#!/usr/bin/python3
# Name: Get submissions
# By Robbert Gurdeep Singh
######################################################################
TOKEN = "TOKEN HERE"


import http.client
conn = http.client.HTTPSConnection("dodona.ugent.be")
headers = {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Authorization" : TOKEN
}

conn.request("GET", "/en/submissions.json", headers=headers)
res = conn.getresponse()
print(res.status, res.reason)
data = res.read()
conn.close()
print(data)
```
