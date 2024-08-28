FROM rocker/r-ver:4.3.1

RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

RUN R -e "install.packages(c('plumber', 'tidyverse', 'testthat', 'httr', 'jsonlite'))"

WORKDIR /app

EXPOSE 8000

CMD ["Rscript", "app/api/tests/run-tests.R"]
