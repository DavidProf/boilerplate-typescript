# image around 108 MB
# build step
ARG IMAGE=mhart/alpine-node:16
FROM $IMAGE as build

WORKDIR build

COPY package.json .

RUN yarn

COPY . .

RUN yarn build && \
    rm -rf node_modules && \
    yarn --prod

# application environment
FROM $IMAGE

WORKDIR /project

COPY --from=build build /project

CMD ["node", "dist/src/index.js"]
