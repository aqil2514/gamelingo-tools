import { type ClassValue, clsx } from "clsx";
import { ImageLoaderProps } from "next/image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 20}`;
};

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

export const evertale = {
  mapping: (data: Record<string, any>, value: string[] | string, limit: number, path: string, type: "chars" | "weapon", included: boolean = false, randomIndex: boolean = false) => {
    const random = value.length > 0 ? Math.floor(Math.random() * value.length) : 0;
    value = randomIndex ? value[random] : value;

    let pathes = path.split(".");
    let filtered;

    if (typeof value === "string") {
      const stringValue = value as string;
      filtered = included ? data.filter((d: any) => d[pathes[0]][pathes[1]].includes(stringValue)) : data.filter((d: any) => d[pathes[0]][pathes[1]].toLowerCase() === stringValue.toLowerCase());
    } else {
      filtered = data;
    }

    const result = filtered.slice(0, limit).map((d: any) => {
      if (type === "chars")
        return {
          id: d._id,
          image: d.charImage.f1Img,
          name: d.charStatus.charName,
        };
    });

    return result;
  },
  simpleMapping: (document: Record<string, any>, type: "chars" | "weapons", limit: number = 0) => {
    const result = (limit !== 0 ? document.slice(0, limit) : document).map((d: any) => {
      if (type === "chars") return { id: d._id, name: d.charStatus.charName, image: d.charImage.f1Img };
      if (type === "weapons") return { id: d._id, name: d.weapName, image: d.weapImage.webp };
    });

    return result;
  },
  simpleFilter: (document: Record<string, any>, path: string, value: string) => {
    const result = document.filter((d: any) => d[path] === value);

    return result;
  },
  filter: (document: Record<string, any>, parentPath: string, childPath?: string, secondChildPath?: string, included: boolean = false, value?: string) => {
    let result;
    if (included) {
      result = document.filter((doc: any) => (childPath ? doc[parentPath][childPath] : doc[parentPath]).includes(value));
    } else if (secondChildPath && childPath) {
      result = document.filter((doc: any) => doc[parentPath][childPath] === value || doc[parentPath][secondChildPath] === value);
    } else {
      result = document.filter((doc: any) => (childPath ? doc[parentPath][childPath] : doc[parentPath]) === value);
    }

    return result;
  },
  reduce: (data: string[], document: Record<string, any>, type: string, included: boolean, parentPath: string, childPath?: string, limit?: number, secondChildPath?: string) => {
    const result = data.reduce(
      (result, d) => {
        result[d.toLowerCase()] = evertale
          .filter(document, parentPath, childPath, secondChildPath, included, d)
          .slice(0, limit)
          .map((d: any) => {
            if (type === "chars") return { id: d._id, name: d.charStatus.charName, image: d.charImage.f1Img };
            if (type === "weapons") return { id: d._id, name: d.weapName, image: d.weapImage.webp };
          });
        return result;
      },
      {} as Record<string, any>
    );

    return result;
  },
};
