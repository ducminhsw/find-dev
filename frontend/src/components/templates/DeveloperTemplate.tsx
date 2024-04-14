import { Label } from "../ui/label";

interface Props {
  navbar: JSX.Element;
  content: JSX.Element;
  addition: JSX.Element;
}

export default function DeveloperTemplate({
  navbar,
  content,
  addition,
}: Props) {
  return (
    <div className="w-[1260px] flex space-x-2">
      <div className="flex-1">
        <Label className="text-xl">Tabs</Label>
        {navbar}
      </div>
      <div className="flex-[4]">
        <Label className="text-xl">Content</Label>
        {content}
      </div>
      <div className="flex-1">
        <Label className="text-xl">Addition</Label>
        {addition}
      </div>
    </div>
  );
}
