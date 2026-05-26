import { Button } from '@/components/ui/button/button';
import DateInput from "@/components/ui/input/date-input/date-input";
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import { httpStatusCodeOptionsEnum } from '@/enum-data/definitions/enum';
import { formatToCustomISO } from '@/helpers/bys/get-today-date';
import { getTranslatedValue } from "@/helpers/get-translated-value";
import { Search } from 'lucide-react';
import { useForm, useWatch } from "react-hook-form";

export default function FilterForm({ isLoading, setFilterValues, setCurrentPage }: { isLoading: boolean, setFilterValues: (filters: any) => void, setCurrentPage: (page: number) => void }) {

    const { setValue, getValues, control, register, reset } = useForm<any>();
    const formValuesWatch = useWatch({ control });

    const handleSearch = () => {
        const formValues = getValues();
        const filters: any = {};

        if (formValues.startDate) {
            filters.StartTime = formatToCustomISO(new Date(formValues.startDate));
        }
        if (formValues.endDate) {
            filters.EndTime = formatToCustomISO(new Date(formValues.endDate));
        }
        if (formValues.name) {
            filters.UserName = formValues.name;
        }
        if (formValues.url) {
            filters.Url = formValues.url;
        }
        if (formValues.minDuration) {
            filters.MinExecutionDuration = parseInt(formValues.minDuration);
        }
        if (formValues.maxDuration) {
            filters.MaxExecutionDuration = parseInt(formValues.maxDuration);
        }
        if (formValues.httpMethod) {
            filters.HttpMethod = formValues.httpMethod;
        }
        if (formValues.httpStatusCode) {
            filters.HttpStatusCode = parseInt(formValues.httpStatusCode);
        }
        if (formValues.applicationName) {
            filters.ApplicationName = formValues.applicationName;
        }
        if (formValues.ipAddress) {
            filters.ClientIpAddress = formValues.ipAddress;
        }
        if (formValues.correlationId) {
            filters.CorrelationId = formValues.correlationId;
        }
        if (
            formValues.hasException !== undefined &&
            formValues.hasException !== ''
        ) {
            filters.HasException = formValues.hasException === 'true';
        }

        setFilterValues(filters);
        setCurrentPage(0);
    };

    const handleReset = () => {
        reset({
            startDate: '',
            endDate: '',
            name: '',
            url: '',
            minDuration: '',
            maxDuration: '',
            httpMethod: '',
            httpStatusCode: '',
            applicationName: '',
            ipAddress: '',
            correlationId: '',
            hasException: '',
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
                value={formValuesWatch.startDate ? new Date(formValuesWatch.startDate) : undefined}
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
                value={formValuesWatch.endDate ? new Date(formValuesWatch.endDate) : undefined}
                hasMax
                maxDate={new Date()}
                periodType={'1'}
                hasTime
            />
            <RegisterInput
                label={getTranslatedValue('UserName', 'AbpIdentity.texts')}
                placeholder={getTranslatedValue('UserName', 'AbpIdentity.texts')}
                name="name"
                register={register}
            />
            <RegisterInput
                placeholder={getTranslatedValue('Url')}
                label={getTranslatedValue('Url')}
                name="url"
                register={register}
            />
            <RegisterInput
                placeholder={getTranslatedValue(
                    'MinDuration',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue('MinDuration', 'AbpAuditLogging.texts')}
                name="minDuration"
                register={register}
            />
            <RegisterInput
                placeholder={getTranslatedValue(
                    'MaxDuration',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue('MaxDuration', 'AbpAuditLogging.texts')}
                name="maxDuration"
                register={register}
            />
            <RegisterSelectInput
                control={control}
                options={[
                    {
                        title: 'GET',
                        value: 'get',
                    },
                    {
                        title: 'POST',
                        value: 'post',
                    },
                ]}
                placeholder={getTranslatedValue(
                    'HttpMethod',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue('HttpMethod', 'AbpAuditLogging.texts')}
                name="httpMethod"
                register={register}
            />
            <RegisterSelectInput
                control={control}
                options={httpStatusCodeOptionsEnum}
                placeholder={getTranslatedValue(
                    'HttpStatusCode',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue(
                    'HttpStatusCode',
                    'AbpAuditLogging.texts',
                )}
                name="httpStatusCode"
                register={register}
            />
            <RegisterInput
                placeholder={getTranslatedValue(
                    'ApplicationName',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue(
                    'ApplicationName',
                    'AbpAuditLogging.texts',
                )}
                name="applicationName"
                register={register}
            />
            <RegisterInput
                placeholder={getTranslatedValue(
                    'IpAddress',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue('IpAddress', 'AbpAuditLogging.texts')}
                name="ipAddress"
                register={register}
            />
            <RegisterInput
                placeholder={getTranslatedValue(
                    'CorrelationId',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue('CorrelationId', 'AbpAuditLogging.texts')}
                name="correlationId"
                register={register}
            />
            <RegisterSelectInput
                control={control}
                options={[
                    {
                        title: getTranslatedValue('Yes', 'AbpAuditLogging.texts'),
                        value: 'True',
                    },
                    {
                        title: getTranslatedValue('No', 'AbpAuditLogging.texts'),
                        value: 'False',
                    },
                ]}
                placeholder={getTranslatedValue(
                    'HasException',
                    'AbpAuditLogging.texts',
                )}
                label={getTranslatedValue('HasException', 'AbpAuditLogging.texts')}
                name="hasException"
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
