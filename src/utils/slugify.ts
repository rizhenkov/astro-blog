import { slug as slugger } from "github-slugger";

export const slugifyStr = (str: string) => {

  return slugger(str);
};

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));
