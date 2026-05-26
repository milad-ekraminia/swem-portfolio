import { getTranslatedValue } from '@/helpers/get-translated-value';
import useDebounce from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { Input } from '../Input';

const MemoSearchInput = ({
  setSearchInputValue,
  searchInputValue,
}: {
  setSearchInputValue: (value: string) => void;
  searchInputValue: string;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 2000);

  useEffect(() => {
    setSearchValue(searchInputValue);
  }, [setSearchInputValue, searchInputValue]);

  useEffect(() => {
    setSearchInputValue(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchInputValue(searchValue);
  };

  return (
    <form onSubmit={submitHandler} className="dv-search-box">
      <Input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder={getTranslatedValue('search')}
      />
      <Search size={20} color="#667085" className="dv-search-box-icon" />
    </form>
  );
};

const SearchInput = memo(MemoSearchInput);

export default SearchInput;
