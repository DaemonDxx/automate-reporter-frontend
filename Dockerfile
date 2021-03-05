FROM node:14.11.0-alpine as builder-app-stage

WORKDIR /usr/vue
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
ENTRYPOINT npm run serve


FROM nginx:stable-alpine as production-stage

COPY --from=builder-app-stage /usr/vue/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]