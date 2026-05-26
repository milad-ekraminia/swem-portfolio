import { SvgProps } from '@/types/icons';

export const PowerSvg = ({
  width = '16',
  height = '16',
  fill = 'none',
  stroke = "#344054"
}: SvgProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <rect x="1.99609" y="1.99756" width="12.005" height="12.005" rx="5" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.51644 4.86557L5.39089 8.47707C5.31491 8.60393 5.31232 8.76168 5.38412 8.89096C5.45591 9.02024 5.59118 9.10144 5.73904 9.104H7.7292V10.9201C7.72498 11.1046 7.84611 11.2686 8.02371 11.3189C8.20132 11.3691 8.39043 11.2929 8.48351 11.1335L10.6091 7.52334C10.685 7.39648 10.6876 7.23873 10.6158 7.10945C10.544 6.98017 10.4088 6.89897 10.2609 6.89641H8.27076V5.08032C8.27562 4.89554 8.1547 4.73092 7.97691 4.68031C7.79913 4.62969 7.60964 4.70593 7.51644 4.86557Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
