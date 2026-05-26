import { useState } from 'react';
import { AtollaTreeSvg } from '@/assets/icons/atolla-tree-svg';
import { ChevronDownSvg } from '@/assets/icons/chevron-down-svg';
import { getClassNames } from '@/helpers/get-class-names';
import { getCustomTypeNumber } from '@/helpers/organization-data/organization-tree-selected-tab-handler';
import { handleChangeTree } from '@/store/features/tree-slice';
import { useDispatch, useSelector } from 'react-redux';
import { TreeNodeProps } from '@/types/pages/organization-trace';
import { Button } from '@/components/ui/button/button';
import TreeContentBox from './tree-content-box';

const TreeNode: React.FC<TreeNodeProps> = ({
  caption,
  id,
  status,
  organizationType,
  deviceModelType,
  deviceModelId,
  organizationTreeNodeType,
  childList = [],
  level = 0,
  active,
  parentTitle,
  type,
  locationId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = childList.length > 0;

  const dispatch = useDispatch();
  const treeData = useSelector((state: any) => state?.tree?.info);

  console.log(
    'ssdsds',
    type,
    treeData?.tree_id,
    treeData.tree_id === id &&
      treeData?.type ==
        getCustomTypeNumber(
          organizationType,
          organizationTreeNodeType,
          deviceModelType,
        ),
  );
  const setActiveTreeRoute = () => {
    dispatch(
      handleChangeTree({
        tree_id: id,
        title: caption,
        parentTitle,
        type: getCustomTypeNumber(
          organizationType,
          organizationTreeNodeType,
          deviceModelType,
        ),
        deviceModelType,
        deviceModelId,
        locationId,
      }),
    );
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
          [
            treeData.tree_id === id &&
              treeData?.type ==
                getCustomTypeNumber(
                  organizationType,
                  organizationTreeNodeType,
                  deviceModelType,
                ),
            'active',
          ],
        ])}
      >
        <div className="tree-node__item-body">
          <button
            type="button"
            aria-label="tree node"
            className={getClassNames('body-button', [
              [treeData.tree_id === id, 'active'],
            ])}
            onClick={setActiveTreeRoute}
          >
            <TreeContentBox
              label={caption}
              active={active}
              status={status}
              icon={
                type == 0 ? (
                  <AtollaTreeSvg
                    stroke={
                      treeData.tree_id === id ? 'var(--brand-600)' : undefined
                    }
                  />
                ) : null
              }
              showReverse
            />
          </button>
        </div>
        {hasChildren && (
          //mr-2 rounded-sm bg-gray-50 p-2
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
            key={child?.caption + child?.id}
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
            <TreeNode
              caption={child.caption}
              organizationType={child.organizationType}
              organizationTreeNodeType={child.organizationTreeNodeType}
              deviceModelType={child.deviceModelType}
              deviceModelId={child.deviceModelId}
              status={child.hasActiveAlarm}
              locationId={child.locationId}
              id={child.id}
              level={level + 1}
              childList={child.childs}
              active={child.active}
              parentTitle={caption}
            />
          </div>
        ))}
    </div>
  );
};

export default TreeNode;
