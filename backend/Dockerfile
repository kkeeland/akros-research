FROM node:20-alpine AS base

RUN npm install -g pnpm@10

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 9000
CMD ["pnpm", "start"]
