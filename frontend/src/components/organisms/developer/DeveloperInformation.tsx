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
      defaultValue="cardview"
      className="max-h-[750px] overflow-auto w-[300px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cardview">Card View</TabsTrigger>
        <TabsTrigger value="detailview">Detail View</TabsTrigger>
      </TabsList>
      <TabsContent value="cardview" className="w-full">
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
      <TabsContent value="detailview" className="w-full">
        <Card className="w-[300px] hover:cursor-pointer">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>
              Expertise in {formFields?.mainSkill.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <CardTitle className="text-lg">Fullstack developer</CardTitle>
            <ul className="list-disc">
              {formFields?.projects.map((project, index) => {
                return (
                  <li key={index} className="text-sm">
                    {project.duration}
                    {project.name}
                    {project.purpose}
                    {project.techstack}
                  </li>
                );
              })}
            </ul>
          </CardContent>
          <CardContent className="flex flex-col justify-center">
            <CardTitle className="text-lg">Fullstack developer</CardTitle>
            <ul className="list-disc">
              {formFields?.otherSkills.map((skill, index) => {
                return (
                  <li key={index} className="text-sm">
                    {skill.name} {skill.level}
                  </li>
                );
              })}
            </ul>
          </CardContent>
          <CardFooter className="flex-col items-end">
            <CardDescription className="text-right">{mainRole}</CardDescription>
            <CardDescription className="text-right">
              Used to work at {mainWorkplace}
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
