import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const config = {
  runtime: 'edge',
};

const app = new Hono();

app.get('/:id', (c) => {
  const { id } = c.req.param();

  return c.json({ id }, 404);
});

export default handle(app);
