
import { Button } from '@/components/ui/button/button';
import DateInput from '@/components/ui/input/date-input/date-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import { changeTypeOptions } from '@/enum-data/system-administration/audit-logs';
import { formatToCustomISO } from '@/helpers/bys/get-today-date';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function EntityChangesFilterForm({ isLoading, setFilterValues, setCurrentPage }: { isLoading: boolean, setFilterValues: (filters: any) => void, setCurrentPage: (page: number) => void }) {

    const { setValue, getValues, register, reset, control } = useForm<any>();

    const handleSearch = () => {
        const formValues = getValues();
        const filters: any = {};

        if (formValues.startDate) {
            filters.StartDate = formatToCustomISO(new Date(formValues.startDate));
        }
        if (formValues.endDate) {
            filters.EndDate = formatToCustomISO(new Date(formValues.endDate));
        }
        if (formValues.changeType) {
            filters.ChangeType = formValues.changeType;
        }
        if (formValues.entityId) {
            filters.EntityId = formValues.entityId;
        }
        if (formValues.entityTypeFullName) {
            filters.EntityTypeFullName = formValues.entityTypeFullName;
        }

        setFilterValues(filters);
        setCurrentPage(0);
    };

    const handleReset = () => {
        reset({
            startDate: '',
            endDate: '',
            changeType: undefined,
            entityId: '',
            entityTypeFullName: '',
        });
        setFilterValues({});
        setCurrentPage(0);
    };

    return (
        <div className="audit-logs__wrapper-filters">
            <DateInput
                name="startDate"
                label={getTranslatedValue('StartDate')}
                dateFormat={'DD/MM/YYYY HH:mm'}
                onChange={(value) => setValue('startDate', value)}
                value={getValues('startDate')}
                hasMax
                maxDate={new Date()}
                periodType={'1'}
                hasTime
            />
            <DateInput
                name="endDate"
                label={getTranslatedValue('EndDate')}
                dateFormat={'DD/MM/YYYY HH:mm'}
                onChange={(value) => setValue('endDate', value)}
                value={getValues('endDate')}
                periodType={'1'}
                hasTime
                hasMax
                maxDate={new Date()}
            />

            <RegisterSelectInput
                label={getTranslatedValue('ChangeType', 'AbpAuditLogging.texts')}
                placeholder={getTranslatedValue(
                    'UserChangeTypeName',
                    'AbpAuditLogging.texts',
                )}
                name="changeType"
                register={register}
                control={control}
                options={changeTypeOptions}
            />
            <RegisterInput
                placeholder={getTranslatedValue(
                    'EntityId',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue('EntityId', 'AbpAuditLogging.texts')}
                name="entityId"
                register={register}
            />
            <RegisterInput
                placeholder={getTranslatedValue(
                    'EntityTypeFullName',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue(
                    'EntityTypeFullName',
                    'AbpAuditLogging.texts',
                )}
                name="entityTypeFullName"
                register={register}
            />

            <div className="audit-logs__wrapper-filters-actions">
                <Button type="button" variant="secondary" onClick={handleReset} disabled={isLoading}>
                    {getTranslatedValue('Clear', 'AbpUi.texts')}
                </Button>
                <Button type="button" variant="primary" onClick={handleSearch} disabled={isLoading}>
                    <div className="row">
                        {isLoading ? <ComponentLoader variant="secondary" /> : <><Search stroke="#fff" size={18} /></>}
                        {getTranslatedValue('Search', 'AbpUi.texts')}
                    </div>
                </Button>
            </div>
        </div>
    )
}
