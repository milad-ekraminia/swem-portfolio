import ErrorContent from '@/components/ui/error-content/error-content';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchTreeDataApi } from '@/services/general/tree-api';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import OrganizationTreeModal from './organization-tree-modal';

interface OrganizationNode {
  id: number;
  caption: string;
  childs?: OrganizationNode[];
}

interface Props {
  control: any;
  error?: string;
  disabled?: boolean;
  onChange: (data: number | number[]) => void;
  assetTypeIdChange?: (data: number | number[]) => void;
  isMulti: boolean;
  name: string;
}

function findOrganizationsById(
  data: OrganizationNode[] = [],
  ids: number | number[],
): OrganizationNode[] {
  const idArray = Array.isArray(ids) ? ids : [ids];
  const result: OrganizationNode[] = [];

  function search(nodes: OrganizationNode[]) {
    for (const node of nodes) {
      if (idArray.includes(node.id)) {
        result.push(node);
      }
      if (node.childs?.length) {
        search(node.childs);
      }
    }
  }

  search(data);
  return result;
}

const OrganizationInput = ({
  control,
  error,
  name,
  onChange,
  isMulti,
  assetTypeIdChange,
  disabled,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleOrganizationModal = useCallback(() => {
    if (!disabled) setShowModal((prev) => !prev);
  }, [disabled]);

  const selectedOrganizations = useWatch({ control, name });

  const { data, isLoading } = useQuery({
    queryKey: ['fetch tree data api'],
    queryFn: fetchTreeDataApi,
    retry: false,
  });

  const selectedOrgs =
    data && selectedOrganizations
      ? findOrganizationsById(data, selectedOrganizations)
      : [];

  const displayValue =
    selectedOrgs.length > 0
      ? selectedOrgs.map((org) => org.caption).join(', ')
      : getTranslatedValue('Organization');

  const isEmpty = !selectedOrgs.length;

  return (
    <>
      <div
        className="main-input organization-input"
        onClick={handleOrganizationModal}
      >
        <label className="label">{getTranslatedValue('Organization')}</label>
        <div
          className="main-input__wrapper"
          style={{ marginBottom: 4, overflow: 'hidden' }}
        >
          <span
            className={`input ${isEmpty ? 'empty' : ''}`}
            style={{ padding: '7px 14px' }}
          >
            {displayValue}
          </span>
        </div>
        {error && <ErrorContent error={error} />}
      </div>
      {showModal && (
        <OrganizationTreeModal
          selectedOrganizations={selectedOrganizations}
          data={data}
          assetTypeIdChange={assetTypeIdChange}
          isLoading={isLoading}
          isOpen={showModal}
          onClose={handleOrganizationModal}
          isMulti={isMulti}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default OrganizationInput;
