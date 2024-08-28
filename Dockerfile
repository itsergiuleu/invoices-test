# Use the official Node.js image.
FROM --platform=linux/amd64 docker.io/library/node:20-slim

# Install necessary packages
RUN apt-get update && apt-get install -y wget

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app && chown node:node /home/node/app

WORKDIR /home/node/app

# Ensure the `node` user owns the /home/node/app directory
RUN chown -R node:node /home/node/app

# Switch back to 'node' user
USER node
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source code
COPY --chown=node:node . .

# Define the command to run your app using CMD which defines your runtime
CMD [ "yarn", "start:prod" ]
