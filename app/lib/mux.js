import { Mux } from '@mux/mux-node';

if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
  throw new Error('Mux environment variables are missing.');
}

const mux = new Mux({
  accessToken: process.env.MUX_TOKEN_ID,
  secret: process.env.MUX_TOKEN_SECRET,
});

export default mux;
