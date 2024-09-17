import Fastify from 'fastify';
const fastify = Fastify({ logger: true });
import { migrate } from './migrate.js';
import fastifyView from '@fastify/view';
import fastifyPostgres from '@fastify/postgres';
import ejs from 'ejs';

fastify.register(fastifyPostgres, {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

fastify.register(fastifyView, {
  root: "src/views",
  layout: "layout.ejs",
  engine: {
    ejs: ejs,
  },
});

await migrate();

fastify.get("/", (request, reply) => {
  reply.view("index.ejs", { title: "Обо мне", description: "рыба" });
});

fastify.get("/blogs", (request, reply) => {
  const articles = [];
  reply.view("blogs/index.ejs", {
    title: "Блог",
    description: "внизу",
    articles: articles,
  });
});

fastify.get("/blogs/:slug", (request, reply) => {
  const { slug } = request.params;
  const article = articles.find((el) => el.slug == slug);

  reply.view("blogs/show.ejs", {
    title: article.title,
    description: article.description,
    article: article,
  });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
});
