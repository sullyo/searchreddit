import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function oneLine(strings: TemplateStringsArray, ...values: any[]) {
  let output = "";
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];
  return output.replace(/\s*\n\s*/g, " ").trim();
}
