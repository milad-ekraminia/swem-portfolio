import React, { useEffect, useRef, useState } from 'react';
import { DotsGridSvg } from '@/assets/icons/dots-grid-svg';
import { SearchSvg } from '@/assets/icons/search-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { Input } from '@/components/ui/input/Input';

interface SearchContentProps {
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColumnKeys: string[];
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  resetSignal?: number;
  columns: {
    accessorKey: string;
    header: string;
  }[];
}

const SortableItem: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const FilterContent = ({
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  resetSignal,
  columns,
}: SearchContentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const prevReset = useRef<number>(resetSignal ?? 0);

  useEffect(() => {
    // Run reset only when resetSignal *actually changes*
    if (resetSignal !== undefined && resetSignal !== prevReset.current) {
      setSelectedColumnKeys(columns.map((col) => col.accessorKey));
      setColumnOrder(columns.map((col) => col.accessorKey));
      prevReset.current = resetSignal; // update the last seen value
    }
  }, [resetSignal]);
  // useEffect(() => {
  //   setSelectedColumnKeys(columns.map((col) => col.accessorKey));
  //   setColumnOrder(columns.map((col) => col.accessorKey));

  // }, [resetSignal]);

  const toggleColumn = (accessorKey: string, isAll = false) => {
    if (isAll) {
      if (selectedColumnKeys.length === columns.length) {
        setSelectedColumnKeys([]);
      } else {
        setSelectedColumnKeys(columns.map((col) => col.accessorKey));
      }
    } else {
      if (selectedColumnKeys.includes(accessorKey)) {
        setSelectedColumnKeys(
          selectedColumnKeys.filter((key) => key !== accessorKey),
        );
      } else {
        setSelectedColumnKeys([...selectedColumnKeys, accessorKey]);
      }
    }
  };

  const checkStatus = () => {
    const total = columns.length;
    const activeCount = selectedColumnKeys.length;
    if (activeCount === total) return 'active';
    if (activeCount === 0) return 'deactive';
    return 'semi';
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setColumnOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const orderedColumns = columnOrder
    .map((accessorKey) =>
      columns.find((col) => col.accessorKey === accessorKey),
    )
    .filter(Boolean) as typeof columns;

  const filteredColumns = orderedColumns.filter((col) =>
    col.header.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="export">
      <div className="second-element"></div>
      <Input
        leftIcon={<SearchSvg />}
        placeholder="Arama"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="export__list">
            <SortableItem id="all-select">
              <div className="export__list-item">
                <Checkbox
                  onChange={() => toggleColumn('all', true)}
                  checked={
                    checkStatus() === 'active' || checkStatus() === 'semi'
                  }
                  status={checkStatus()}
                />
                <span>{getTranslatedValue('SelectAll')}</span>
              </div>
            </SortableItem>

            {filteredColumns.map((item) => (
              <SortableItem key={item.accessorKey} id={item.accessorKey}>
                <div className="export__list-item">
                  <DotsGridSvg />
                  <Checkbox
                    onChange={() => toggleColumn(item.accessorKey)}
                    checked={selectedColumnKeys.includes(item.accessorKey)}
                  />
                  <span>{item.header}</span>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default FilterContent;
