import React, { useId } from 'react';

interface SemiCircleProgressProps {
  /** 0–100 */
  percentage: number;
  /** diameter in px */
  size?: number;
  /** thickness in px */
  strokeWidth?: number;
}

const SemiCircleProgress: React.FC<SemiCircleProgressProps> = ({
  percentage,
  size = 140,
  strokeWidth = 11,
}) => {
  const pct = Math.max(0, Math.min(100, percentage));
  const width = size;
  const height = size / 2;
  const radius = (size - strokeWidth) / 2;
  const halfStroke = strokeWidth / 2;
  const cy = height;
  const arcLen = Math.PI * radius;
  const dashOffset = arcLen * (1 - pct / 100);

  const gradId = useId();

  // Main arc path (outer)
  const pathD = `
    M ${halfStroke},${cy}
    A ${radius},${radius} 0 0 1 ${width - halfStroke},${cy}
  `;

  // Inner dashed arc path (just inside the trail)
  const innerRadius = radius - strokeWidth - 6;
  const innerPathD = `
    M ${halfStroke + (radius - innerRadius)},${cy}
    A ${innerRadius},${innerRadius} 0 0 1 ${width - halfStroke - (radius - innerRadius)
    },${cy}
  `;

  return (
    <div
      className="half-circle-progress"
      style={{ width, height: height + halfStroke }}
    >
      <svg width={width} height={height + halfStroke}>
        <defs>
          {/* <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={0}
            x2={width}
            y2={0}
          >
            <stop offset="0%" stopColor="#2E90FA" />
            <stop offset="100%" stopColor="#47CD89" />
          </linearGradient> */}
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={0}
            x2={width}
            y2={0}
          >
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#ADFF2F" />
            <stop offset="100%" stopColor="#00CED1" />
          </linearGradient>
        </defs>

        {/* Dashed arc (inner) */}
        <path
          className="dashed-inner-arc"
          d={innerPathD}
          fill="none"
          stroke="rgba(0,123,255,1)"
          strokeWidth={2}
          strokeDasharray="2 5"
          strokeLinecap="butt"
        />

        {/* Dashed curve */}
        <path
          className="dash-trail"
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={strokeWidth}
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* Grey background trail */}
        <path
          className="trail"
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Background arc (slightly thicker, behind progress) */}
        <path
          className="bar-background"
          d={pathD}
          fill="none"
          stroke="#E4E7EC"
          strokeWidth={strokeWidth + 2} // thicker than bar
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={0}
        />
        {/* Gradient progress bar */}
        <path
          className="bar"
          d={pathD}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth - 3}
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={dashOffset}
        />
        {/* <path
          className="bar"
          d={pathD}
          fill="none"
          stroke="rgba(200,200,200,1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={Math.PI*size/2}
          strokeDashoffset={0}
        /> */}
      </svg>

      <span className="label">{`${Math.round(pct)}%`}</span>
    </div>
  );
};

export default SemiCircleProgress;
