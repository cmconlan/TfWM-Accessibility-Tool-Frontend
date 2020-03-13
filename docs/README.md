# Accessibility Tool

This is the documentation for the frontend to the [TfWM Accessibility Tool](https://github.com/cmconlan/TfWM-Accessibility-Tool). This tool is used to map accessibility across different output areas in the West Midlands.

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
