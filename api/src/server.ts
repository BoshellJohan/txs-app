import app from './app.js';
import { requiredEnv } from './utils/env.js';

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});