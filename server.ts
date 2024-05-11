import { app } from "./src/app";
import { connectDB } from "./src/config/db";

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`😋 Server is running at PORT::http://localhost:${PORT}/`);
  });
});
