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

export interface BaseDataSample {
  siteID?: string;
  latitude?: number;
  longitude?: number;
  N?: number;
  color?: number;
}

export type Specimen = "NFP_ENT" | "NFP_EC";

export type DataWithSpecimen<T extends Specimen> = {
  [K in T]: { [P in K]: number } & BaseDataSample;
}[T];

export type NFP_ENT = DataWithSpecimen<"NFP_ENT">;
export type NFP_EC = DataWithSpecimen<"NFP_EC">;

export type DataSample = NFP_ENT | NFP_EC;
export type CompleteDataSample = Required<DataSample>;

export const isENTData = (data: DataSample): data is NFP_ENT => {
  return "NFP_ENT" in data;
};

export const isECData = (data: DataSample): data is NFP_EC => {
  return "NFP_EC" in data;
};
