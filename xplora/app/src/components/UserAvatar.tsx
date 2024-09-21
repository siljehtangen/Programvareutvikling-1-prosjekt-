import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PersonIcon,
} from "@radix-ui/react-icons"

interface UserAvatarProps extends AvatarProps {
  user: {name: string, image: string}
}

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {/*user.image*/ false ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <PersonIcon className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}