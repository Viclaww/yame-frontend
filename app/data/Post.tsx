import { isAxiosError } from "axios";
import baseConfig from "./apiConfig";

export const getPosts = async () => {
  try {
    const { data } = await baseConfig.get("post");
    console.log("Get posts data:", data);
    return data.toReversed();
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Server responded with a status other than 2xx
      console.error("Login error response:");
      return {
        data: { error: error.response.data.error || "Signin failed" },
      }; // Return the error response data
    } else if (isAxiosError(error) && error.request) {
      // No response was received from the server
      console.error("Login error request:", error);
      return { error: "No response from the server." };
    } else {
      // Something went wrong in setting up the request
      const errorMessage = (error as Error).message;
      console.error("error message:", errorMessage);
      return { error: "An unexpected error occurred." };
    }
  }
};

export const getPostById = async (id: number) => {
  try {
    const { data } = await baseConfig.get(`post/${id}`);
    console.log("Get post data:", data);
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

export const createPost = async (body: unknown) => {
  try {
    console.log("body", body);
    const response = await fetch(`https://hackathon-pr.onrender.com/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("response", response);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Create post error response:", errorData);
      return {
        error: errorData.error || "Create post failed",
      };
    }

    const data = await response.json();
    console.log("Create post data:", data);
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error or request was blocked
      console.error("Create post error request:", error.message);
      return { error: "No response from the server." };
    } else {
      // Something went wrong in setting up the request
      const errorMessage = (error as Error).message;
      console.error("Create post error message:", errorMessage);
      return { error: "An unexpected error occurred." };
    }
  }
};
