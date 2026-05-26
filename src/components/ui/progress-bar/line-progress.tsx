import React from 'react';

interface LineProgressProps {
  value: number;
  max: number;
  color?: string;
}

const LineProgress: React.FC<LineProgressProps> = ({
  value,
  max,
  color = '#3498db',
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="line-progress">
      <div className="line-progress__wrapper">
        <div
          className="line-progress__wrapper-bar"
          style={{
            width: `${percent}%`,
            background: color,
          }}
        />
      </div>
      <div className="line-progress__progress" style={{ color }}>
        {percent.toFixed(0)}%
      </div>
    </div>
  );
};

export default LineProgress;
