# Simply Notes
Simply notes is a simple, private note-making progressive web app. It stores
notes data in the browser, rather than in the cloud, giving users complete
control. It also works offline.

## Installing
Before installing, you need to have Node LTS and NPM installed on your computer.

You can install Simply Notes by running `npm install` in the root folder of
the application.

## Running the application
When making developments to the application, run `npm run dev` in the root
folder. This will build the application into the `public` folder, and
automatically rebuild it every time you change a source file.

You can then access the application by opening the `public/index.html` file in
your browser. To access it through an HTTP server, simply run `npx http-server`
in the `public` folder and access the URL shown on screen.

## Deployment
When you're ready to deploy the application, you can build a production-ready
version by running `npm run build` in the root folder. If you plan to host it
on a root domain (e.g. at https://notes.com/ or https://notes.apps.com/) then
you simply need to upload it.

If you plan to host the application on a subdirectory (e.g. at
https://apps.com/notes/simply) then you should provide the subdirectory as an
additional argument when running the build script. In this case, that would be:

```sh
npm run build -- --environment SUBDIRECTORY:notes/simply
```

Note the additional `--` which is necessary to pass the parameter past npm.

## Built with
* [Dexie](http://dexie.org/)
* [ESLint](https://eslint.org/)
* [Rollup](https://rollupjs.org/guide/en)
* [sw-precache](https://github.com/GoogleChromeLabs/sw-precache)
* [Vue](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/en/) and [Vue Router](https://router.vuejs.org/en/)

## License
This project is licensed under the MIT License - see the LICENSE file for details
