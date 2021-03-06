import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"
import 'materialize-css/dist/js/materialize.min'
import useVuelidate from "@vuelidate/core"



createApp(App).use(store).use(router).mount("#app")
