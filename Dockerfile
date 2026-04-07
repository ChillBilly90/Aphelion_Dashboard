# deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_NODE_1_IP
ARG NEXT_PUBLIC_NODE_2_IP
ARG NEXT_PUBLIC_NODE_3_IP
ARG NEXT_PUBLIC_NODE_4_IP
ARG NEXT_PUBLIC_NODE_5_IP
ARG NEXT_PUBLIC_NODE_6_IP

ENV NEXT_PUBLIC_NODE_1_IP=$NEXT_PUBLIC_NODE_1_IP
ENV NEXT_PUBLIC_NODE_2_IP=$NEXT_PUBLIC_NODE_2_IP
ENV NEXT_PUBLIC_NODE_3_IP=$NEXT_PUBLIC_NODE_3_IP
ENV NEXT_PUBLIC_NODE_4_IP=$NEXT_PUBLIC_NODE_4_IP
ENV NEXT_PUBLIC_NODE_5_IP=$NEXT_PUBLIC_NODE_5_IP
ENV NEXT_PUBLIC_NODE_6_IP=$NEXT_PUBLIC_NODE_6_IP
RUN npm run build

# runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000

CMD ["npm", "run", "start"]