import "./App.css";
import BasicTable from "./components/ui-part/BasicTable";
import DeveloperHome from "./components/pages/DeveloperHome";

function App() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="h-24 w-24"></div>
      <DeveloperHome />
      <div className="h-24 w-24"></div>
      <BasicTable />
      <div className="h-24 w-24"></div>
    </div>
  );
}

export default App;
