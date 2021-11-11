abstract class DBTable<T> {
  upsert: () => Promise<T>;
  
}

export default DBTable;