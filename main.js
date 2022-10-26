import App from './App'
import * as components from "./components/index";
import store from "./store";

import {
	createSSRApp
} from "vue";
export function createApp() {
	const app = createSSRApp(App);

	for (const [name, value] of Object.entries(components)) {
		app.component(name, value);
	}

	app.use(store);

	app.component();
	return { app };
};
