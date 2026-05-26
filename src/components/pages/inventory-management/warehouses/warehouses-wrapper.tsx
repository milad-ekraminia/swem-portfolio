import { useSearchParams } from 'react-router-dom';
import { BoxesWrapper } from './boxes-wrapper';
import { WareHousesTable } from './warehouses-table';

export const WareHousesWrapper = ({
  setNewItem,
}: {
  setNewItem: (value: boolean) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (value: any) => {
    if (value) {
      searchParams.set('table', 'true'); // update or add `page=2`
    } else {
      searchParams.delete('table');
    }

    setSearchParams(searchParams);
  };
  return (
    <>
      {Object.fromEntries(searchParams.entries())?.table ? (
        <WareHousesTable
          isLoading={false}
          setIsTable={(value: any) => handleSearchParams(value)}
          setNewItem={setNewItem}
        />
      ) : (
        <BoxesWrapper
          setIsTable={(value: any) => handleSearchParams(value)}
          setNewItem={setNewItem}
        />
      )}
    </>
  );
};
