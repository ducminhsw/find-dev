import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefObject, useEffect, useImperativeHandle, useState } from "react";
import { FormFunction, FormModel, InforFunction } from "./DeveloperModels";

interface Props {
  defaultFormValues: any;
  mainRole: string;
  mainWorkplace: string;
  formRef: RefObject<FormFunction>;
  infoRef: RefObject<InforFunction>;
}

export default function DeveloperInformation({
  defaultFormValues,
  mainRole,
  mainWorkplace,
  formRef,
  infoRef,
}: Props) {
  const [formFields, setFormFields] = useState<FormModel>();

  const handleSetPreview = () => {
    const values = formRef.current?.getFormValues() || ({} as FormModel);
    setFormFields(values);
  };

  useImperativeHandle(infoRef, () => ({
    handleSetPreview,
  }));

  useEffect(() => {
    setFormFields(defaultFormValues);
  }, []);

  return (
    <Tabs
      defaultValue="overview"
      className="max-h-[750px] overflow-auto w-[300px]"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="techstack">Technology</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="w-full">
        <Card className="w-[300px] hover:cursor-pointer">
          <CardHeader>
            <CardTitle>
              {formFields?.firstname} {formFields?.lastname}
            </CardTitle>
            <CardDescription>
              {formFields?.mainSkill.level} {formFields?.mainSkill.name}{" "}
              Developer
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <Avatar className="h-[160px] w-full self-center rounded-3xl">
              <AvatarImage
                src={formFields?.avatarlink}
                className="object-cover"
              />
            </Avatar>
          </CardContent>
          <CardFooter className="flex-col items-end">
            <CardDescription className="text-right">{mainRole}</CardDescription>
            <CardDescription className="text-right">
              Used to work at {mainWorkplace}
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="experience" className="w-full">
        <Card className="w-[300px] hover:cursor-pointer">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>
              Expertise in {formFields?.mainSkill.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <CardTitle className="text-lg">Company's Name</CardTitle>
            <CardDescription>Job Role</CardDescription>
            {formFields?.projects.map((project, index) => {
              return (
                <div key={index} className="text-sm">
                  <ul className="list-disc list-inside">
                    <li className="list-item">
                      <span className="font-semibold">Duration:</span>{" "}
                      {project.duration}
                    </li>
                    <li className="list-item">
                      <span className="font-semibold">Project Name:</span>{" "}
                      {project.name}
                    </li>
                    <li className="list-item">
                      <span className="font-semibold">Purpose:</span>{" "}
                      {project.purpose}
                    </li>
                    <li className="list-item">
                      <span className="font-semibold">Techstack:</span>{" "}
                      {project.techstack}
                    </li>
                  </ul>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="techstack" className="w-full">
        <Card className="w-[300px] hover:cursor-pointer">
          <CardHeader>
            <CardTitle>Technology</CardTitle>
            <CardDescription>About my technical knowledge</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <CardTitle className="text-lg">Programming Language</CardTitle>
            <CardTitle className="text-lg">Version Controll tools</CardTitle>
            <CardTitle className="text-lg">Side Skills</CardTitle>
            <CardTitle className="text-lg">Interest</CardTitle>
          </CardContent>
          <CardFooter className="flex-col items-end"></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
