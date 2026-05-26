import { memo, useState } from 'react';
import { Eraser, Expand, MinimizeIcon } from 'lucide-react';
import { filterSelectedDataTypes } from '@/types/tree-node';
import { Button } from '@/components/ui/button/button';
import FilterProfileTreeNode from './filter-profile-tree-node';

const MemoAlarmConfigurationsFilterProfileTree = ({
  data,
  selectedItems,
  setSelectedItems,
}: {
  data: any;
  selectedItems: any;
  setSelectedItems: any;
}) => {
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const expandAll = () => {
    setIsAllExpanded(true);
  };

  const collapseAll = () => {
    setIsAllExpanded(false);
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  const handleSelect = (items: filterSelectedDataTypes[]) => {
    setSelectedItems((prevSelectedItems: any) => {
      const updatedItems = [...prevSelectedItems];

      items.forEach((item) => {
        const existingIndex = updatedItems.findIndex(
          (existing) => existing.id === item.id,
        );
        if (existingIndex >= 0) {
          updatedItems.splice(existingIndex, 1);
        } else {
          updatedItems.push(item);
        }
      });

      return updatedItems;
    });
  };
  return (
    <>
      <div className="buttons">
        <Button
          type="button"
          onClick={expandAll}
          title="Show All Tree"
          variant="tertiary"
        >
          <Expand />
        </Button>
        <Button
          type="button"
          onClick={collapseAll}
          title="Collapse All Tree"
          variant="tertiary"
        >
          <MinimizeIcon />
        </Button>
        <Button
          type="button"
          onClick={deselectAll}
          title="Deselect All"
          variant="tertiary"
        >
          <Eraser />
        </Button>
      </div>
      <div className="tree-container">
        {data?.map((node: any) => (
          <FilterProfileTreeNode
            key={node?.id}
            caption={node.caption}
            organizationTreeNodeType={node.organizationTreeNodeType}
            id={node.id}
            childList={node.childs}
            isAllExpanded={isAllExpanded}
            onSelect={handleSelect}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ))}
      </div>
    </>
  );
};

const AlarmConfigurationsFilterProfileTree = memo(
  MemoAlarmConfigurationsFilterProfileTree,
);

export default AlarmConfigurationsFilterProfileTree;
