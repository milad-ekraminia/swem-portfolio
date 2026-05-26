import { SvgProps } from '@/types/icons';

export const PinSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = 'var(--brand-600)',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        d="M10.0007 10.8334C11.3814 10.8334 12.5007 9.71413 12.5007 8.33342C12.5007 6.9527 11.3814 5.83341 10.0007 5.83341C8.61994 5.83341 7.50065 6.9527 7.50065 8.33342C7.50065 9.71413 8.61994 10.8334 10.0007 10.8334Z"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0007 18.3334C13.334 15.0001 16.6673 12.0153 16.6673 8.33342C16.6673 4.65152 13.6825 1.66675 10.0007 1.66675C6.31875 1.66675 3.33398 4.65152 3.33398 8.33342C3.33398 12.0153 6.66732 15.0001 10.0007 18.3334Z"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
