import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import { createUser, login } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  async function loginHandler(data) {
    setLoading(true);
    try {
      const token = await login(data.email, data.password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could Not log you in. Please try again after some time"
      );
      setLoading(false);
    }
  }
  if (loading) return <LoadingOverlay message="Validating User" />;
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
