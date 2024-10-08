// In your component (e.g., `Login.tsx`)
export const LoginWithGoogle = () => {
  const googleClientId = import.meta.env.VITE_CLIENT_ID; // Google OAuth Client ID
  const googleRedirectUri = "http://localhost:5173/auth/callback";
  const googleAuthEndpoint = "https://accounts.google.com/o/oauth2/auth";
  const scope = "email profile"; // Request email and profile from Google
  const responseType = "code";
  const state = "some_state"; // Customize this as needed

  const googleLoginUrl = `${googleAuthEndpoint}?response_type=${responseType}&client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&scope=${encodeURIComponent(
    scope
  )}&state=${state}`;
  console.log(googleLoginUrl);
  return (
    <button onClick={() => (window.location.href = googleLoginUrl)}>
      Sign in with Google
    </button>
  );
};
