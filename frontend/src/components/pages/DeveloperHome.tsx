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
      languages: [
        {
          name: "Golang",
          level: "Junior",
        },
      ],
      tools: ["Github", "Azure", "Jira", "Vercel", "AWS"],
      interests: ["Solving Algorithm", "Start SAAS project"],
      experience: [
        {
          company: "FPT Software",
          role: "Frontend Engineer",
          work: {
            duration: "01/2023",
            name: "Genius",
            purpose: "Create UI/UX based on client design",
            techstack: "React, HTML, styled-component",
          },
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

  const navbar = useMemo(function () {
    return <DeveloperNavbar navline={navline} onChangeLine={setNavline} />;
  }, [navline]);

  const content = useMemo(function () {
    return <DeveloperFormContent defaultFormValues={defaultFormValues} formRef={formRef} infoRef={infoRef} />;
  }, []);

  const addition = useMemo(
    function () {
      return (
        <DeveloperInformation
          defaultFormValues={defaultFormValues}
          formRef={formRef}
          infoRef={infoRef}
          {...formRef.current?.getFormValues()}
        />
      );
    },
    [defaultFormValues]
  );
  return (
    <DeveloperTemplate navbar={navbar} content={content} addition={addition} />
  );
}
