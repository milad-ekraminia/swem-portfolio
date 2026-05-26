import SureDeleteModal from "@/components/ui/action/sure-delete-modal";
import { Button } from "@/components/ui/button/button";
import SubmitOrCancelButtons from "@/components/ui/button/submit-or-cancel-button";
import { RegisterInput } from "@/components/ui/input/register-input/Input";
import RegisterSelectInputNewVersion from "@/components/ui/input/select-input-new-version/register-select-input-new-version";
import { ComponentLoader } from "@/components/ui/loader/component-loader/component-loader";
import ModalHeader from "@/components/ui/modal-wrapper/modal-header";
import Modal from "@/components/ui/modal-wrapper/modal-wrapper";
import { formatSelectOptions } from "@/helpers/format-select-options";
import { getTranslatedValue } from "@/helpers/get-translated-value";
import { useCreateNewFilterProfileDeviceTrendAnalysis, useUpdateFilterProfileDeviceTrendAnalysis } from "@/hooks/useCreateNewFilterProfileDeviceTrendAnalysis";
import { fetchAllFilterProfiles, fetchFilterProfileFieldValues } from "@/services/reports/filter-profiles-apis";
import { fetchDevicesListLookup } from "@/services/system-administration/definitions/derived-values";
import { handleChangeDateFilter } from "@/store/features/date-filter-slice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function AnalysisTableContentProfileHeader({
    canCreateChart,
    chartIsLoading
}: {
    canCreateChart: boolean;
    chartIsLoading: boolean;
}) {

    const { setValue, getValues, register, handleSubmit, control, formState: { errors } } = useFormContext()

    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [nameModal, setNameModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteProfileId, setDeleteProfileId] = useState<number | null>(null);

    // Form for profile name modal
    // const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<any>();

    const { data, isLoading: isLoadingProfiles } = useQuery({
        queryKey: ['profiles', 'plants-trend-analysis'],
        queryFn: () => fetchAllFilterProfiles({ filter: 'plants-trend-analysis' }),
        retry: false
    });

    // Fetch devices data for converting device IDs to device objects
    const { data: devicesData } = useQuery({
        queryKey: ['derived values device list'],
        queryFn: fetchDevicesListLookup,
        retry: false,
    });

    const { mutate: mutateCreate, isPending: isCreatePending } =
        useCreateNewFilterProfileDeviceTrendAnalysis({
            invalidateQueries: () => {
                queryClient.invalidateQueries({ queryKey: ['profiles', 'plants-trend-analysis'] });
            },
            resetAddState: (data: any) => {
                setNameModal(false);
                setValue('profileId', data?.id);
                setValue('profileName', data?.displayName);
            },
        });

    const { mutate: mutateUpdate, isPending: isUpdatePending } =
        useUpdateFilterProfileDeviceTrendAnalysis();

    const prepareFormData = (profileName: string) => {
        // Get current form values from parent form
        const currentFormValues = getValues();

        // Map chart type names to API format
        const chartTypeMap: Record<string, string> = {
            'ProductionComparisonGraphs': 'ProductionComparison',
            'HeatMapGraphs': 'HeatMap',
            'ProductionForecastGraphs': 'ProductionForecast',
            'InstantDataChart': 'InstantValue',
            'SensorDataGraphs': 'SensorData',
        };

        // Prepare the data for API call
        const modifiedData = {
            profileName: profileName,
            reportType: currentFormValues.reportType || 'plants-trend-analysis',
            filterProfileFields: currentFormValues.filterProfileFields?.map((elem: any) => {
                // Handle SelectedGraphs - convert array of {type: string} to semicolon-separated string
                if (elem.fieldName === 'SelectedGraphs' && Array.isArray(elem.fieldValue)) {
                    const graphTypes = elem.fieldValue
                        .map((item: any) => {
                            const type = item.type || item;
                            return chartTypeMap[type] || type;
                        })
                        .filter(Boolean)
                        .join(';');
                    return {
                        ...elem,
                        fieldValue: graphTypes,
                    };
                }

                // Handle SelectedDevices - convert array of device objects to semicolon-separated IDs
                if (elem.fieldName === 'SelectedDevices' && Array.isArray(elem.fieldValue)) {
                    const deviceIds = elem.fieldValue
                        .map((device: any) => device.id || device._id || device)
                        .filter(Boolean)
                        .join(';');
                    return {
                        ...elem,
                        fieldValue: deviceIds,
                    };
                }

                // For other fields, convert to string if not already
                return {
                    ...elem,
                    fieldValue: String(elem?.fieldValue || ''),
                };
            }) || [],
        };

        return modifiedData;
    };

    const onSubmitCreate = (data: any) => {
        const modifiedData = prepareFormData(data.profileName);
        mutateCreate(modifiedData);
    };

    const onSubmitUpdate = (data: any) => {
        const modifiedData = prepareFormData(data.profileName);
        const updateData = {
            ...modifiedData,
            profileId
        };

        mutateUpdate(updateData, {
            onSuccess: () => {
                setNameModal(false);
                queryClient.invalidateQueries({ queryKey: ['profiles', 'plants-trend-analysis'] });
            },
        });
    };

    const handleOpenModal = () => {
        setNameModal(true);
        // if (!profileId) {
        //     reset({ profileName: '' });
        // }
    };

    const profileId = useWatch({
        control,
        name: 'profileId',
    });

    const { data: filterProfileData } = useQuery({
        queryKey: ['filter-profile-fields-by-profile-id', profileId],
        queryFn: () =>
            fetchFilterProfileFieldValues({
                filter_profile_id: profileId?.toString() || '',
            }),
        retry: false,
        enabled: !!(profileId !== 0 && profileId),
    });

    // Update parent form when filterProfileData changes
    useEffect(() => {
        // Support both array format and object with items property
        const fieldsArray = Array.isArray(filterProfileData)
            ? filterProfileData
            : filterProfileData?.items;

        if (!fieldsArray || !devicesData) return;

        // Map chart type names from API format to internal format
        const reverseChartTypeMap: Record<string, string> = {
            'ProductionComparison': 'ProductionComparisonGraphs',
            'HeatMap': 'HeatMapGraphs',
            'ProductionForecast': 'ProductionForecastGraphs',
            'InstantValue': 'InstantDataChart',
            'SensorData': 'SensorDataGraphs',
        };

        // Process filterProfileFields
        const processedFields = fieldsArray.map((field: any) => {
            // Handle SelectedGraphs - convert semicolon-separated string to array of {type: string}
            if (field.fieldName === 'SelectedGraphs' && typeof field.fieldValue === 'string') {
                const graphTypes = field.fieldValue
                    .split(';')
                    .filter(Boolean)
                    .map((type: string) => ({
                        type: reverseChartTypeMap[type.trim()] || type.trim(),
                    }));
                return {
                    ...field,
                    fieldValue: graphTypes,
                };
            }

            // Handle SelectedDevices - convert semicolon-separated IDs to array of device objects
            if (field.fieldName === 'SelectedDevices' && typeof field.fieldValue === 'string') {
                const deviceIds = field.fieldValue.split(';').filter(Boolean);
                const deviceObjects = deviceIds
                    .map((id: string) => {
                        const deviceId = parseInt(id.trim(), 10);
                        const device = devicesData.find((d: any) => d.id === deviceId);
                        if (device) {
                            return {
                                ...device,
                                _id: device.id,
                            };
                        }
                        return null;
                    })
                    .filter(Boolean);
                return {
                    ...field,
                    fieldValue: deviceObjects,
                };
            }

            // For other fields, keep as is
            return field;
        });

        // Update parent form
        setValue('filterProfileFields', processedFields);

        // Update Redux store with Date and PeriodType from profile
        const dateField = fieldsArray.find((field: any) => field.fieldName === 'Date');
        const periodTypeField = fieldsArray.find((field: any) => field.fieldName === 'PeriodType');

        if (dateField?.fieldValue || periodTypeField?.fieldValue) {
            dispatch(
                handleChangeDateFilter({
                    period_type: periodTypeField?.fieldValue || 'Daily',
                    inserted_date: dateField?.fieldValue || new Date().toISOString().split('T')[0],
                }),
            );
        }
    }, [filterProfileData, devicesData, setValue, dispatch]);

    // useEffect(() => {
    //     if (data) {
    //         const profileName = data?.items?.find((item: any) => item.id === profileId)?.displayName;
    //         setValue('profileName', profileName || '');
    //     }
    // }, [data, setValue, profileId]);

    const isPending = isCreatePending || isUpdatePending;

    // Delete Profile
    const handleDelete = (option: any) => {
        setDeleteModal(true);
        setDeleteProfileId(option.value);
    };

    return (
        <>
            <div className="org-trace__analysis-table-content-profile-header">
                <span>
                    {getTranslatedValue('ProfilesAndFilters')}
                </span>
                <div className="row">
                    <RegisterSelectInputNewVersion
                        register={register}
                        control={control}
                        name="profileId"
                        onOptionDelete={handleDelete}
                        options={formatSelectOptions(data)}
                        error={(errors?.profileName?.message as string) || undefined}
                        setShowModal={setNameModal}
                        mainClass="org-trace__analysis-table-content-profile-header-select"
                        isSearchable
                        isLoading={isLoadingProfiles}
                        placeholder={getTranslatedValue('SelectProfile')}
                    />
                    {profileId ? (
                        <>
                            <Button
                                disabled={chartIsLoading || isUpdatePending}
                                onClick={() => handleSubmit(onSubmitUpdate)()}
                                variant="secondary-blue"
                            >
                                <div className="row">
                                    {
                                        isUpdatePending ?
                                            <ComponentLoader variant="secondary" /> :
                                            <Save size={18} />
                                    }
                                    {getTranslatedValue('EditProfile')}
                                </div>
                            </Button>
                            <Button
                                disabled={chartIsLoading || isCreatePending}
                                onClick={handleOpenModal}
                                variant="secondary-blue"
                            >
                                <div className="row">
                                    {
                                        isCreatePending ?
                                            <ComponentLoader variant="secondary" /> :
                                            <Plus size={18} />
                                    }
                                    {getTranslatedValue('SaveAsNewProfile')}
                                </div>
                            </Button>
                        </>
                    ) : (
                        <Button
                            disabled={!canCreateChart || chartIsLoading}
                            onClick={handleOpenModal}
                            variant="secondary-blue"
                        >
                            <div className="row">
                                <Plus size={18} />
                                {getTranslatedValue('NewProfile')}
                            </div>
                        </Button>
                    )}
                </div>
            </div>

            {nameModal && (
                <Modal
                    isOpen={nameModal}
                    onClose={() => setNameModal(false)}
                    modalSize="sm"
                    showCloseButton={false}
                >
                    <form
                        className="global-modal"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(onSubmitCreate)();
                        }}
                    >
                        <ModalHeader
                            isSave
                            label={profileId ? getTranslatedValue('SaveAsNewProfile') : getTranslatedValue('CreateNewProfile')}
                            setShowModal={setNameModal}
                        />

                        <div className="report-name-form">
                            <RegisterInput
                                name={'profileName'}
                                label={getTranslatedValue('ProfileName')}
                                type={'text'}
                                required={true}
                                placeholder={getTranslatedValue('EnterProfileName')}
                                error={errors?.profileName?.message as string | undefined}
                                register={register}
                            />
                        </div>

                        <SubmitOrCancelButtons
                            handleCancelForm={() => {
                                setNameModal(false);
                            }}
                            isPending={isPending}
                            confirmButtonText={getTranslatedValue('Save')}
                        />
                    </form>
                </Modal>
            )}

            {deleteModal &&
                <Modal
                    modalSize="sm"
                    isOpen={!!deleteModal}
                    onClose={() => {
                        setDeleteModal(false);
                        setDeleteProfileId(null);
                    }}
                >
                    <SureDeleteModal
                        setShowModal={setDeleteModal}
                        multiQueryKey={['profiles', 'plants-trend-analysis']}
                        queryKey="profile"
                        deleteItemUrl={`app/filter-profiles/${deleteProfileId}?api-version=${import.meta.env.VITE_API_VERSION}`}
                    />
                </Modal>
            }
        </>
    )
}
