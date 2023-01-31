import { Attributes } from "../value-objects/Attributes";
import { Id } from "../value-objects/Id";

export interface IRepository <T> {
  find(id: Id): Promise<T>;
  create(t: T): Promise<void>;
  create(t: T[]): Promise<void>;
  update(id: Id, attributes: Attributes<T>): Promise<void>;
  delete(id: Id): Promise<void>;
  load(source: any): Promise<T[]>;
}