import express from "express";

import router from "./router";
import { logRequest } from "./utils";

const app = express();

app.use(logRequest);
app.use(express.static("public"));
app.use(router);

app.listen(3000, () => {
	console.clear();
	console.log("Server started on port 3000");
	console.log("http://localhost:3000"); //DevSkim: ignore DS137138
});
