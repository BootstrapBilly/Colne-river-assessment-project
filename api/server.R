library(plumber)

r <- plumb("api/api.R")

r$run(host = "0.0.0.0", port = 8000)

# You can run this server from the terminal with the following command (ensure that you terminal is at the root of this project)

# Rscript api/server.R
