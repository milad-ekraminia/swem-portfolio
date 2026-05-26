import { SvgProps } from '@/types/icons';

export const SecuritySvg = ({
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
        d="M9.33325 17.9987H16.6666"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33325 22.6667H13.3333"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 28H6.66667C5.19333 28 4 26.8067 4 25.3333V6.66667C4 5.19333 5.19333 4 6.66667 4H22.6667C24.14 4 25.3333 5.19333 25.3333 6.66667V12"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.3641 17.5524L27.7574 16.9457C27.2361 16.4244 26.3921 16.4244 25.8721 16.9457L17.5028 25.319C17.3774 25.4444 17.3081 25.6137 17.3081 25.7897V28.0017H19.5201C19.6974 28.0017 19.8668 27.931 19.9908 27.807L28.3641 19.4377C28.8854 18.9164 28.8854 18.0724 28.3641 17.5524Z"
        stroke="#323232"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.33325 11.6013V8.66797H14.6666V11.6013L11.9999 13.7346L9.33325 11.6013Z"
        stroke="#323232"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
