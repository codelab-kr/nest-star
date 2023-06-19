FROM node:18.16.0-alpine3.17

ENV NODE_ENV development
ENV TZ=Asia/Seoul

# Korean Fonts
RUN apk --update add fontconfig
RUN mkdir -p /usr/share/fonts/nanumfont
RUN wget http://cdn.naver.com/naver/NanumFont/fontfiles/NanumFont_TTF_ALL.zip
RUN unzip NanumFont_TTF_ALL.zip -d /usr/share/fonts/nanumfont
RUN fc-cache -f && rm -rf /var/cache/*

# Set the timezone in docker
RUN apk --no-cache add tzdata && \
   cp /usr/share/zoneinfo/$TZ /etc/localtime && \
   echo $TZ > /etc/timezone \
   apk del tzdata

# bash install
RUN apk add --no-cache --update bash

# Language
ENV LANG=ko_KR.UTF-8 \
   LANGUAGE=ko_KR.UTF-8

# Only copy the package.json file to work directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install

# Copy all local files into the image
COPY ./ ./

# wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Docker Demon Port Mapping
EXPOSE 3000