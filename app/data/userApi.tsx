// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      "https://hackathon-pr.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.error || "Signin failed");
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: (error as Error).message || "An unexpected error occurred.",
    };
  }
};

// Register function
export const register = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await fetch(
      "https://hackathon-pr.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: (error as Error).message || "An unexpected error occurred.",
    };
  }
};

// Get user function
export const getUser = async () => {
  try {
    const response = await fetch("https://hackathon-pr.onrender.com/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Signin failed");
    }
    return data;
  } catch (error) {
    console.error("Get user error:", error);
    return {
      error: (error as Error).message || "An unexpected error occurred.",
    };
  }
};

export const LoginWithGoogle = () => {
  const googleClientId = process.env.VITE_CLIENT_ID; // Google OAuth Client ID
  const googleRedirectUri = process.env.VITE_REDIRECT_URL; // Your app's redirect URI
  const googleAuthEndpoint = "https://accounts.google.com/o/oauth2/auth";
  const scope = "email profile"; // Request email and profile from Google
  const responseType = "code";
  const state = "some_state"; // You can customize this if needed

  const googleLoginUrl = `${googleAuthEndpoint}?response_type=${responseType}&client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&scope=${encodeURIComponent(
    scope
  )}&state=${state}`;

  // Redirect the user to Google for login
  window.location.href = googleLoginUrl;
};

export const exchangeGoogleCodeForTokens = async (code: string) => {
  const tokenEndpoint = "https://oauth2.googleapis.com/token";

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.VITE_CLIENT_ID || "",
        client_secret: process.env.VITE_CLIENT_SECRET || "",
        redirect_uri: process.env.VITE_REDIRECT_URL || "",
        grant_type: "authorization_code",
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to exchange code for tokens");
    }

    return data; // This will include access_token, id_token, etc.
  } catch (error) {
    console.error("Token exchange error:", error);
    return {
      error: "Failed to exchange code for tokens.",
    };
  }
};

export const getGoogleUserInfo = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch user info from Google");
    }

    return data; // This will include user data like email, name, etc.
  } catch (error) {
    console.error("Failed to get Google user info:", error);
    return {
      error: "Failed to get user info from Google.",
    };
  }
};
