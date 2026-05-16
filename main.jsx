import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./styles.css";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="startupError">
          <h1>SMART CHEF</h1>
          <p>The app could not start because of this browser error:</p>
          <pre>{this.state.error.message}</pre>
          <button
            onClick={() => {
              localStorage.removeItem("smartChefUser");
              localStorage.removeItem("smartChefToken");
              window.location.reload();
            }}
          >
            Clear saved login and reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const app = (
  <AppErrorBoundary>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AppErrorBoundary>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {googleClientId ? <GoogleOAuthProvider clientId={googleClientId}>{app}</GoogleOAuthProvider> : app}
  </React.StrictMode>
);
