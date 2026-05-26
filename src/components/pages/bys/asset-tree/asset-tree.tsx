import { useQuery } from '@tanstack/react-query';
import { fetchTreeDataApi } from '@/services/general/tree-api';
import { Loader } from '@/components/ui/loader/loader';
import OrganizationTreeNode from './asset-tree-node';

interface Props {
  handleIsCreating: (id: number | null) => void;
  handleIsCreatingWorkOrder: (id: number | null) => void;
}
const AssetTree = ({ handleIsCreating, handleIsCreatingWorkOrder }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch tree data api'],
    queryFn: fetchTreeDataApi,
    retry: false,
  });

  return (
    <div className="asset-tree">
      <div className="asset-tree__tree-container">
        {isLoading ? (
          <Loader />
        ) : (
          data?.map((node: any) => (
            <OrganizationTreeNode
              key={node?.id}
              caption={node.caption}
              handleIsCreating={handleIsCreating}
              handleIsCreatingWorkOrder={handleIsCreatingWorkOrder}
              organizationTreeNodeType={node.organizationTreeNodeType}
              id={node.id}
              childList={node.childs}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AssetTree;
