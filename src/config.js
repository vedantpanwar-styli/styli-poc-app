export const config = {
  port:     Number(process.env.PORT ?? 8080),
  env:      process.env.APP_ENV   ?? 'unknown',
  greeting: process.env.GREETING  ?? 'hello',

  // set at build time via ARG
  version:   process.env.APP_VERSION ?? 'dev',
  commitSha: process.env.COMMIT_SHA  ?? 'unknown',
};
