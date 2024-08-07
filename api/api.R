library(plumber)
library(tidyverse)

# Load and process the data
raw_WQ <- read.csv("../data/DataCollectionForm - WQ data(1).csv")

markers_WQ <- raw_WQ %>%
  group_by(siteID) %>%
  summarise(
    N = n(),
    latitude = latitude..xx.xxxxxx.,
    longitude = longitude..x.xxxxxx.,
    NFP_EC = round(quantile(as.numeric(E.coli), 0.95, na.rm = T), 0),
    NC_EC = sum(str_count(E.coli, "NC")),
    NFP_ENT = round(quantile(as.numeric(entericEnterococci), 0.95, na.rm = T), 0),
    NC_ENT = sum(str_count(entericEnterococci, "NC"))
  ) %>%
  distinct(siteID, .keep_all = TRUE)

ENTbreaks <- c(-1, 100, 185, 200, 100000)
ECbreaks <- c(-1, 250, 400, 500, 100000)
ccolors <- c("#7CADCD", "#366F95", "#CAB717", "#9A6F3C")

#* @apiTitle Water Quality API

#* Get processed water quality data
#* @param parameter The parameter to filter by (e.g., NFP_ENT or NFP_EC)
#* @get /data
function(parameter = "NFP_ENT") {
  if (!parameter %in% c("NFP_ENT", "NFP_EC")) {
    return(list(error = "Invalid parameter"))
  }

  data <- markers_WQ %>%
    mutate(
      color = ifelse(
        parameter == "NFP_ENT",
        cut(NFP_ENT, breaks = ENTbreaks, labels = ccolors),
        cut(NFP_EC, breaks = ECbreaks, labels = ccolors)
      )
    ) %>%
    select(siteID, latitude, longitude, N, color, parameter)

  return(data)
}
