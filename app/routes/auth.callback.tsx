// routes/auth/callback.tsx
import { LoaderFunction, redirect } from "@remix-run/node";
import { exchangeGoogleCodeForTokens, getGoogleUserInfo } from "~/data/userApi";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    throw new Error("No authorization code found");
  }

  // Exchange code for tokens
  const tokenData = await exchangeGoogleCodeForTokens(code);

  if (tokenData.error) {
    console.error("Error exchanging code:", tokenData.error);
    return redirect("/login?error=GoogleLoginFailed");
  }

  // Get user info using the access token
  const userInfo = await getGoogleUserInfo(tokenData.access_token);

  if (userInfo.error) {
    console.error("Error fetching user info:", userInfo.error);
    return redirect("/login?error=GoogleUserFetchFailed");
  }

  // Handle user session (e.g., create session, store tokens, etc.)
  // Example: Save user info to session or redirect
  console.log("Google user info:", userInfo);

  return redirect("/dashboard"); // Redirect to a protected route after successful login
};
