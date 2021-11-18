import React, { useContext } from "react";
import { Button } from "rsuite";
import { UserContext } from "../../context/UserContext";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  >*{
  font-size: 1.5rem;
  padding:1em;
  }
`;
const Text = styled.p`
`;
const AuthButtons = () => {
  const { login, signout, currentUser, canUserEdit } = useContext(UserContext);

  const getFunction = () => {
    return currentUser ? signout : login;
  };
  const getText = () => {
    return currentUser ? "WYLOGUJ SIĘ" : "ZALOGUJ SIĘ";
  };
  return (
    <Wrap>
      <Button size="lg" onClick={getFunction()}>
        {getText()}
      </Button>
      <Text>{canUserEdit ? "Możesz edytować" : "Nie możesz edytować"}</Text>
    </Wrap>
  );
};

export default AuthButtons;
