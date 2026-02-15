import "dotenv/config";
import app from "./index";

app.listen(4000, () => console.log(`Server started: ${process.env.API_URL}`));
