import OrganizationTreeModal from '@/components/ui/input/organization-picker/organization-tree-modal';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useFormDataValueChangeByFieldName } from '@/helpers/reports/find-fieldvalue-by-fieldname';
import { filterSelectedDataTypes } from '@/types/tree-node';
import { memo, useCallback, useEffect, useState } from 'react';

const MemoReportsOrganizationField = ({
  getValues,
  fields,
  treeData,
  setValue,
  isLoading,
}: {
  treeData: any;
  getValues: any;
  fields: any;
  setValue: any;
  isLoading?: boolean;
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const getFieldValuePath = useFormDataValueChangeByFieldName(fields);
  const [selectedOrganizations, setSelectedOrganizations] = useState<any>([]);

  const allItems = getValues(getFieldValuePath('SelectedOrganizationsObjects'));

  useEffect(() => {
    setSelectedOrganizations(allItems);
  }, [getValues, allItems]);

  const handleOrganizationSelect = useCallback(
    (values: any) => {
      setValue(
        getFieldValuePath('SelectedOrganizations'),
        values?.map((elem: any) => elem.id)?.join(';'),
      );
      setValue(getFieldValuePath('SelectedOrganizationsObjects'), values);
    },
    [selectedOrganizations, getFieldValuePath, treeData],
  );

  const values = getValues(getFieldValuePath('SelectedOrganizationsObjects'));

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDetail(!showDetail)}
        className="organization"
      >
        <span className="organization-title">
          {getTranslatedValue('Organization')}
        </span>
        <div className="organization-field">
          {values?.length > 0 ? (
            <div className="fields">
              {values?.map((item: filterSelectedDataTypes, index: number) => {
                return (
                  <span className="fields-item">
                    {item.caption} - {index + 1}
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="placeholder">
              {getTranslatedValue('Organization') +
                '  ' +
                getTranslatedValue('Select')}
            </span>
          )}
        </div>
      </button>

      {showDetail && (
        <OrganizationTreeModal
          isMulti
          selectedOrganizations={selectedOrganizations}
          data={treeData}
          isLoading={isLoading ?? false}
          isOpen={showDetail}
          idArray={false}
          onClose={() => setShowDetail(false)}
          onChange={handleOrganizationSelect}
        />
      )}
    </>
  );
};

const ReportsOrganizationField = memo(MemoReportsOrganizationField);

export default ReportsOrganizationField;
