export const getInitials = (name: string) => {
  const names = name.split(" ");
  return names
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
};
