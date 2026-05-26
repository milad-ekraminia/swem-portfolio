import { CloseSvg } from '@/assets/icons/close-svg';
import { OrganizationSvg } from '@/assets/icons/organization-svg';
import { Button } from '@/components/ui/button/button';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { filterSelectedDataTypes } from '@/types/tree-node';
import { Eraser, Maximize, MinimizeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Loader } from '../../loader/loader';
import Modal from '../../modal-wrapper/modal-wrapper';
import OrganizationTreeNode from './organization-tree-node';

interface Props {
  onClose: () => void;
  onChange: (data: number | number[]) => void;
  isMulti: boolean;
  isOpen: boolean;
  data: any[];
  idArray?: boolean;
  selectedOrganizations?: { id: number, organizationTreeNodeType: number }[];
  isLoading: boolean;
  assetTypeIdChange?: (data: number | number[]) => void;
}
const OrganizationTreeModal = ({
  onChange,
  onClose,
  isMulti,
  isOpen,
  data,
  idArray = true,
  isLoading,
  selectedOrganizations,
  assetTypeIdChange,
}: Props) => {

  const [selectedItems, setSelectedItems] = useState<any>([]);

  const handleSubmit = () => {
    if (isMulti) {
      if (idArray) onChange(selectedItems?.map((item: any) => item.id));
      else onChange(selectedItems);
    } else {
      if (idArray) onChange(selectedItems?.map((item: any) => item.id)[0]);
      else onChange(selectedItems[0]);
      if (assetTypeIdChange) {
        assetTypeIdChange(
          selectedItems?.map((item: any) => item.organizationTreeNodeType)[0],
        );
      }
    }
    onClose();
    setSelectedItems([]);
  };

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

  // Recursively search for organization nodes by id(s)
  function findOrganizationsById(data: any[], ids: { id: number, organizationTreeNodeType: number }[]): any[] {
    const idArray = Array.isArray(ids) ? ids : [ids];
    const result: any[] = [];

    function search(nodes: any[]) {
      for (const node of nodes) {
        if (idArray.find(elem => elem.id === node.id && elem.organizationTreeNodeType === node.organizationTreeNodeType)) {
          result.push(node);
        }
        if (node.childs && node.childs.length > 0) {
          search(node.childs);
        }
      }
    }

    search(data);
    return result;
  }

  useEffect(() => {
    if (
      selectedOrganizations &&
      data &&
      data.length > 0 &&
      !selectedItems.length
    ) {
      let selectedNodes = [];
      if (idArray)
        selectedNodes = findOrganizationsById(data, selectedOrganizations?.map((item: any) => ({ id: item.id, organizationTreeNodeType: item.organizationTreeNodeType })));
      else if (!idArray && Array.isArray(selectedOrganizations))
        selectedNodes = findOrganizationsById(
          data,
          selectedOrganizations?.map((item: any) => ({ id: item.id, organizationTreeNodeType: item.organizationTreeNodeType })),
        );
      setSelectedItems(selectedNodes);
    } else {
      setSelectedItems([]);
    }
  }, [selectedOrganizations, data]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalSize="sm"
      showCloseButton={false}
      outsideClickStyle={{ zIndex: 1006 }}
      contentStyle={{ zIndex: 1007 }}
    >
      <div className="organization-tree-modal">
        <div className="organization-tree-modal__header">
          <div>
            <div className="organization-tree-modal__header-icon">
              <OrganizationSvg stroke="var(--brand-600)" />
            </div>
            <div className="organization-tree-modal__header-title">
              {getTranslatedValue('Organization')}
            </div>
          </div>
          <button type="button" onClick={onClose}>
            <CloseSvg />
          </button>
        </div>

        <>
          <div className="buttons">
            <Button
              type="button"
              onClick={expandAll}
              title="Show All Tree"
              variant="tertiary"
              className="expand"
            >
              <Maximize stroke="#fff" width={22} />
            </Button>
            <Button
              type="button"
              onClick={collapseAll}
              title="Collapse All Tree"
              variant="tertiary"
              className="collapse"
            >
              <MinimizeIcon stroke="#fff" width={22} />
            </Button>
            <Button
              type="button"
              onClick={deselectAll}
              title="Deselect All"
              variant="tertiary"
              className="erase"
            >
              <Eraser stroke="#175CD3" />
            </Button>
          </div>

          <div className="tree-container">
            {isLoading ? (
              <Loader />
            ) : (
              data?.map((node: any) => (
                <OrganizationTreeNode
                  isMulti={isMulti}
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
              ))
            )}
          </div>
        </>
        <div className="organization-tree-modal__footer">
          <Button type="button" variant="secondary" onClick={onClose}>
            {getTranslatedValue('Cancel', 'AbpUi.texts')}
          </Button>

          <Button
            type="button" // ⛔ prevent default form submit
            variant="primary"
            onClick={handleSubmit}
          >
            {getTranslatedValue('Approve')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrganizationTreeModal;
