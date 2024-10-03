import { isAxiosError } from "axios";
import baseConfig from "./apiConfig";

export const getPosts = async () => {
  try {
    const { data } = await baseConfig.get("post");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Server responded with a status other than 2xx
      console.error("Login error response:", error.response.data);
      return {
        data: { error: error.response.data.error || "Signin failed" },
      }; // Return the error response data
    } else if (isAxiosError(error) && error.request) {
      // No response was received from the server
      console.error("Login error request:", error.request);
      return { error: "No response from the server." };
    } else {
      // Something went wrong in setting up the request
      const errorMessage = (error as Error).message;
      console.error("error message:", errorMessage);
      return { error: "An unexpected error occurred." };
    }
  }
};
