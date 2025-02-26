FROM nginx:alpine

COPY . /usr/share/nginx/html

RUN ln -s /config /usr/share/nginx/html/data

EXPOSE 80
