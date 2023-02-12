import { Id } from "../utilities/types/Id"

export interface IRepository<T> {
  find(id: Id): Promise<T>;
  findAll(): Promise<T[]>;
  create(t: T): Promise<void>;
  createList(t: T[]): Promise<void>;
  update(t: T): Promise<void>;
  delete(id: Id): Promise<void>;
  load(source: unknown): Promise<T[]>;
}