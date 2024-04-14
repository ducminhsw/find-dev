import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  fullname: string;
  level: string;
  language: string;
  imgSrc: string;
  role: string;
  workplace: string;
}

export default function BasicCard({
  fullname,
  level,
  language,
  imgSrc,
  role,
  workplace,
}: Props) {
  return (
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
  );
}
