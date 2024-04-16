import { RefObject, useEffect, useImperativeHandle, useState } from "react";

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
import { FormFunction, FormModel, InforFunction } from "./DeveloperModels";

interface Props {
  defaultFormValues: any;
  formRef: RefObject<FormFunction>;
  infoRef: RefObject<InforFunction>;
}

export default function DeveloperInformation({
  defaultFormValues,
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
              {formFields?.languages[0].level} {formFields?.languages[0].name}{" "}
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
            <CardDescription className="text-right">
              {formFields?.experience[0].role}
            </CardDescription>
            <CardDescription className="text-right">
              Used to work at {formFields?.experience[0].company}
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="experience" className="w-full">
        <Card className="w-[300px] hover:cursor-pointer">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>
              Expertise in {formFields?.languages[0].name}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <CardTitle className="text-lg">
              {formFields?.experience[0].company}
            </CardTitle>
            <CardDescription>{formFields?.experience[0].role}</CardDescription>
            {formFields?.experience.map((detail, index) => {
              return (
                <div key={index} className="text-sm">
                  <ul className="list-disc list-inside">
                    <li className="list-item">
                      <span className="font-semibold">Duration:</span>{" "}
                      {detail.work.duration}
                    </li>
                    <li className="list-item">
                      <span className="font-semibold">Project Name:</span>{" "}
                      {detail.work.name}
                    </li>
                    <li className="list-item">
                      <span className="font-semibold">Purpose:</span>{" "}
                      {detail.work.purpose}
                    </li>
                    <li className="list-item">
                      <span className="font-semibold">Techstack:</span>{" "}
                      {detail.work.techstack}
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
            <CardTitle className="text-lg">
              Programming Language:{" "}
              <CardDescription className="font-medium">
                {formFields?.languages
                  .map((language) => language.name)
                  .join(", ")}
              </CardDescription>
            </CardTitle>
            <CardTitle className="text-lg">
              Version Controll tools:
              <CardDescription>{formFields?.tools.join(", ")}</CardDescription>
            </CardTitle>
            <CardTitle className="text-lg">
              Side Skills:
              <CardDescription>
                {formFields?.languages
                  .map((language) => language.name)
                  .join(", ")}
              </CardDescription>
            </CardTitle>
            <CardTitle className="text-lg">
              Interest:
              <CardDescription>
                {formFields?.interests.join(", ")}
              </CardDescription>
            </CardTitle>
          </CardContent>
          <CardFooter className="flex-col items-end"></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
