import { isAxiosError } from "axios";
import baseConfig from "./apiConfig";

// Login function
export const login = async (email: string, password: string) => {
  try {
    const { data } = await baseConfig.post("auth/login", { email, password });
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
      console.error("Login error message:", errorMessage);
      return { error: "An unexpected error occurred." };
    }
  }
};

// Register function
export const register = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const { data } = await baseConfig.post("/auth/register", {
      email,
      username,
      password,
    });

    return data; // Return successful data response
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      // Server responded with a status other than 2xx
      console.error("Registration error response:", error.response.data);
      return {
        data: { error: error.response.data.error || "Registration failed" },
      }; // Return the error response data
    } else if (isAxiosError(error) && error.request) {
      // No response was received from the server
      console.error("Registration error request:", error.request);
      return { error: "No response from the server." };
    } else {
      // Something went wrong in setting up the request
      const errorMessage = (error as Error).message;
      console.error("Registration error message:", errorMessage);
      return { error: "An unexpected error occurred." };
    }
  }
};

export const getUser = async () => {
  try {
    const { data } = await baseConfig.get("user");
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
