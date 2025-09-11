export const webPathToBlob = async (webPath: string) => {
  if (webPath) {
    const response = await fetch(webPath);
    const blob = await response.blob();
    return blob;
  }
  return null;
};
