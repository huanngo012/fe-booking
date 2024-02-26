import { DataGridProps, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { ReactNode } from "react";

export interface CustomDataGridProps {
  pageSize?: number;
  totalRow?: number;
  rows?: GridRowsProp;
  columns?: GridColDef[];
  page?: number;
  setPage?: any;
  slots?: DataGridProps["slots"];

  headerComponent?: ReactNode;
  showPagination?: boolean;
  explainName?: string;
}

export interface EmptyPageProps {
  title?: string;
  message?: string;
}

export interface CustomSelectProps {
  placeholder?: string;
  value?: string;
  setValue?: any;
  nameKey?: any;
  options?: any;
  disabled?: boolean;
  color?: string;
}

export interface SkeletonProps {
  customKey: string;
}

export interface CustomSkeletonProps {
  customKey: string;
  variant:
    | "card-search"
    | "card-hospital-section"
    | "card-hospital"
    | "card-doctor"
    | "card-schedule"
    | "card-patient"
    | "card-project"
    | "card-device-health"
    | "card-error"
    | "card-notify"
    | "card-notify-popup";
}
