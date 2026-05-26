import { FilterSvg } from '@/assets/icons/filter-svg';
import { SortSvg } from '@/assets/icons/sort-svg';
import { Button } from '@/components/ui/button/button';
import { PortalDropdownWrapper } from '@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { ISort } from '@/types/components/ui/table';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import React, { useRef } from 'react';

interface IHeaderProps {
  headerGroups: HeaderGroup<any>[];
  data: any;
  selectRowsHandler?: (id: number, isAll?: boolean) => void;
  hasCheckbox: boolean;
  selectedRows?: number[];
  hasRadio: boolean;
  lastColumnSticky: boolean;
  handleSortClick?: (columnId: string, sortName: string) => void;
  sorting?: ISort;
}

const TableHeaderMemo = ({
  headerGroups,
  selectRowsHandler,
  hasCheckbox,
  selectedRows,
  data,
  hasRadio,
  lastColumnSticky,
  sorting,
  handleSortClick,
}: IHeaderProps) => {
  const thRef = useRef<HTMLTableCellElement>(null);

  const checkCategoryStatus = () => {
    const total = data?.length ?? 0;
    const activeCount = selectedRows?.length ?? 0;

    if (total === 0) return 'deactive';
    if (activeCount === total) return 'active';
    if (activeCount === 0) return 'deactive';
    return 'semi';
  };
  const onFilterChange = (id: number, value: number | string) => {
    console.log(id, value);
  };
  return (
    <thead className="table-head" data-testid="header">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className="table-head__row">
          {headerGroup.headers.map((header, index) => {
            const filterComponent =
              (header?.column?.columnDef as any)?.filterComponent || null;
            const currentSort = sorting?.find((s) => s.id === header.column.id);
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  width: header.getSize(),

                  position:
                    index === headerGroup.headers.length - 1 && lastColumnSticky
                      ? 'sticky'
                      : undefined,
                  right:
                    index === headerGroup.headers.length - 1 && lastColumnSticky
                      ? 0
                      : undefined,
                  zIndex: 10,
                  background: lastColumnSticky ? 'white' : undefined,
                  padding: lastColumnSticky ? '0 10px' : 0,
                }}
                ref={thRef}
              >
                {header.isPlaceholder ? null : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    {hasCheckbox && index == 0 ? (
                      <td>
                        <Checkbox
                          onClick={(e) => e.stopPropagation()} // Prevent sorting
                          onChange={() => {
                            if (!data || data.length === 0) return;
                            if (hasCheckbox && selectRowsHandler) {
                              selectRowsHandler(-1, true);
                            }
                          }}
                          checked={
                            checkCategoryStatus() == 'active' ||
                            checkCategoryStatus() == 'semi'
                          }
                          status={checkCategoryStatus()}
                        />
                      </td>
                    ) : null}
                    {hasRadio && index == 0 ? <td></td> : null}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                )}
                {filterComponent && (
                  <PortalDropdownWrapper
                    toggleBtn={<FilterSvg />}
                    closeButton={false}
                    bottomButtons={
                      <div>
                        <Button variant="primary">Filtre</Button>
                        <Button variant="secondary">Sil</Button>
                      </div>
                    }
                  >
                    {filterComponent((value: string | number) =>
                      onFilterChange(Number(header.column.id), value),
                    )}
                  </PortalDropdownWrapper>
                )}
                {(header.column.columnDef as any).sort && sorting && (
                  <div
                    className={`sort-icon`}
                    onClick={() =>
                      handleSortClick?.(
                        header.column.id,
                        (header.column.columnDef as any).sort,
                      )
                    }
                  >
                    <SortSvg stroke={currentSort ? '#344054' : '#98A2B3'} />
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
const TableHeader = React.memo(TableHeaderMemo);

export default TableHeader;
