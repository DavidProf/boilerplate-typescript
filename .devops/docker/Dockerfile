# image around 108 MB
# build step
ARG IMAGE=mhart/alpine-node:16
FROM $IMAGE as build

WORKDIR build

COPY package.json .

RUN npm i

COPY . .

RUN npm run build && \
    npm i --production

# application environment
FROM $IMAGE

WORKDIR /project

COPY --from=build build /project

CMD ["node", "dist/src/index.js"]
