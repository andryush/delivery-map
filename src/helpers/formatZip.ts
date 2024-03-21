export const formatZip = (zip: string): string => {
  return zip.slice(0, 4) + ' ' + zip.slice(4);
};
