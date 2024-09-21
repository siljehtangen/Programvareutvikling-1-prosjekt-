"use client"

import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/UserAvatar"
//import { useUser } from "./UserProvider"
import { useAuth } from "./providers/AuthProvider"
import { useUserData } from "./providers/UserDataProvider"
import { cn } from "@/lib/utils"

/*interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}*/

export default function UserAccountNav() {
  const {userAuth, userData} = useUserData()
  const {signOut} = useAuth()
  //const user = null useUser().user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: /*user?.displayName||*/ "No name",
            image: "user.image" || null,
          }}
          className={cn(
            "h-9 w-9  p-0.5",
            userData?.role === "admin" && " bg-orange-300"
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {userAuth?.email && (
              <>
                <p className="w-[200px] truncate text-sm font-semibold">
                  {userAuth.email}
                </p>
                <p className="w-[200px] truncate text-xs text-muted-foreground">
                  {userData?.role === "admin" ? "Admin" : "Bruker"}
                </p>
              </>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/mine-vurderinger">Mine vurderinger</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/mine-favoritter">Mine favoritter</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/mine-besokte-steder">Mine besøkte steder</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onSelect={(event) => {
            event.preventDefault();
            signOut();
          }}
        >
          Logg ut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}