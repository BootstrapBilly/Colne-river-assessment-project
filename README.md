# CRAP

An R Shiny app to display our CRAP project water quality data

## API

The deployed API is available on (this also has a cold start of ~60 seconds if it hasn't be used for a while)

https://crap-api.onrender.com/data?parameter=NFP_ENT

### Overview
The Plumber API is designed to read and process data for the map, providing a seamless integration between data processing and frontend visualization. This API serves as the backend data processor and handler for requests coming from the frontend application.

#### How It Works

The data is loaded as usual from the `/data` directory by api/api.R. This script handles all the necessary data transformations to prepare it for use by the frontend. The server.R creates an API endpoint so the processed data can be served on demand to populate the map.

#### Updating the data

Currently the data is still managed manually by the csv `/data`. To update it, upload the latest CSV. Eventually we can store this data in a database, and provide API endpoints which allow new data to be added on a case by case basis, rather than overwriting the whole file.

### Running the API

To start the API server, execute the following command from the terminal, ensuring you are in the root directory of the project:

`Rscript api/server.R`
