import { useMemo, useRef, useState } from "react";
import DeveloperFormContent from "../organisms/developer/DeveloperFormContent";
import DeveloperInformation from "../organisms/developer/DeveloperInformation";
import DeveloperNavbar from "../organisms/developer/DeveloperNavbar";
import DeveloperTemplate from "../templates/DeveloperTemplate";
import {
  FormFunction,
  FormModel,
  InforFunction,
} from "../organisms/developer/DeveloperModels";
import { FaceImage } from "@/assets";

export default function DeveloperHome() {
  const [navline, setNavline] = useState<number>(0);

  const formRef = useRef<FormFunction>(null);
  const infoRef = useRef<InforFunction>(null);

  const defaultFormValues: FormModel = useMemo(
    () => ({
      email: "ducminhsw721@gmail.com",
      username: "ducminhsw",
      firstname: "Minh",
      lastname: "Nguyen",
      avatarlink: FaceImage,
      objective: "",
      mainSkill: {
        name: "Javascript",
        level: "Senior",
      },
      otherSkills: [
        {
          name: "Golang",
          level: "Junior",
        },
      ],
      experience: [
        {
          company: "FPT Software",
          work: "ReactJS Developer",
          years: 2,
        },
      ],
      projects: [
        {
          duration: "2023-01-01",
          name: "Streaming media web application",
          purpose:
            "Trying to create a new streamming app with better resolution of the output video with lower price.",
          techstack: "Golang, NodeJS, ReactJS, MongoDB, DynamoDB, Cassandra",
        },
      ],
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
