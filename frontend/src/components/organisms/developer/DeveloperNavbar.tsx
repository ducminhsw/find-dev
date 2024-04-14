import {
  navigationMenuStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Dispatch, SetStateAction } from "react";

interface Props {
  navline: number;
  onChangeLine: Dispatch<SetStateAction<number>>;
}

export const NavbarIndex = {
  profile: 0,
  statistic: 1,
  projects: 2,
};

export default function DeveloperNavbar({ navline, onChangeLine }: Props) {
  const handleChangeNav = (index: number) => {
    return function () {
      onChangeLine(index);
    };
  };
  return (
    <NavigationMenu orientation="vertical" className="mt-3 w-full">
      <NavigationMenuList className="flex-col items-start space-x-0">
        <NavigationMenuItem
          className="w-[200px]"
          onClick={handleChangeNav(NavbarIndex.profile)}
        >
          <NavigationMenuLink
            className={`${navigationMenuStyle()} ${
              navline === NavbarIndex.profile ? "text-white bg-slate-900" : ""
            }`}
          >
            Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem
          className="w-[200px]"
          onClick={handleChangeNav(NavbarIndex.statistic)}
        >
          <NavigationMenuLink
            className={`${navigationMenuStyle()} ${
              navline === NavbarIndex.statistic ? "text-white bg-slate-900" : ""
            }`}
          >
            Statistic
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem
          className="w-[200px]"
          onClick={handleChangeNav(NavbarIndex.projects)}
        >
          <NavigationMenuLink
            className={`${navigationMenuStyle()} ${
              navline === NavbarIndex.projects ? "text-white bg-slate-900" : ""
            }`}
          >
            Projects
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
