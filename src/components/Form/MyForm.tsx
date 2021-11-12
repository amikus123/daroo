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
import { FormItem } from "../../const/types";
import styled from "styled-components";
const defaultFormValue: FormItem = {
  location: "PP",
  category: "odzysk",
  name: "Płyta główna",
  description: "płyta główna awz200",
  count: 1,
  images: [],
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
const MyForm = () => {
  const [formValue, setFormValue] = useState<any>(defaultFormValue);
  useEffect(() => {
    console.log(formValue);
  }, [formValue]);
  return (
    <MegaWrap>
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
            <Form.ControlLabel>Opis:</Form.ControlLabel>
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
            <Form.Group controlId="images">
              <Form.ControlLabel>Uploader:</Form.ControlLabel>
              <Form.Control name="images" accepter={Uploader} />
            </Form.Group>
          </div>
        </Form>
      </Wrap>
      <ButtonToolbar>
        <Button onClick={() => setFormValue(defaultFormValue)}>
          Clear form data
        </Button>
        <Button onClick={() => console.log(1)}>Upload</Button>
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
