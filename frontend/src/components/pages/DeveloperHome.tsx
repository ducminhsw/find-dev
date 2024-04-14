import { useState } from "react";
import DeveloperFormContent from "../organisms/developer/DeveloperFormContent";
import DeveloperInformation from "../organisms/developer/DeveloperInformation";
import DeveloperNavbar from "../organisms/developer/DeveloperNavbar";
import DeveloperTemplate from "../templates/DeveloperTemplate";
import { FaceImage } from "@/assets";

export default function DeveloperHome() {
  const [navline, setNavline] = useState<number>(0);

  const navbar = (
    <DeveloperNavbar navline={navline} onChangeLine={setNavline} />
  );
  const content = <DeveloperFormContent />;
  const addition = (
    <DeveloperInformation
      fullname={"Roronoa Zoro"}
      level={"Senior"}
      language={"Javascript"}
      imgSrc={FaceImage}
      role={"Backend Developer"}
      workplace={"FPT Software"}
    />
  );
  return (
    <DeveloperTemplate navbar={navbar} content={content} addition={addition} />
  );
}
