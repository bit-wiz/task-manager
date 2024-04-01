import root from "./api/root.js";
import auth from "./api/auth.js"
import tasks from "./api/tasks.js"
import userprofile from "./api/userprofile.js"

export const initRoutes = (app) => {
    const v1Group = "/api/v1"

    app.use(v1Group, root);
    app.use(v1Group + "/auth", auth);
    app.use(v1Group + "/tasks", tasks);
    app.use(v1Group + "/profile", userprofile);

}