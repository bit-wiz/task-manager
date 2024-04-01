import { Router } from "express";

const r = Router();

r.get("/", (_, res) => {
    res.send({ message: "Hello World" });
})

export default r;