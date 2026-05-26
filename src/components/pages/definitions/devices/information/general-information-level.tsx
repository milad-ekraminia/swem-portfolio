import { useState } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import Accordion from '@/components/ui/accordion/accordion';
import DeviceAdditionalIInfoFormContent from './additional-info-form-content.tsx';
import DeviceCommunicationPeriodFormContent from './content/communication-period-form-content.tsx';
import DeviceElectricityInfoFormContent from './content/electricity-info-form-content';
import DeviceSensorLabelDescriptionFormContent from './content/sensor-label-description-form-content.tsx';
import DeviceSubscriptionInfoFormContent from './content/subscription-info-form-content';

export const GeneralInformationLevel = ({
  errors,
  register,
  control,
  setValue,
  getDeviceLabelResponse,
  reset,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  getDeviceLabelResponse: any;
  reset: any;
}) => {
  const [selectedAccordion, setSelectedAccordion] = useState<number | null>(
    null,
  );
  const accordionHandler = (id: number) => {
    const isSelected = selectedAccordion === id ? null : id;
    setSelectedAccordion(isSelected);
  };
  return (
    <div className="general-information-level">
      <Accordion
        id={1}
        title={getTranslatedValue('em_device_subscription_info')}
        isSelected={selectedAccordion}
        clickHandler={accordionHandler}
      >
        {selectedAccordion === 1 ? (
          <DeviceSubscriptionInfoFormContent
            errors={errors}
            register={register}
            control={control}
          />
        ) : null}
      </Accordion>
      <Accordion
        id={2}
        title={getTranslatedValue('em_electricity')}
        isSelected={selectedAccordion}
        clickHandler={accordionHandler}
      >
        {selectedAccordion === 2 ? (
          <DeviceElectricityInfoFormContent
            errors={errors}
            register={register}
          />
        ) : null}
      </Accordion>
      <Accordion
        id={3}
        title={getTranslatedValue('CommunicationPeriod')}
        isSelected={selectedAccordion}
        clickHandler={accordionHandler}
      >
        {selectedAccordion === 3 ? (
          <DeviceCommunicationPeriodFormContent
            errors={errors}
            register={register}
            control={control}
            reset={reset}
          />
        ) : null}
      </Accordion>
      <Accordion
        id={4}
        title={getTranslatedValue('SensorLabelDescription')}
        isSelected={selectedAccordion}
        clickHandler={accordionHandler}
      >
        {selectedAccordion === 4 ? (
          <DeviceSensorLabelDescriptionFormContent
            control={control}
            getDeviceLabelResponse={getDeviceLabelResponse}
          />
        ) : null}
      </Accordion>
      <Accordion
        id={5}
        title={getTranslatedValue('AdditionalInformations')}
        isSelected={selectedAccordion}
        clickHandler={accordionHandler}
      >
        {selectedAccordion === 5 ? (
          <DeviceAdditionalIInfoFormContent
            setValue={setValue}
            errors={errors}
            register={register}
          />
        ) : null}
      </Accordion>
    </div>
  );
};
