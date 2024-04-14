import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export default function BasicNavbar() {
  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList className="flex-col items-start space-x-0">
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-[0px]">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Statistic
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-0">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Projects
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
