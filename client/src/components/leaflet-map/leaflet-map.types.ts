export const gradeMap: Record<number, Grade> = {
  1: { color: "#7CADCD", label: "Excellent" },
  2: { color: "#366F95", label: "Good" },
  3: { color: "#CAB717", label: "Sufficient" },
  4: { color: "#9A6F3C", label: "Poor" },
};

export const specimenNameMap: Record<Specimen, string> = {
  NFP_EC: "E. coli",
  NFP_ENT: "Enterococcus",
};

export interface Grade {
  color: string;
  label: "Excellent" | "Good" | "Sufficient" | "Poor";
}

export interface DataSample {
  siteID?: string;
  latitude?: number;
  longitude?: number;
  N?: number;
  color?: number;
  value?: number;
}

export const specimen = ["NFP_ENT", "NFP_EC"] as const
export type Specimen = typeof specimen[number];

export type CompleteDataSample = Required<DataSample>;

export const isCompleteDataSample = (data: DataSample): data is CompleteDataSample => {
  return (
    "siteID" in data &&
    "latitude" in data &&
    "longitude" in data &&
    "N" in data &&
    "color" in data &&
    "value" in data
  );
};
