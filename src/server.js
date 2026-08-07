import express from 'express';
import { config } from './config.js';

const app = express();

app.get('/', (_req, res) => {
  res.json({ message: `${config.greeting} from poc-service` });
});

// version and commit identify the image; environment comes from config.
// Same version in dev/qa/prod means the same image is running.
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    version: config.version,
    commit: config.commitSha,
    environment: config.env,
  });
});

app.get('/ready', (_req, res) => res.json({ ready: true }));

// Returns the digest-independent identity of this build. Every environment
// running the same image must return the same values here.
app.get('/identity', (_req, res) => {
  res.json({
    version: config.version,
    commit: config.commitSha,
    promotedBy: 'tag-demo',
  });
});

app.listen(config.port, () => {
  console.log(JSON.stringify({
    level: 'info', msg: 'listening',
    port: config.port, version: config.version, env: config.env,
  }));
});
