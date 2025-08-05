type SafeFetchResult<T> = {
    data: T | null;
    error: string | null;
  };
  
  export default async function safeFetch<T>(
    url: string,
    options?: RequestInit
  ): Promise<SafeFetchResult<T>> {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        return {
          data: null,
          error: `HTTP error! Status: ${response.status}`,
        };
      }
  
      const data: T = await response.json();
      return { data, error: null };
    } catch (err: unknown) {
      let errorMsg = 'Unknown error';
  
      if (err instanceof Error) {
        errorMsg = err.message;
      }
  
      return { data: null, error: errorMsg };
    }
  }
  