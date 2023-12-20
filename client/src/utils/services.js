export const baseUrl = "http://localhost:8080/api/v1/";

export const postRequest = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
