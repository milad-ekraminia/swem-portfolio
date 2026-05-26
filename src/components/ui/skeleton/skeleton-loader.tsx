export default function SkeletonLoader({
  label = '',
  className = '',
}: Readonly<{
  label?: string;
  className?: string;
}>) {
  return (
    <output className={'skeleton'}>
      <div aria-label="skeleton-loader-box" className={`skeleton__box ${className}`}>
        {label && <h2 className="skeleton__box-label">{label}</h2>}
      </div>
    </output>
  );
}
