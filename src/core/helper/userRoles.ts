import { ROLE } from "./constants/role.constants";

function getRole(role: number | string): number | string | null {
  const roleMapNumberToString: { [key: number]: string } = {
    [ROLE.ADMIN]: "Admin",
    [ROLE.MODERATOR]: "Moderator",
    [ROLE.WRITER]: "Writer",
  };

  const roleMapStringToNumber: { [key: string]: number } = {
    Admin: ROLE.ADMIN,
    Moderator: ROLE.MODERATOR,
    Writer: ROLE.WRITER,
  };

  return (
    roleMapNumberToString[role as number] ??
    roleMapStringToNumber[role as string] ??
    null
  );
}

export function verifyRole(user: number, mw: string[]) {
  const userRole = getRole(user);

  if (mw.includes(userRole as string)) 
    return true;
  else 
    return false;
}
