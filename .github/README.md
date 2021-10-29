# Dodona documentation website

> Because of the limitations of GitHub pages, the compiled website files can only be served from the branch called `master`. This is why the default branch of this repo is `main` and contains the source of the documentation.

This website uses Vuepress and serves the documentation in both English and Dutch. Therefore, it is important that the same directory structure is used within the `nl` and `en` subdirectories. Changes to the configuration can be made in `.vuepress/config.js`.

Pushing to `main` will automatically publish this website.

To test locally, run `yarn install` and `yarn dev`, to build, run `yarn build`.
