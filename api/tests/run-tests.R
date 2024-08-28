args <- commandArgs(trailingOnly = FALSE)
script_dir <- dirname(normalizePath(sub("--file=", "", args[grep("--file=", args)])))

setwd(file.path(script_dir, "../.."))

library(testthat)

test_dir("api/tests")
