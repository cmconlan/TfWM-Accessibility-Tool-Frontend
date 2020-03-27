# Accessibility Tool

This is the documentation for the frontend to the [Transport Accessibility Tool](https://github.com/cmconlan/TfWM-Accessibility-Tool). This tool is used to map accessibility across different output areas in the West Midlands.

## How It Works

This application is a single page web app (SPA) built in [Vue](https://vuejs.org). This frontend uses [Axios](https://github.com/axios/axios) to query the Accessibility Tool API, and displays the results of this to the user.

Interactions with the Accessibility Tool API are performed by [services](/services). These services are used by the [store](/store) to fetch data to hold in the state of the store. Once data is in the store, a hierarchy of [components](/components) responsively display this data to the user.

To ensure a codebase that is as free from errors as possible, a full [test suite](/tests) using [Cypress](https://www.cypress.io/) is provided.

## Getting Started
To install this SPA locally:
```bash
# Clone the repository
git clone https://github.com/cmconlan/TfWM-Accessibility-Tool-Frontend.git
cd TfWM-Accessibility-Tool-Frontend

# Set up dependencies
npm install

# Create local env file
echo "VUE_APP_API_BASE=http://my-api-url" > .env.local

# Compile and hot-reload for development
npm run serve
```

Be sure to replace `http://my-api-url` with the API URL that you are using (including port number if required).

## Deployment
This SPA can be deployed on any server with node and npm installed. This guide focuses on installing on a Warwick DCS server with node installed at `/local/java/node/bin/node` and npm installed at `/local/java/node/bin/npm`.

First, set up the environment:
```bash
# Because we don't have root access, create a local, 'global' npm directory
mkdir ~/.npm-global
/local/java/node/bin/npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Install nvm to manage the strange node setup that the DCS machines have
# Once this command has ran, be sure to re-open your terminal.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# Use nvm to install the latest version of node & npm
nvm install node

# Install the Vue CLI tools
npm install -g @vue/cli
npm install -g @vue/cli-service-global

# Clone the repository
cd ~
git clone https://github.com/cmconlan/TfWM-Accessibility-Tool-Frontend.git
cd TfWM-Accessibility-Tool-Frontend

# Create the production env file
echo "VUE_APP_API_BASE=http://my-api-url" > .env
```
Again, be sure to replace `http://my-api-url` with the API URL that you are using (including port number if required).

Now, build the code for production. This will have to be repeated every time the codebase is changed:
```bash
# Switch to the latest node version
nvm use node

# Grab the latest codebase
cd ~/TfWM-Accessibility-Tool-Frontend
git fetch
git pull

# Install/update dependencies
npm install

# Build the app & docs
npm run build
npm run docs:build
```
Once this is complete, the files for the page should be in `~/TfWM-Accessibility-Tool-Frontend/dist`. Point your webserver to this directory and the site will be served!

Instructions for how to do this on the University of Warwick's DCS machines can be found at [here](https://warwick.ac.uk/fac/sci/dcs/intranet/user_guide/apache/).
