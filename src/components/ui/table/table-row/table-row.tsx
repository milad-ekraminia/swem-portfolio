import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { getCookie } from '@/helpers/cookies';
import { ITableProps } from '@/types/components/ui/table';
import { flexRender, Row } from '@tanstack/react-table';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ITableRowProps<T>
  extends Pick<ITableProps<T>, 'columns'>,
  React.HTMLProps<HTMLTableRowElement> {
  rowIndex: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  row: Row<any>;
  virtualRow: VirtualItem;
  selectRowsHandler?: (id: number, isAll?: boolean) => void;
  hasCheckbox: boolean;
  lastColumnSticky: boolean;
  selectedRows: number[];
  hasRadio?: boolean;
  selectedItem?: number;
  setRadioSelect?: (id: number) => void;
  handleContextMenu?: (
    event: React.MouseEvent<HTMLDivElement>,
    rowId?: number,
  ) => void;
  idKey?: string;
  singleExpand?: string;
  onExpand?: any;
}

const TableRowMemo = <T extends { children?: any[] }>({
  rowIndex,
  rowVirtualizer,
  row,
  virtualRow,
  hasCheckbox,
  selectRowsHandler,
  selectedRows = [],
  hasRadio = false,
  setRadioSelect = () => { },
  selectedItem,
  handleContextMenu,
  idKey,
  lastColumnSticky,
  onExpand,
}: ITableRowProps<T>) => {
  const isExpanded = row.getIsExpanded();
  const rowRef = useRef<HTMLTableRowElement>(null);
  const spanRefs = useRef<(HTMLDivElement | HTMLButtonElement | null)[]>([]);

  const cultureName = getCookie('CultureName') ?? import.meta.env.VITE_CULTURE_NAME as string;

  const [tooltip, setTooltip] = useState({
    content: '',
    top: 0,
    bottom: 0,
    left: 0,
    visible: false,
  });

  useEffect(() => {
    if (rowRef.current) {
      rowVirtualizer.measureElement(rowRef.current);
    }
  }, [isExpanded, rowVirtualizer]);

  const rowId = (row.original as any)?.[idKey ?? 'id'];
  const isChecked = selectedRows.includes(Number(rowId));
  const hasChildren =
    Array.isArray(row.original?.children) && row.original.children.length > 0;
  const isChildRow = row.depth > 0;
  const isStandalone = !hasChildren && !isChildRow;

  let tooltipTimeout: NodeJS.Timeout;

  const showTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 200;
    const centerLeft = rect.left + rect.width / 2 - tooltipWidth / 2;

    setTooltip({
      content: element.textContent ?? '',
      top: rect.top,
      bottom: rect.bottom + 10,
      left: centerLeft,
      visible: true,
    });
  };

  const handleMouseEnter = (_: React.MouseEvent, index: number) => {
    const el = spanRefs.current[index];
    if (!el) return;

    const innerSpan = el.querySelector('span:last-child');
    const lastSpan = innerSpan?.querySelector('span:last-child');

    const isOverflowing = (elem: HTMLElement | null) =>
      elem?.scrollWidth && elem.scrollWidth > elem.clientWidth;

    if (
      isOverflowing(el as HTMLElement) ||
      isOverflowing(lastSpan as HTMLElement)
    ) {
      tooltipTimeout = setTimeout(() => showTooltip(el as HTMLElement), 200);
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(tooltipTimeout);
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      <tr
        ref={rowRef}
        data-index={rowIndex}
        className={`table-row ${isExpanded ? 'expanded' : ''}`}
        id={`row${rowIndex}`}
        style={{
          transform: `translateY(${virtualRow.start}px)`,
        }}
        onContextMenu={(event) => handleContextMenu?.(event, Number(rowId))}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleContextMenu?.(
              event as unknown as React.MouseEvent<HTMLDivElement>,
              Number(rowId),
            );
          }
        }}
        tabIndex={0}
        role="row"
      >
        {row.getVisibleCells().map((cell, cellIndex) => {
          const isLast = cellIndex === row.getVisibleCells().length - 1;

          return (
            <td
              key={cell.id}
              style={{
                width: cell.column.getSize(),
                position: isLast && lastColumnSticky ? 'sticky' : undefined,
                right: isLast && lastColumnSticky ? (cultureName === 'fa' ? undefined : 0) : undefined,
                left: isLast && lastColumnSticky ? (cultureName === 'fa' ? 0 : undefined) : undefined,
                background: isLast && lastColumnSticky ? 'inherit' : undefined,
                zIndex: isLast && lastColumnSticky ? 5 : undefined,
                paddingLeft: lastColumnSticky
                  ? '10px'
                  : (hasChildren && cellIndex === 0) || isStandalone
                    ? '0px'
                    : '20px',
              }}
              onMouseEnter={(e) => handleMouseEnter(e, cellIndex)}
              onMouseLeave={handleMouseLeave}
              className="table-row__cell"
            >
              {hasCheckbox && cellIndex === 0 && (
                <Checkbox
                  checked={isChecked}
                  onChange={() => {
                    if (selectRowsHandler) {
                      selectRowsHandler(Number(rowId));
                    }
                  }}
                />
              )}
              {hasChildren && cellIndex === 0 ? (
                <button
                  className="expand-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    row.getToggleExpandedHandler()?.();
                    if (onExpand) {
                      onExpand(row?.original?.id);
                    }
                  }}
                >
                  {isExpanded ? (
                    <ChevronUp size={20} stroke="#175CD3" />
                  ) : (
                    <ChevronDown size={20} stroke="#667085" />
                  )}
                </button>
              ) : null}
              {hasRadio && cellIndex === 0 ? (
                <input
                  type="radio"
                  checked={selectedItem === rowId}
                  onChange={() => setRadioSelect(rowId)}
                />
              ) : null}

              <div
                ref={(el) => {
                  spanRefs.current[cellIndex] = el;
                }}
                className="cell-content"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block', // ensures it's measurable
                  width: '100%',
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </td>
          );
        })}
      </tr>

      {/* Tooltip Element */}
      {tooltip.visible &&
        createPortal(
          <div
            className="table-row__tooltip"
            style={{
              position: 'fixed',
              top: tooltip.bottom,
              left: tooltip.left,
            }}
          >
            {tooltip.content}
          </div>,
          document.body,
        )}
    </>
  );
};
const TableRow = React.memo(TableRowMemo);
export default TableRow;
