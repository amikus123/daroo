import { useState, useEffect } from "react";
import { CustomProvider } from "rsuite";
import "rsuite-table/dist/css/rsuite-table.css";
import MyForm from "./components/Form/MyForm";
import ImageModal from "./components/ImageModal/ImageModal";
import MyTable from "./components/Table/MyTable";
import { getAll } from "./firebase/fetch";

const App = () => {
  const [data, setData] = useState([]);
  const [imageNames, setImageNames] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAll();
      setData(res);
      console.log(res, "DOSTALEM");
    };
    fetch();
  }, []);
  return (
    <CustomProvider theme="light">
      <ImageModal imageNames={imageNames} setImageNames={setImageNames} />
      <MyTable passedData={data} setImageNames={setImageNames} />;
      <MyForm />
    </CustomProvider>
  );
};

export default App;
