import { InputForm } from "./components/ui-part/BasicForm";

import "./App.css";
import { FaceImage } from "./assets";

import BasicCard from "./components/ui-part/BasicCard";
import BasicNavbar from "./components/ui-part/BasicNavbar";
import BasicTable from "./components/ui-part/BasicTable";
import DeveloperHome from "./components/pages/DeveloperHome";

function App() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="h-24 w-24"></div>
      <BasicTable />
      <div className="h-24 w-24"></div>
      <InputForm />
      <div className="h-24 w-24"></div>
      <BasicCard
        fullname={"Roronoa Zoro"}
        level={"Senior"}
        language={"Javascript"}
        imgSrc={FaceImage}
        role={"Backend Developer"}
        workplace={"FPT Software"}
      />
      <div className="h-24 w-24"></div>
      <BasicNavbar />
      <div className="h-24 w-24"></div>
      <DeveloperHome />
      <div className="h-24 w-24"></div>
    </div>
  );
}

export default App;
