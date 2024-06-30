FROM node:latest as builder
WORKDIR /chichi
COPY package.json .
RUN npm i -f -g pnpm
RUN pnpm install --registry=http://registry.npm.taobao.org --no-frozen-lockfile
COPY . .
RUN npm run build
FROM nginx:latest
COPY --from=builder /VueCICD/dist /usr/share/nginx/html