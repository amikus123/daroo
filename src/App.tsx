import { CustomProvider } from "rsuite";
import "rsuite-table/dist/css/rsuite-table.css";
import MyForm from "./components/Form/MyForm";
import Home from "./components/Home";


const App = () => (
  <CustomProvider theme="light">
    <Home />
    <MyForm />
  </CustomProvider>
);

export default App;
