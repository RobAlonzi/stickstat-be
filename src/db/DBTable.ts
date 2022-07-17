abstract class DBTable<T> {
  upsert: () => Promise<T>;
  find: () => Promise<T | undefined>;
  insert: () => Promise<T>;
  needsUpdate: (item: T) => boolean;
  update: () => Promise<T | void>;
}

export default DBTable;