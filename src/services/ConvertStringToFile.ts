export function convertStringToImageFile(stringData: string): Blob {
  const blob = new Blob([stringData], { type: "jpg" });
  return blob;
}
