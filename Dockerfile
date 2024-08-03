# Use the official R Shiny image as the base image
FROM rocker/shiny:4.2.0

# Install additional system dependencies for R packages
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libxml2-dev \
    libssl-dev \
    && apt-get clean

# Install R packages 
RUN R -e "install.packages(c('shiny', 'tidyverse', 'leaflet'))"

# Copy the app files into the Docker image
COPY app.R /srv/shiny-server/
COPY www/style.css /srv/shiny-server/www/
COPY data/ /srv/shiny-server/data/

# Expose the port for the Shiny app
EXPOSE 3838

# Run the Shiny server
CMD ["/usr/bin/shiny-server"]
