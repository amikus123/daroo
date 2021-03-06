import { useState } from "react";
import {
  Form,
  RadioGroup,
  Radio,
  ButtonToolbar,
  Button,
  InputNumber,
} from "rsuite";
import { BaseItem, PossibleColor } from "../../const/types";
import styled from "styled-components";
import FileInput from "./FileInput";
import { addItemFromForm } from "../../firebase/database/form";

const defaultFormValue: BaseItem = {
  location: "PP",
  category: "odzysk",
  name: "",
  description: "",
  count: "1",
};

const MegaWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;
const Wrap = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  justify-content: center;
  > * {
    margin: 0 1rem;
    padding: 1rem;
  }
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    padding: 1rem;
  }
`;
interface MyFormProps {
  updateSnackbar: (text: string, color: PossibleColor) => void;
  addToState: (
    itemData: BaseItem & {
      imageCount: number;
      dbId: string;
    }
  ) => void;
}
const MyForm = ({ updateSnackbar, addToState }: MyFormProps) => {
  const [formValue, setFormValue] = useState<BaseItem>(defaultFormValue);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <MegaWrap>
      <Wrap>
        <Form
          formValue={formValue}
          onChange={(newFormValue) => {
            const x = newFormValue as BaseItem;
            setFormValue(x);
          }}
          style={{ padding: "1rem" }}
        >
          <Form.Group controlId="name">
            <Form.ControlLabel>Nazwa:</Form.ControlLabel>
            <Form.Control name="name"  />
          </Form.Group>

          <Form.Group controlId="count">
            <Form.ControlLabel>Ilość:</Form.ControlLabel>
            <Form.Control name="count" accepter={InputNumber} />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.ControlLabel>Opis:</Form.ControlLabel>
            <Form.Control name="description"  />
          </Form.Group>
        </Form>

        <Form
          formValue={formValue}
          onChange={(newFormValue) => {
            const x = newFormValue as BaseItem;
            setFormValue(x);
          }}
          style={{ padding: "1rem" }}
        >
          <Form.Group controlId="location">
            <Form.ControlLabel>Lokacja:</Form.ControlLabel>
            <Form.Control name="location" accepter={RadioGroup}>
              <Radio value="PP">PP</Radio>
              <Radio value="PPZ">PPZ</Radio>
            </Form.Control>
          </Form.Group>

          <div>
            <Form.Group controlId="category">
              <Form.ControlLabel>Stan:</Form.ControlLabel>
              <Form.Control name="category" accepter={RadioGroup}>
                <Radio value="nowe">Nowe</Radio>
                <Radio value="odzysk">Odzysk</Radio>
                <Radio value="uszkodzone">Uszkodzone</Radio>
                <Radio value="sprawne">Sprawne</Radio>
              </Form.Control>
            </Form.Group>
          </div>
        </Form>
        <Form formValue={formValue} style={{ padding: "1rem" }}>
          <InputWrap>
            <FileInput value={files} onChange={setFiles} />
          </InputWrap>
        </Form>
      </Wrap>

      <ButtonToolbar>
        <Button
          onClick={() => {
            setFormValue(defaultFormValue);
            setFiles([]);
          }}
        >
          Zresetuj formularz
        </Button>
        <Button
          onClick={async () => {
            const res = await addItemFromForm(formValue, files);
            if (!res.error) {
              addToState({ ...formValue, ...res.res });
            }
            if (res.error) {
              updateSnackbar(res.text, "red");
            } else {
              updateSnackbar(res.text, "green");
              setFormValue(defaultFormValue);
            }
          }}
        >
          Dodaj przedmiot
        </Button>
      </ButtonToolbar>
    </MegaWrap>
  );
};
export default MyForm;
