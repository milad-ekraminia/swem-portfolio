import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewWeatherDataLocation,
  fetchCountriesFirmNotContainsLookupList,
} from '@/services/definitions/firm-weather-data-location/firm-weather-data-location-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const NewFirmWeatherDataLocationModal = ({
  setShowModal,
}: {
  setShowModal: (data: boolean) => void;
}) => {
  const queryClient = useQueryClient();

  const [cityId, setCityId] = useState<number>(0);

  const { data, isLoading } = useQuery({
    queryKey: ['fetch Countries Firm Not Contains Lookup list'],
    queryFn: () => fetchCountriesFirmNotContainsLookupList({ Filter: '' }),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: createNewWeatherDataLocation,
    onSuccess: async () => {
      setCityId(0);
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(false);
      queryClient.invalidateQueries({
        queryKey: ['fetch firm weather data location oWMS list'],
      });
      queryClient.invalidateQueries({
        queryKey: ['fetch firm weather data locations list'],
      });
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      weatherDataLocationId: cityId,
    });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit}>
      <ModalHeader
        isEdit={false}
        label="NewLocation"
        setShowModal={setShowModal}
      />
      <div className="global-modal__content">
        <SearchableDropdown
          name="labelId"
          label={getTranslatedValue('NewLocation')}
          searchParameterLabel={'title'}
          options={data?.items?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          selectedVal={
            cityId
              ? data?.items?.find((item: any) => item.id == cityId)?.displayName
              : null
          }
          placeholder={
            getTranslatedValue('City') +
            ' ' +
            getTranslatedValue('Search', 'AbpUi.texts')
          }
          handleChange={(selectedValue: any) => setCityId(selectedValue)}
          isLoading={isLoading}
        />
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowModal(false);
        }}
        isPending={mutation?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default NewFirmWeatherDataLocationModal;
