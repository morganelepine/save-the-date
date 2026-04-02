import "dotenv/config";
import app from "./index";

const port = Number(process.env.PORT ?? 4001);

app.listen(port, () => console.log(`Server started: ${process.env.API_URL}`));
