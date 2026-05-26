import { useEffect, useState } from 'react';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import {
  FilterProfileTreeNodeProps,
  filterSelectedDataTypes,
} from '@/types/tree-node';
import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import TreeContentBox from '@/components/pages/organization-trace/tree/tree-content-box';

const FilterProfileTreeNode: React.FC<FilterProfileTreeNodeProps> = ({
  caption,
  id,
  organizationTreeNodeType,
  childList = [],
  level = 0,
  isAllExpanded,
  onSelect,
  setSelectedItems,
  selectedItems,
}) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const hasChildren = childList.length > 0;

  // Update isOpen when isAllExpanded changes
  useEffect(() => {
    setIsOpen(isAllExpanded || level === 0);
  }, [isAllExpanded, level]);

  const handleSelect = () => {
    const itemsToSelect: filterSelectedDataTypes[] = [
      { id, caption, organizationTreeNodeType },
    ];

    if (hasChildren) {
      const collectChildItems = (children: any[]) => {
        children.forEach((child) => {
          itemsToSelect.push({
            id: child.id,
            caption: child.caption,
            organizationTreeNodeType: child.organizationTreeNodeType,
          });
          if (child.childs?.length > 0) {
            collectChildItems(child.childs);
          }
        });
      };
      collectChildItems(childList);
    }

    const isSelected = selectedItems?.some(
      (item) =>
        item.id === id &&
        item.organizationTreeNodeType === organizationTreeNodeType,
    );

    if (isSelected) {
      const updatedItems = selectedItems.filter(
        (item) =>
          !itemsToSelect.some(
            (selected) =>
              selected.id === item.id &&
              selected.organizationTreeNodeType ===
                item.organizationTreeNodeType,
          ),
      );
      onSelect(updatedItems);
      setSelectedItems(updatedItems);
    } else {
      const updatedItems = [...selectedItems, ...itemsToSelect];
      onSelect(updatedItems);
      setSelectedItems(updatedItems);
    }
  };
  return (
    <div
      className={`${getClassNames('tree-node', [
        [level === 0, 'first-level'],
      ])} dv-tree-view-node`}
    >
      <div
        className={getClassNames('tree-node__item', [
          [level === 0, 'first-level'],
          [hasChildren, 'has-children'],
        ])}
      >
        <div className="tree-node__item-body">
          <Checkbox
            name={caption}
            checked={selectedItems?.some(
              (item) =>
                item.id === id &&
                item.organizationTreeNodeType === organizationTreeNodeType,
            )}
            onChange={handleSelect}
          />
          <TreeContentBox
            onClick={() => setIsOpen(!isOpen)}
            label={caption}
            status={0}
          />
        </div>
        {hasChildren && (
          <Button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label="toggle children"
            className={getClassNames('tree-node__item-body-toggler', [
              [isOpen, 'active'],
            ])}
          >
            <ChevronDownSvg />
          </Button>
        )}
      </div>
      {isOpen &&
        hasChildren &&
        childList.map((child, index) => (
          <div
            key={child?.id}
            className={getClassNames('child-node-list', [
              [child.childs && child.childs?.length > 0, 'has-children'],
              [
                child.childs &&
                  child.childs?.length === 0 &&
                  childList?.length === index + 1,
                'last-child',
              ],
            ])}
          >
            <FilterProfileTreeNode
              key={child?.id}
              caption={child.caption}
              organizationTreeNodeType={child.organizationTreeNodeType}
              id={child.id}
              level={level + 1}
              childList={child.childs}
              isAllExpanded={isAllExpanded}
              onSelect={onSelect}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
            />
          </div>
        ))}
    </div>
  );
};

export default FilterProfileTreeNode;
