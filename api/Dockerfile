# Use the official R image as a base
FROM rocker/r-ver:4.4.1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libfontconfig1-dev

# Install R packages
RUN R -e "install.packages(c('plumber', 'tidyverse', 'here'))"

# Copy the necessary files into the Docker image
COPY api /app/api
COPY data /app/data

# Set the working directory
WORKDIR /app

# Expose the port the API will run on
EXPOSE 8000

# Command to run the API
CMD ["Rscript", "api/server.R"]
