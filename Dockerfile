FROM node:20.4-alpine3.18 AS build
ENV NODE_ENV production
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci --production
COPY . .
RUN npm run build

FROM nginx:1.25.1-alpine3.17-slim AS run
ENV NODE_ENV production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
