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

interface Props {
  fullname: string;
  level: string;
  language: string;
  imgSrc: string;
  role: string;
  workplace: string;
}

export default function DeveloperInformation({
  fullname,
  level,
  language,
  imgSrc,
  role,
  workplace,
}: Props) {
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
            <CardTitle>{fullname}</CardTitle>
            <CardDescription>
              {level} {language} Developer
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <Avatar className="h-[160px] w-full self-center rounded-3xl">
              <AvatarImage src={imgSrc} className="object-cover" />
            </Avatar>
          </CardContent>
          <CardFooter className="flex-col items-end">
            <CardDescription className="text-right">{role}</CardDescription>
            <CardDescription className="text-right">
              Used to work at {workplace}
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="detailview" className="w-full">
        <Card className="w-[300px] hover:cursor-pointer">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Expertise in Javascript</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <CardTitle className="text-lg">Fullstack developer</CardTitle>
            <ul className="list-disc">
              <li className="text-sm">
                Working as a software engineer for 10+ years
              </li>
              <li className="text-sm">
                Working as a software engineer for 10+ years
              </li>
              <li className="text-sm">
                Working as a software engineer for 10+ years
              </li>
              <li className="text-sm">
                Working as a software engineer for 10+ years
              </li>
            </ul>
          </CardContent>
          <CardContent className="flex flex-col justify-center">
            <CardTitle className="text-lg">Fullstack developer</CardTitle>
            <ul className="list-disc">
              <li className="text-sm">
                Working as a software engineer for 10+ years
              </li>
              <li className="text-sm">
                Working as a software engineer for 10+ years
              </li>
              <li className="text-sm">
                Working as a software engineer for 10+ years
              </li>
              <li className="text-sm">
                Working as a software engineer for 10+ years
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex-col items-end">
            <CardDescription className="text-right">{role}</CardDescription>
            <CardDescription className="text-right">
              Used to work at {workplace}
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
