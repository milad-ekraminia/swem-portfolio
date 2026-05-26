import React from 'react';

interface StatusTagProps {
  label: React.ReactNode;
  color?: 'success' | 'warning' | 'orange' | 'danger';
}

const getIconColor = (status: any) => {
  if (status === 1)
    // success
    return {
      color: '#067647',
      bg: '#ECFDF3',
      border: '#ABEFC6',
    };
  if (status === 2)
    // warning
    return {
      color: '#B54708',
      bg: '#FFFAEB',
      border: '#FEDF89',
    };
  if (status === 3)
    // orange
    return {
      color: '#B93815',
      bg: '#FEF6EE',
      border: '#F9DBAF',
    };
  if (status === 4)
    // danger
    return {
      color: '#B42318',
      bg: '#FEF3F2',
      border: '#FECDCA',
    };

  return { color: '', bg: '', border: '' };
};

const StatusTagCircle: React.FC<StatusTagProps> = ({
  label,
  color = 'success',
}) => {
  const colors = getIconColor(
    color === 'success'
      ? 1
      : color === 'warning'
        ? 2
        : color === 'orange'
          ? 3
          : 4,
  );
  return (
    <div
      className="status-tag-circle"
      style={{ backgroundColor: colors?.bg, borderColor: colors?.border }}
    >
      {label}
    </div>
  );
};

export default StatusTagCircle;
