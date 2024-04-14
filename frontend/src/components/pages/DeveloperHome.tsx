import { useMemo, useRef, useState } from "react";
import DeveloperFormContent from "../organisms/developer/DeveloperFormContent";
import DeveloperInformation from "../organisms/developer/DeveloperInformation";
import DeveloperNavbar from "../organisms/developer/DeveloperNavbar";
import DeveloperTemplate from "../templates/DeveloperTemplate";
import {
  FormFunction,
  InforFunction,
} from "../organisms/developer/DeveloperModels";
import { FaceImage } from "@/assets";

export default function DeveloperHome() {
  const [navline, setNavline] = useState<number>(0);

  const formRef = useRef<FormFunction>(null);
  const infoRef = useRef<InforFunction>(null);

  const defaultFormValues = useMemo(
    () => ({
      email: "ducminhsw721@gmail.com",
      username: "ducminhsw",
      firstname: "Minh",
      lastname: "Nguyen",
      avatarlink: FaceImage,
      objective: "",
      mainSkill: {},
      otherSkills: [],
      experience: [],
      projects: [],
    }),
    []
  );

  const navbar = (
    <DeveloperNavbar navline={navline} onChangeLine={setNavline} />
  );
  const content = <DeveloperFormContent formRef={formRef} infoRef={infoRef} />;
  const addition = (
    <DeveloperInformation
      defaultFormValues={defaultFormValues}
      mainRole={"Fullstack Developer"}
      mainWorkplace={"FPT Software"}
      formRef={formRef}
      infoRef={infoRef}
      {...formRef.current?.getFormValues()}
    />
  );
  return (
    <DeveloperTemplate navbar={navbar} content={content} addition={addition} />
  );
}
