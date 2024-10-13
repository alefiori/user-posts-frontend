import { MENU } from "@/lib/constants"
import { FC } from "react"
import { Link } from "react-router-dom"
import { LogoutIcon } from "./logoutIcon"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { H3 } from "./ui/typography"

type Props = {
  onLogout: () => void
}

export const Header: FC<Props> = ({ onLogout }) => {
  return (
    <header className="w-full flex justify-between items-center py-4 px-2 bg-blue-100 rounded-xl">
      <Link to="/">
        <H3>📝 Diary</H3>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {MENU.map(
            ({ path, name }, index) =>
              window.location.pathname !== path && (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to={path}>{name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
          )}
          <NavigationMenuItem>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} cursor-pointer`}
              title="Logout"
              onClick={onLogout}
            >
              <LogoutIcon />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
