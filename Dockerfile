FROM oven/bun:1

WORKDIR /app

COPY ./package.json ./package.json

RUN bun install

COPY . .

RUN bunx prisma generate

CMD ["bun", "index.ts"]
