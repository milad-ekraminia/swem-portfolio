import { getClassNames } from '@/helpers/get-class-names';

const TextAreaBox = <T extends { children?: T[] }>({
  headerChildren,
  maxHeight = '300px',
  children,
}: any) => {
  return (
    <div
      className={getClassNames('table-wrapper table-with-form textarea-box', [
        [!!headerChildren, 'borderless'],
      ])}
    >
      {headerChildren}

      <div
        className={`table-container`}
        style={{
          maxHeight: maxHeight,
          overflowY: 'auto',
          overflowX: 'auto',
        }}
      >
        <div className="table-x textarea-box">{children}</div>
      </div>
    </div>
  );
};

export default TextAreaBox;
