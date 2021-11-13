import { useEffect, useState } from "react";
import {
  Form,
  RadioGroup,
  Radio,
  ButtonToolbar,
  Button,
  Uploader,
  InputNumber,
} from "rsuite";
import { BaseItem } from "../../const/types";
import styled from "styled-components";
import { updateDb } from "../../firebase/fetch";
import FileInput from "../FileInput";
const defaultFormValue: BaseItem = {
  location: "PP",
  category: "odzysk",
  name: "Płyta główna",
  description: "płyta główna awz200",
  count: 1,
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
  flex-direction: row;
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
const MyForm = () => {
  const [formValue, setFormValue] = useState<any>(defaultFormValue);
  const [files, setFiles] = useState<any>([]);
  useEffect(() => {
    console.log(formValue);
  }, [formValue]);
  useEffect(() => {
    console.log(files);
  }, [files]);
  return (
    <MegaWrap>
      {JSON.stringify(files)}
      <Wrap>
        <Form
          formValue={formValue}
          onChange={(formValue) => setFormValue(formValue)}
          style={{ padding: "1rem" }}
        >
          <Form.Group controlId="name">
            <Form.ControlLabel>Nazwa:</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group controlId="count">
            <Form.ControlLabel>Ilosc </Form.ControlLabel>
            <Form.Control name="count" accepter={InputNumber} />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.ControlLabel>Opis:(musi byc unikalny)</Form.ControlLabel>
            <Form.Control name="description" />
          </Form.Group>
        </Form>

        <Form
          formValue={formValue}
          onChange={(formValue) => setFormValue(formValue)}
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
        <Form
          formValue={formValue}
          onChange={(formValue) => setFormValue(formValue)}
          style={{ padding: "1rem" }}
        >
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
          Clear form data
        </Button>
        <Button onClick={() => updateDb(formValue,files)}>Upload</Button>
      </ButtonToolbar>
    </MegaWrap>
  );
};
export default MyForm;

/* <Form.Group controlId="checkbox">
<Form.ControlLabel>Checkbox:</Form.ControlLabel>
<Form.Control name="checkbox" accepter={CheckboxGroup} inline>
  <Checkbox value="Node.js">Node.js</Checkbox>
  <Checkbox value="Webpack">Webpack</Checkbox>
  <Checkbox value="CSS3">CSS3</Checkbox>
  <Checkbox value="Javascript">Javascript</Checkbox>
  <Checkbox value="HTML5">HTML5</Checkbox>
</Form.Control>
</Form.Group> */
