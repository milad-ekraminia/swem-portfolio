import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import Badge from '@/components/ui/badge/badge';
import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';

const MemoPartitionForm = ({
  register,
  control,
  watch,
  label,
  list,
  setValue,
  columns,
  title,
  children,
}: {
  errors: any;
  register: any;
  control: any;
  watch: any;
  columns?: any;
  label?: any;
  title?: any;
  list?: any;
  setValue: any;
  children?: any;
}) => {
  return (
    <div
      className={`common-container-form ${columns === 2 ? 'columns-2' : columns === 3 ? 'columns-3' : ''}`}
    >
      {label && (
        <div className="label">
          <Badge color="white">{getTranslatedValue(label)}</Badge>
        </div>
      )}
      {title && <div className="title">{getTranslatedValue(title)}</div>}
      <div className="common-container-information-level">
        {list
          ? list?.map((item: any) => {
              if (item?.isTextInput) {
                return (
                  <RegisterInput
                    key={item?.id}
                    type={'text'}
                    name={item?.name}
                    label={item?.label}
                    required={item?.required}
                    register={register}
                    placeholder={item?.placeholder}
                    error={item?.error}
                  />
                );
              } else if (item?.isNumberInput) {
                return (
                  <DecimalInput
                    key={item?.id}
                    label={item?.label}
                    name={item?.name}
                    register={register}
                    setValue={setValue}
                    required={item?.required}
                    placeholder={item?.placeholder}
                    step="0"
                    error={item?.error}
                  />
                );
              } else {
                const selectedVal = watch ? watch(item?.name) : null;

                return (
                  <SearchableDropdown
                    register={register}
                    control={control}
                    options={item?.options}
                    searchParameterLabel={'title'}
                    {...item}
                    handleChange={(e: any) => {
                      setValue(item?.name, e);
                    }}
                    selectedVal={
                      selectedVal
                        ? item?.options?.find(
                            (item: any) => item.value == selectedVal,
                          )?.title
                        : null
                    }
                  />
                );
              }
            })
          : children}
      </div>
    </div>
  );
};

const PartitionForm = memo(MemoPartitionForm);

export default PartitionForm;
