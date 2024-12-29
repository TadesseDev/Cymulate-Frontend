/** @format */

export interface Cat {
  _id?: string;
  age: number;
  name: string;
  breed: string;
}
export interface DataState {
  items: Cat[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
