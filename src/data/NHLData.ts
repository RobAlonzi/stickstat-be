abstract class NHLData<T> {
  fetch: () => Promise<T> ;
}

export default NHLData;