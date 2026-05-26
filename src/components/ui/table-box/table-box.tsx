import { useRef } from 'react';
import { getClassNames } from '@/helpers/get-class-names';
import { Loader } from '../loader/loader';
import Box from './box';

const TableBox = <T extends { children?: T[] }>({
  isLoading,
  data,
  renderLoading = () => <Loader />,
  maxHeight = '300px',
  headerChildren,
}: {
  isLoading?: boolean;
  data: any;
  renderLoading?: any;
  maxHeight: string;
  headerChildren?: React.ReactNode;
}) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={getClassNames('table-box-wrapper', [
        [!!headerChildren, 'borderless'],
      ])}
    >
      {headerChildren}
      <div
        ref={tableContainerRef}
        className={`table-box-container`}
        style={{
          maxHeight: maxHeight,
          minHeight: maxHeight,
          overflowY: 'auto',
          overflowX: isLoading ? 'hidden' : 'auto',
        }}
      >
        <div className="table-box-content-wrapper">
          {data?.map((item: any) => {
            return <Box data={item} key={item?.warehouse?.id} />;
          })}
        </div>
        {isLoading ? (
          <div
            className="loading-overlay"
            style={{
              position: 'absolute',
              // top: '50%',
              // left: '50%',
              bottom: 0,
              // transform: 'translate(-50%,-50%) ',
              zIndex: '100',
            }}
          >
            {renderLoading?.()}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TableBox;
