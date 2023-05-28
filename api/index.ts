import { kv } from '@vercel/kv';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const config = {
  runtime: 'edge',
};

const app = new Hono();

const kvKey = (id: string) => `l-yoiw-dev_url_${id}`;

app.get('/:id', async (c) => {
  const { id } = c.req.param();

  const url = await kv.get<string | null>(kvKey(id));
  if (url === null) {
    return c.json({ message: 'Not Found' }, 404);
  }

  return c.redirect(url, 301);
});

export default handle(app);
