import { useState } from 'react';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { Button } from '@/components/ui/button/button';
import TreeContentBox from './tree-content-box';

export interface Props {
  caption: string;
  childList: any[];
  level?: number;
  id: number;
  organizationTreeNodeType: number;

  handleIsCreating: (id: number | null) => void;
  handleIsCreatingWorkOrder: (id: number | null) => void;
}

const AssetTreeNode: React.FC<Props> = ({
  caption,
  childList = [],
  id,
  level = 0,
  handleIsCreating,
  handleIsCreatingWorkOrder,
}) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const hasChildren = childList.length > 0;

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
          <TreeContentBox
            id={id}
            handleIsCreating={handleIsCreating}
            handleIsCreatingWorkOrder={handleIsCreatingWorkOrder}
            onClick={() => setIsOpen(!isOpen)}
            label={caption}
            status={0}
            amount={childList.length}
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
            <AssetTreeNode
              handleIsCreating={handleIsCreating}
              handleIsCreatingWorkOrder={handleIsCreatingWorkOrder}
              key={child?.id}
              caption={child.caption}
              organizationTreeNodeType={child.organizationTreeNodeType}
              id={child.id}
              level={level + 1}
              childList={child.childs}
            />
          </div>
        ))}
    </div>
  );
};

export default AssetTreeNode;
