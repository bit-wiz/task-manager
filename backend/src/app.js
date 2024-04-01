import express from "express"
import cors from "cors"

import { initRoutes } from "./routes/index.js";
import mongoose from "mongoose";

class App {

    constructor () {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors({origin : true}));
        this.#routes();

    }

    listen () {
        const PORT = 8000;

        this.app.listen(PORT, async () => {
            await mongoose.connect(process.env.MONGO_URI);
            console.log(`Server is running on port http://127.0.0.1:${PORT}`);
        });
    }

    #routes () {
        initRoutes(this.app);
    }

}

export default App
