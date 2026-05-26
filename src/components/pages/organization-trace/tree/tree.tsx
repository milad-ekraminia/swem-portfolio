import { filterOrganizationTree } from '@/helpers/filter-organization-tree';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { RootState } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useDataRefreshRates } from '@/hooks/useDataRefreshRates';
import { fetchTreeDataApi } from '@/services/general/tree-api';
import TreeContentBox from './tree-content-box';
import TreeNode from './tree-node';


export default function Tree({
  showTree = true,
}: {
  readonly showTree?: boolean;
}) {
  const [treeInterval] = useDataRefreshRates([489]);

  const { data } = useQuery({
    queryKey: ['fetch tree data api'],
    queryFn: () => fetchTreeDataApi(),
    retry: false,
    refetchInterval: treeInterval ? treeInterval : false,
  });
  const filters = useSelector((state: RootState) => state.treeFilter);

  const filteredData = filterOrganizationTree(data as any, filters);

  return (
    <div className={getClassNames('tree-container', [[!showTree, 'hidden']])}>
      <div className="tree-container__legends">
        <TreeContentBox
          active
          label={getTranslatedValue('Warning')}
          status={1}
        />
        <TreeContentBox
          active
          label={getTranslatedValue('Critical')}
          status={2}
        />
        <TreeContentBox
          active
          label={getTranslatedValue('Danger')}
          status={3}
        />
      </div>
      {filteredData?.map((node: any) => (
        <TreeNode
          key={node?.caption + node?.id}
          active={node.active}
          caption={node.caption}
          status={node.hasActiveAlarm}
          organizationType={node.organizationType}
          organizationTreeNodeType={node.organizationTreeNodeType}
          deviceModelType={node.deviceModelType}
          deviceModelId={node.deviceModelId}
          id={node.id}
          childList={node.childs}
          parentTitle={node.caption}
          type={node?.type}
          locationId={node?.locationId}
        />
      ))}
    </div>
  );
}