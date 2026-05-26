import Table from '@/components/ui/table/table';
import { FirmWeatherDataLocationTableColumns as basicColumns } from '@/enum-data/definitions/firm-weather-data-location-table-columns';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import {
  fetchFirmWeatherDataLocationOWMSList,
  fetchFirmWeatherDataLocationsList,
} from '@/services/definitions/firm-weather-data-location/firm-weather-data-location-api';
import { ISort } from '@/types/components/ui/table';
import { useQueries } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import { FirmWeatherDataLocationTableHeader } from './table-header';

const FirmWeatherDataLocationTable = ({
  setNewItem,
}: {
  setNewItem?: (value: boolean) => void;
}) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);

  const { downloadHandler, isExcelDownloading } = useDownloadFile();

  const results = useQueries({
    queries: [
      {
        queryKey: [
          'fetch firm weather data location oWMS list',
          currentPage,
          pageSize,
          searchInputValue,
        ],
        queryFn: () =>
          fetchFirmWeatherDataLocationOWMSList({
            skipCount: currentPage * pageSize,
            maxResultCount: pageSize,
            filterText: searchInputValue,
          }),
        retry: false,
      },
      {
        queryKey: ['fetch firm weather data locations list', currentPage],
        queryFn: () =>
          fetchFirmWeatherDataLocationsList({
            skipCount: currentPage * pageSize,
            maxResultCount: pageSize,
          }),
        retry: false,
      },
    ],
  });

  // Destructure results
  const [
    firmWeatherDataLocationOWMSListResult,
    firmWeatherDataLocationsListResult,
  ] = results;
  const { data, isLoading } = firmWeatherDataLocationOWMSListResult;
  const {
    data: firmWeatherDataLocationsListData,
    isLoading: firmWeatherDataLocationsLoader,
  } = firmWeatherDataLocationsListResult;

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        queryKey: 'fetch firm weather data location oWMS list',
        firmWeatherDataLocationsListData:
          firmWeatherDataLocationsListData?.items ?? [],
      }),
    [firmWeatherDataLocationsListData, data],
  );

  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

  const handleDownload = () => {
    downloadHandler({
      excelUrl: 'app/firm-weather-data-location-oWMS/as-excel-file',
      fileName: getTranslatedValue('FirmWeatherDataLocation'),
      searchInputValue,
      getTokenUrl: 'app/firm-weather-data-location-oWMS/download-token',
    });
  };

  const header = useMemo(
    () => (
      <FirmWeatherDataLocationTableHeader
        searchInputHandler={searchInputHandler}
        setNewItem={setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
      />
    ),
    [searchInputValue, isExcelDownloading],
  );

  return (
    <Table
      data={data?.items ?? []}
      columns={memoizedBaseColumns}
      maxHeight="650px"
      isLoading={isLoading || firmWeatherDataLocationsLoader}
      headerChildren={header}
      totalCount={data?.totalCount ?? 0}
      pageChangeHandler={setCurrentPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      setSorting={setSortData}
      sorting={sortData}
      lastColumnSticky
      setPageSize={setPageSize}
      pageSize={pageSize}
    />
  );
};

export default memo(FirmWeatherDataLocationTable);
