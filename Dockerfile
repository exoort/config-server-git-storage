FROM node:18-alpine

ARG SERVER_PORT=3000
ENV SERVER_PORT=$SERVER_PORT

# Create and change to the app directory.
WORKDIR /usr/src/app

RUN add-apt-repository ppa:ubuntu-toolchain-r/test && apt-get update && apt-get install -y --no-install-recommends git

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm i --production

# Copy local code to the container image.
COPY . .

EXPOSE ${SERVER_PORT}

# Run the web service on container startup.
CMD [ "node", "src/index.mjs" ]
