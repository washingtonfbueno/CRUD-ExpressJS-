import express, { Application, Request, Response } from "express";
import user from "./routes/user";
import db from "./database/config/db";
import "dotenv/config";
import { authenticateUser } from "./middlewares/authenticateUser";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/user", user);

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
});

app.get("/home", authenticateUser, (req: Request, res: Response) => {
    res.send("home page");
});

db.sync().then(() => {
    app.listen(port, () =>
        console.log(`Running server on http://localhost:${port}`)
    );
});
