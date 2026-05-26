import { SvgProps } from '@/types/icons';

export const EmailsSvg = ({
  width = '32',
  height = '32',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.18133 6.72656H25.8173C27.0227 6.72656 28 7.7039 28 8.90923V23.0906C28 24.2959 27.0227 25.2719 25.8187 25.2719H6.18133C4.97733 25.2732 4 24.2959 4 23.0906V8.90923C4 7.7039 4.97733 6.72656 6.18133 6.72656Z"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.15869 8.1007L14.4174 15.438C15.344 16.1007 16.5894 16.102 17.5174 15.4407L27.8347 8.08203"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
