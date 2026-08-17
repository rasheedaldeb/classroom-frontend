import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetIdentity } from "@refinedev/core";

interface UserIdentity {
  name?: string;
  image?: string;
  avatar?: string;
}

export const UserAvatar = () => {
  const { data: user } = useGetIdentity<UserIdentity>();

  const avatarSrc = user?.image || user?.avatar || "";
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Avatar className="h-9 w-9 border border-border cursor-pointer">
      <AvatarImage
        src={avatarSrc}
        alt={user?.name || "User Avatar"}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
