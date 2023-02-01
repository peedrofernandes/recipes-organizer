export type Id = string;

export const hasId = (obj: any): obj is { id: Id } => {
  return ("id" in obj && typeof obj.id === "string");
}