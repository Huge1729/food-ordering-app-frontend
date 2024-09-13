import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// this page securly send the request to server only if user is logged in 
const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0(); // gives correct logged in user
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);
  // it hodes the state and doest not trigger the componts render

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;