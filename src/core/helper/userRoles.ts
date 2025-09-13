function getRole(role: number | string): number | string | null {
  const roleMapNumberToString: { [key: number]: string } = {
    1: "Admin",
    2: "Moderator",
    3: "Writer",
  };

  const roleMapStringToNumber: { [key: string]: number } = {
    Admin: 1,
    Moderator: 2,
    Writer: 3,
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
