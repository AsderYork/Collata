FROM node:18-alpine3.17 as build

# update and install the latest dependencies
# Add non root user to the docker image and set the user
RUN apk update && apk upgrade && adduser -D nuxtuser
RUN apk add --update --no-cache openssl1.1-compat

USER nuxtuser

# set work dir as app
WORKDIR /app
# copy the nuxt project content with proper permission for the user nuxtuser
COPY --chown=nuxtuser:nuxtuser . /app
# COPY . ./
# install all the project npm dependencies
# build the nuxt project to generate the artifacts in .output directory
RUN npm install 

RUN npx nuxt build
# RUN cp ./prisma/dev.db ./.output/server/node_modules/.prisma/client/dev.db
#remove any uploads from left from debug and testing
RUN rm -rf ./public/uploads/*
# we are using multi stage build process to keep the image size as small as possible
FROM node:18-alpine3.17
# update and install latest dependencies, add dumb-init package
# add a non root user
RUN apk update && apk upgrade && apk add dumb-init && adduser -D nuxtuser
RUN apk add --update --no-cache openssl1.1-compat
# set non root user
USER nuxtuser

# set work dir as app
WORKDIR /app
# copy the output directory to the /app directory from 
# build stage with proper permissions for user nuxt user
COPY --chown=nuxtuser:nuxtuser --from=build /app/.output ./
COPY --chown=nuxtuser:nuxtuser --from=build /app/prisma ./prisma
EXPOSE ${PORT}

# set app host and port . In nuxt 3 this is based on nitor and you can read
#more on this https://nitro.unjs.io/deploy/node#environment-variables
ENV HOST=0.0.0.0 PORT=${PORT} NODE_ENV=production DATABASE_URL=${DATABASE_URL}
ENV NODE_PATH='/app/server/node_modules'

#RUN export 
RUN mkdir -p ./public/uploads
RUN mkdir -p ./database
RUN npx --yes prisma

# start the app with dumb init to spawn the Node.js runtime process
# with signal support
ENV DATABASE_URL=
CMD npx prisma migrate deploy && node /app/prisma/seed.js && dumb-init node /app/server/index.mjs