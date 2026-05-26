import { SvgProps } from '@/types/icons';

export const WarehouseWithoutParentSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#1570EF',
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 0.5H6C6.82843 0.5 7.5 1.17157 7.5 2V6C7.5 6.82843 6.82843 7.5 6 7.5H2C1.17157 7.5 0.5 6.82843 0.5 6V2C0.5 1.17157 1.17157 0.5 2 0.5Z"
        stroke={stroke}
      />
      <path
        d="M12 14C12 12.8954 12.8954 12 14 12H18C19.1046 12 20 12.8954 20 14V18C20 19.1046 19.1046 20 18 20H14C12.8954 20 12 19.1046 12 18V14Z"
        fill={stroke}
      />
      <path d="M8 4H14C15.1046 4 16 4.89543 16 6V12" stroke={stroke} />
    </svg>
  );
};
