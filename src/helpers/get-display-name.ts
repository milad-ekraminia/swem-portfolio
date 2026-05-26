export const getDisplayName = (id: number, list: any[]) => {
  const entity = list.find((item: any) => item.id === id);
  return entity ? entity.displayName : `-`; // Adjust fallback if needed
};
