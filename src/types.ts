export interface Bookmark {
  date_added?: string;
  date_last_used?: string;
  guid?: string;
  id: string;
  name?: string;
  // type: "url" | "folder";
  type: string;
  children?: Bookmark[];
  url?: string;
};