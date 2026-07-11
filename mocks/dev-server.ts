import express from 'express';
import cors from 'cors';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from './handlers';

const app = express();
const PORT = 9090;

app.use(cors());
app.use(express.json());
app.use(createMiddleware(...handlers));

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
