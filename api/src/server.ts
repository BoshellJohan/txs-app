import app from './app.js';
import { connectDB } from './config/db.js';
import { requiredEnv } from './utils/env.js';

const PORT = process.env.PORT ?? 8080;

await connectDB(requiredEnv('MONGO_URI'!));

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});