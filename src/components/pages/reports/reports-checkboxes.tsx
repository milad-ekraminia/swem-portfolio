import Toggle from '@/components/ui/input/toggle-button/toggle';
import { getClassNames } from '@/helpers/get-class-names';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useFormDataValueChangeByFieldName } from '@/helpers/reports/find-fieldvalue-by-fieldname';
import { CheckboxGroup } from '@/types/pages/reports/reports';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

const ReportsCheckboxes = ({
  optionsList,
  setValue,
  fields,
  control,
}: {
  optionsList: CheckboxGroup[];
  setValue: any;
  fields: any;
  control: any;
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [renderKey, setRenderKey] = useState(0);
  const getFieldValuePath = useFormDataValueChangeByFieldName(fields);
  const fieldPaths = optionsList.flatMap((group) =>
    group.values.map((value: any) => getFieldValuePath(value.fieldName)),
  );

  const watchedValues = useWatch({
    control,
    name: fieldPaths,
  }) as string[];

  const watchedValuesMap = fieldPaths.reduce(
    (acc, path, index) => {
      acc[path] = watchedValues[index];
      return acc;
    },
    {} as { [key: string]: string },
  );

  useEffect(() => {
    const allValuesSelected = optionsList.every((group) =>
      group.values.every(
        (value: any) =>
          watchedValuesMap[getFieldValuePath(value.fieldName)] === 'True',
      ),
    );
    setSelectAll(allValuesSelected);
  });

  const handleSelectAll = () => {
    const isSelectingAll = !selectAll;
    setSelectAll(isSelectingAll);

    optionsList.forEach((group) => {
      group.values.forEach((value: any) => {
        setValue(
          getFieldValuePath(value.fieldName),
          isSelectingAll ? 'True' : 'False',
        );
      });
    });
    setRenderKey((prev) => prev + 1);
  };

  const handleCheckboxChange = (fieldName: string, checked: boolean) => {
    setValue(getFieldValuePath(fieldName), checked ? 'True' : 'False');
  };

  return (
    <div key={renderKey}>
      <div className="header">
        <div className="header-title">
          {getTranslatedValue('DeviceSetting')}
        </div>
        <Toggle
          label={getTranslatedValue('SelectAll')}
          isOn={selectAll}
          setIsOn={handleSelectAll}
        />
      </div>
      <div className="body">
        {optionsList.map((group) => (
          <div className="option" key={group.id}>
            {/* {group.label && ( */}
            <div className="option-title">{group?.label}</div>
            {/* )} */}

            <div className="option-boxes" style={{
              gridTemplateColumns: `repeat(${group?.values?.length}, 1fr)`
            }}>
              {group.values.map((value: any, index: number) => {
                const fieldPath = getFieldValuePath(value.fieldName);
                const isChecked = watchedValuesMap[fieldPath] === 'True';

                return (
                  <button
                    key={index}
                    type="button"
                    className={getClassNames('box', [[isChecked, 'selected']])}
                    onClick={() =>
                      handleCheckboxChange(value.fieldName, !isChecked)
                    }
                  >
                    <span
                      className={getClassNames('title', [
                        [isChecked, 'selected'],
                      ])}
                    >
                      {value.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsCheckboxes;
