import type { CSSProperties, ComponentType, ReactNode } from "react";

import "./reactGlobal";
import "./_ds_bundle.js";

type AmbientBackgroundProps = {
  color?: string;
  base?: string;
  style?: CSSProperties;
};

type ButtonProps = {
  children?: ReactNode;
  tone?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "pill" | "field";
  block?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
};

type ProgressBarProps = {
  label?: ReactNode;
  value?: number;
  display?: ReactNode;
  tone?: "accent" | "muted";
  height?: number;
  style?: CSSProperties;
};

type SearchFieldProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxWidth?: number;
  style?: CSSProperties;
};

type DesignSystem = {
  AmbientBackground: ComponentType<AmbientBackgroundProps>;
  Button: ComponentType<ButtonProps>;
  ProgressBar: ComponentType<ProgressBarProps>;
  SearchField: ComponentType<SearchFieldProps>;
  __errors?: { path: string; error: string }[];
};

export const ds = (globalThis as unknown as Record<string, DesignSystem>)
  .AutoSolutionsOSDesignSystem_884ce0;

export const AmbientBackground = ds.AmbientBackground;
export const ProgressBar = ds.ProgressBar;
