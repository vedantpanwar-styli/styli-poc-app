FROM node:20.14.0-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

FROM node:20.14.0-alpine AS runtime

ARG VERSION=dev
ARG COMMIT_SHA=unknown

ENV APP_VERSION=${VERSION}
ENV COMMIT_SHA=${COMMIT_SHA}

LABEL org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${COMMIT_SHA}"

WORKDIR /app
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node src ./src

USER node
EXPOSE 8080

# node directly, not npm. npm does not forward SIGTERM so pods never stop gracefully.
CMD ["node", "src/server.js"]

# Do not add ENV for APP_ENV / GREETING / NODE_ENV here.
# Those come from the ConfigMap at runtime so one image works in every environment.
