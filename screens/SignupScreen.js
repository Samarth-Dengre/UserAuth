import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../utils/auth";

function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signUpHandler(data) {
    setLoading(true);
    try {
      const token = await createUser(data.email, data.password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Error signing in", "Please try again");
      setLoading(false);
    }
  }

  if (loading) return <LoadingOverlay message="Creating User..." />;
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
