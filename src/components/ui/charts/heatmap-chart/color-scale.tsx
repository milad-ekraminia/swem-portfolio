import { memo, useEffect, useRef, useState } from 'react';
import { MovementHeatmapSVG } from '@/assets/icons/movement-heatmap-svg';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';

const MemoColorScale = ({
  minValue,
  maxValue,
  minFilter,
  maxFilter,
  setMinFilter,
  setMaxFilter,
}: {
  minValue: number;
  maxValue: number;
  minFilter: number;
  maxFilter: number;
  setMinFilter: (value: number) => void;
  setMaxFilter: (value: number) => void;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [draggingThumb, setDraggingThumb] = useState<null | 'min' | 'max'>(
    null,
  );

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingThumb) return;
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left;
    const percentage = Math.min(1, Math.max(0, newX / rect.width));
    const newValue = Math.round(percentage * (maxValue - minValue) + minValue);

    if (draggingThumb === 'min') {
      setMinFilter(Math.min(newValue, maxFilter - 1));
    } else {
      setMaxFilter(Math.max(newValue, minFilter + 1));
    }
  };

  const handleMouseUp = () => {
    setDraggingThumb(null);
  };

  useEffect(() => {
    if (draggingThumb) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingThumb]);

  return (
    <div className="heatmap-color-slider" ref={sliderRef}>
      <span className="scale-label">{formatNumberWithCommas(minValue, 0)}</span>

      <div className="slider-container">
        <div className="scale-bar"></div>

        <div
          className="slider-thumb left"
          style={{
            left: `${((minFilter - minValue) / (maxValue - minValue)) * 100}%`,
          }}
          onMouseDown={() => setDraggingThumb('min')}
        >
          <MovementHeatmapSVG />
        </div>

        <div
          className="slider-thumb right"
          style={{
            left: `${((maxFilter - minValue) / (maxValue - minValue)) * 100}%`,
          }}
          onMouseDown={() => setDraggingThumb('max')}
        >
          <MovementHeatmapSVG />
        </div>
      </div>

      <span className="scale-label">{formatNumberWithCommas(maxValue, 3)}</span>
    </div>
  );
};

const ColorScale = memo(MemoColorScale);

export default ColorScale;
