import { type ClassValue, clsx } from "clsx";
import { ImageLoaderProps } from "next/image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 20}`;
};

export function EvertaleReduce(data: string[], document: Record<string, any>, docProps: string, imageProps: string, nameProps: string, limit: number) {
  const result = data.reduce(
    (result, d) => {
      result[d.toLowerCase()] = propSplitFilter(document, docProps, d)
        .slice(0, limit)
        .map((d: any) => ({
          id: d._id,
          image: propSplit(d, imageProps),
          name: propSplit(d, nameProps),
        }));
      return result;
    },
    {} as Record<string, any>
  );

  return result;
}

function propSplitFilter(doc: Record<string, any>, docProps: string, value: string) {
  const docPropsPath = docProps.split(".");

  const filtered = doc.filter((d: any) => {
    for (const path of docPropsPath) {
      if (d[path] === undefined) {
        return false;
      }

      d = d[path];
    }
    return d === value;
  });

  return filtered;
}

function propSplit(document: Record<string, any>, documentProps: string) {
  const pathes = documentProps.split(".");

  let result = document;

  for (const path of pathes) {
    if (result[path] === undefined) {
      return undefined;
    }

    result = result[path];
  }

  return result;
}
