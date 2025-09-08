import express from "express";
import dotenv from "dotenv";
import { userRoute } from "./routes/user.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import { authRoute } from "./routes/auth.route";
dotenv.config();
const app = express();
app.use(express.json());

app.use(authMiddleware);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
