import React, { useContext } from "react";
import { Button } from "rsuite";
import { UserContext } from "../../context/UserContext";

const LoginButton = () => {
  const { login, signout } = useContext(UserContext);

  return (
    <div>
      <Button onClick={login}>in</Button>
      <Button onClick={signout}>out</Button>
    </div>
  );
};

export default LoginButton;
