export const fetcher = async (
  input: RequestInfo | URL,
  apiURL: string,
  init?: RequestInit | undefined
) => {
  try {
    const response = await fetch(`${apiURL}${input}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || errorMessage;
      } catch (e) {
        console.log("error:", e);
      }

      throw {
        status: response.status,
        statusCode: response.status,
        message: errorMessage,
      };
    }

    return await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    } else {
      throw {
        status: 500,
        statusCode: 500,
        message: `Network error: ${error?.message}`,
      };
    }
  }
};
