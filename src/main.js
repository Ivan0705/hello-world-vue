import {createApp} from 'vue'
import NewApp from "./NewApp";
import components from './components/UI';
import router from "./router/router";
import directives from './directives'
import store from './store'

const app = createApp(NewApp);

components.forEach(c => app.component(c.name));

directives.forEach(el => app.directive(el.name, el));

app.use(router).use(store).mount('#app');
