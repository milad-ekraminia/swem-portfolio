export const findCaptionsByIds = (
  treeData: any[],
  ids: number[],
): { id: number; caption: string }[] => {
  const captions: {
    id: number;
    caption: string;
    organizationTreeNodeType: number;
  }[] = [];

  const traverseTree = (nodes: any[]) => {
    nodes.forEach((node) => {
      if (ids.includes(node.id)) {
        captions.push({
          id: node.id,
          caption: node.caption,
          organizationTreeNodeType: node.organizationTreeNodeType,
        });
      }

      if (node.childs && node.childs.length > 0) {
        traverseTree(node.childs);
      }
    });
  };

  traverseTree(treeData);
  return captions;
};
