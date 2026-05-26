import {
  treeFilterMultiOptions,
  treeFilterSingleOptions,
} from '@/enum-data/organization-trace/org-trace-index';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  resetTreeFilter,
  setTreeFilter,
} from '@/store/features/tree-filter-slice';
import { RootState } from '@/store/store';
import {
  treeFilterInitialValuesTypes,
  treeFilterResolver,
} from '@/validations/organization-trace/tree-filter-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button/button';
import MultiSelectInput from '@/components/ui/input/multi-select-input/multi-select-input';
import SelectInput from '@/components/ui/input/select-input/select-input';

export const FilterModal = ({
  setShowFilterModal,
}: {
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const savedFilter = useSelector((state: RootState) => state.treeFilter);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
    register,
  } = useForm({
    resolver: yupResolver(treeFilterResolver),
    defaultValues: savedFilter,
  });

  const onSubmit = (data: treeFilterInitialValuesTypes) => {
    dispatch(
      setTreeFilter({
        treeFilterLevels: data.treeFilterLevels ?? null, // always provide property
        deviceStatus: data.deviceStatus ?? null, // always provide property
      }),
    );
    setShowFilterModal(false);
  };

  const handleReset = () => {
    dispatch(resetTreeFilter());
    reset();
    setShowFilterModal(false);
  };

  // Watch once to avoid re-renders
  const treeFilterLevels = watch('treeFilterLevels');

  return (
    <div className="tree-filter-modal">
      <div className="tree-filter-modal__header">
        <h3>{getTranslatedValue('filter')}</h3>
      </div>

      <form
        className="tree-filter-modal__body"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MultiSelectInput
          label="Alarm Seviyeleri"
          name="treeFilterLevels"
          options={formatSelectOptionsWithoutItems(treeFilterMultiOptions())}
          selectedValues={treeFilterLevels}
          onChange={(vals) => setValue('treeFilterLevels', vals)}
          setValue={setValue}
          register={register}
          watch={watch}
          error={errors.treeFilterLevels?.message}
        />

        <Controller
          name="deviceStatus"
          control={control}
          render={({ field, fieldState }) => (
            <SelectInput
              name={field.name}
              label="Cihaz Durumu"
              placeholder="Tüm cihazları göster"
              options={treeFilterSingleOptions}
              field={field}
              error={fieldState.error?.message}
              openDirection="down"
            />
          )}
        />
        <div className="tree-filter-modal__body-actions">
          <Button variant="secondary" onClick={handleReset}>
            {getTranslatedValue('Cancel', 'AbpUi.texts')}
          </Button>
          <Button variant="primary" type="submit">
            {getTranslatedValue('filter')}
          </Button>
        </div>
      </form>
    </div>
  );
};
