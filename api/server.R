library(plumber)

r <- plumb("api/api.R")

cors <- function(req, res) {
    res$setHeader("Access-Control-Allow-Origin", "*")
    res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res$setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    plumber::forward()
}

r$registerHook("preroute", cors)

r$run(host = "0.0.0.0", port = 8000)

# You can run this server from the terminal with the following command (ensure that you terminal is at the root of this project)

# Rscript api/server.R
