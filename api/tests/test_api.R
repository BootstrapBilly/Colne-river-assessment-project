library(testthat)
library(httr)
library(jsonlite)

base_url <- "http://localhost:8000"

expected_siteID_Br_1 <- "Br_1"
expected_latitude_Br_1 <- 51.78945
expected_longitude_Br_1 <- 1.01551
expected_color_NFP_ENT_Br_1 <- 1
expected_value_NFP_ENT_Br_1 <- 18
expected_color_NFP_EC_Br_1 <- 1
expected_value_NFP_EC_Br_1 <- 82

test_that("NPF_ENT returns the correct data", {
  res <- GET(url = paste0(base_url, "/data?parameter=NFP_ENT"))

  expect_equal(status_code(res), 200)

  content <- fromJSON(content(res, as = "text"))

  site_data <- content[content$siteID == expected_siteID_Br_1, ]

  expect_equal(site_data$siteID, expected_siteID_Br_1)
  expect_equal(site_data$latitude, expected_latitude_Br_1, tolerance = 1e-4)
  expect_equal(site_data$longitude, expected_longitude_Br_1, tolerance = 1e-4)
  expect_equal(site_data$color, expected_color_NFP_ENT_Br_1)
  expect_equal(site_data$value, expected_value_NFP_ENT_Br_1)
})

test_that("NFP_EC returns the correct data", {
  res <- GET(url = paste0(base_url, "/data?parameter=NFP_EC"))

  expect_equal(status_code(res), 200)

  content <- fromJSON(content(res, as = "text"))

  site_data <- content[content$siteID == expected_siteID_Br_1, ]

  expect_equal(site_data$siteID, expected_siteID_Br_1)
  expect_equal(site_data$latitude, expected_latitude_Br_1, tolerance = 1e-4)
  expect_equal(site_data$longitude, expected_longitude_Br_1, tolerance = 1e-4)
  expect_equal(site_data$color, expected_color_NFP_EC_Br_1)
  expect_equal(site_data$value, expected_value_NFP_EC_Br_1)
})

test_that("An invalid param returns an error", {
  res <- GET(url = paste0(base_url, "/data?parameter=INVALID_PARAM"))

  expect_equal(status_code(res), 200)

  content <- fromJSON(content(res, as = "text"))

  expect_true("error" %in% names(content))
  expect_equal(content$error, "Invalid parameter")
})
