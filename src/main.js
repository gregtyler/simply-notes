import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "../store/index.js";
import EditView from "./components/EditView.vue";
import ListView from "./components/ListView.vue";
import NoteView from "./components/NoteView.vue";
import toast from "./toast.js";

/** Router **/
const router = new VueRouter({
  routes: [
    { path: "/", name: "home", component: ListView, props: { archive: false } },
    {
      path: "/archive",
      name: "archive",
      component: ListView,
      props: { archive: true },
    },
    { path: "/compose", name: "compose", component: EditView },
    { path: "/:id", name: "note", component: NoteView },
    { path: "/:id/edit", name: "edit", component: EditView },
  ],
});

Vue.use(VueRouter);

/** Service worker **/
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then((reg) => {
    reg.addEventListener("updatefound", function () {
      toast(
        "A new version of this application is available. Refresh to update."
      );
    });
  });
}

/** Analytics **/
const _paq = [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
  var u = "https://analytics.gregtyler.co.uk/";
  _paq.push(["setTrackerUrl", u + "piwik.php"]);
  _paq.push(["setSiteId", "6"]);
  const script = document.createElement("script");
  const firstScript = document.getElementsByTagName("script")[0];
  script.type = "text/javascript";
  script.async = true;
  script.defer = true;
  script.src = u + "piwik.js";
  firstScript.parentNode.insertBefore(script, firstScript);
})();

/** Start app **/
new Vue({
  router,
  store,
  el: "#app",
  render: (createElement) => createElement(App),
});
