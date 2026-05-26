import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Filters as FiltersTypes } from '@/types/pages/system-administration/security-logs';
import { Button } from '@/components/ui/button/button';
import DateInput from '@/components/ui/input/date-input/date-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';

interface Props {
  handleChangeFilters: (filters: FiltersTypes) => void;
}

export default function Filters({ handleChangeFilters }: Props) {
  const { handleSubmit, register, getValues, setValue, reset } =
    useForm<FiltersTypes>({
      defaultValues: {},
    });

  const handleClear = () => {
    handleChangeFilters({});
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleChangeFilters)}
      className=" security-logs__filters"
    >
      <div className="security-logs__filters-content">
        <DateInput
          name="StartTime"
          label={getTranslatedValue('StartTime', 'AbpIdentity.texts')}
          dateFormat="DD/MM/YYYY"
          onChange={(value) => setValue('StartTime', value)}
          value={getValues('StartTime')}
          periodType="2"
        />
        <DateInput
          name="EndTime"
          label={getTranslatedValue('EndTime', 'AbpIdentity.texts')}
          dateFormat="DD/MM/YYYY"
          onChange={(value) => setValue('EndTime', value)}
          value={getValues('EndTime')}
          periodType="2"
        />
        <RegisterInput
          name="ApplicationName"
          label={getTranslatedValue(
            'SecurityLogs:ApplicationDescription',
            'AbpIdentity.texts',
          )}
          placeholder={getTranslatedValue(
            'SecurityLogs:ApplicationDescription',
            'AbpIdentity.texts',
          )}
          type="text"
          register={register}
        />
        <RegisterInput
          name="Identity"
          label={getTranslatedValue(
            'SecurityLogs:Identity',
            'AbpIdentity.texts',
          )}
          placeholder={getTranslatedValue(
            'SecurityLogs:Identity',
            'AbpIdentity.texts',
          )}
          type="text"
          register={register}
        />
        <RegisterInput
          name="UserName"
          label={getTranslatedValue(
            'SecurityLogs:UserName',
            'AbpIdentity.texts',
          )}
          placeholder={getTranslatedValue(
            'SecurityLogs:UserName',
            'AbpIdentity.texts',
          )}
          type="text"
          register={register}
        />
        <RegisterInput
          name="Action"
          label={getTranslatedValue('SecurityLogs:Action', 'AbpIdentity.texts')}
          placeholder={getTranslatedValue(
            'SecurityLogs:Action',
            'AbpIdentity.texts',
          )}
          type="text"
          register={register}
        />
        <RegisterInput
          name="ClientId"
          label={getTranslatedValue('SecurityLogs:Client', 'AbpIdentity.texts')}
          placeholder={getTranslatedValue(
            'SecurityLogs:Client',
            'AbpIdentity.texts',
          )}
          type="text"
          register={register}
        />
        <RegisterInput
          name="CorrelationId"
          label={getTranslatedValue(
            'SecurityLogs:CorrelationId',
            'AbpIdentity.texts',
          )}
          placeholder={getTranslatedValue(
            'SecurityLogs:CorrelationId',
            'AbpIdentity.texts',
          )}
          type="text"
          register={register}
        />
      </div>
      <div className="security-logs__filters-actions">
        <Button
          type="button"
          onClick={handleClear}
          style={{ width: '270px' }}
          variant="secondary-blue"
        >
          {getTranslatedValue('Clear', 'AbpUi.texts')}
        </Button>
        <Button
          style={{
            width: '270px',
          }}
          type="submit"
          variant="primary"
        >
          <>
            <Search size={20} />
            {getTranslatedValue('Search', 'AbpUi.texts')}
          </>
        </Button>
      </div>
    </form>
  );
}
