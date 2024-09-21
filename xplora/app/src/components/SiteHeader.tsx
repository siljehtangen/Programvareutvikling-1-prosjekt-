"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import MainNav from "@/components/MainNav"
import { useAuth } from "./providers/AuthProvider"
import UserAccountNav from "./UserAccountNav"
import { useUserData } from "./providers/UserDataProvider"
import { useEffect, useState } from "react"
import AddDestinationButton from "./AddDestinationButton"
import {
  SunIcon,
  MoonIcon
} from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

export function SiteHeader() {

  const { userData, isLoading, authIsLoading } = useUserData()
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState<boolean | null>(null);

  const handleThemeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    !isDark ? setTheme("dark") : setTheme("light")
  };

  useEffect(()=>{
    setIsDark(theme === "dark")
  }, [theme])

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div>
            <Button onClick={handleThemeClick} size={"icon"} variant={"ghost"}>
              {!isDark ?
                <>
                  <MoonIcon className="h-5 w-5 fill-current" />
                </>
                :
                <>
                  <SunIcon className="h-5 w-5 fill-current" />
                </>
              }
            </Button>
          </div>
          {userData ? 
            <><Link href={"/legg-til-destinasjon"}><AddDestinationButton></AddDestinationButton></Link>
            <UserAccountNav/></>
          : <Link href={"/logg-inn"}><Button disabled={isLoading || authIsLoading}>{(isLoading || authIsLoading) ? "Logger inn..." : "Logg inn"}</Button></Link>}
        </div> 
        </div>
    </header>
  )
}