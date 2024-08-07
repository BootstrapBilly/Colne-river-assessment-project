library(plumber)

r <- plumb("api/api.R")

r$run(port = 8000)
