import { memo, useState } from 'react';
import { getCookie } from '@/helpers/cookies';
import { useSelector } from 'react-redux';
import { Loader } from '@/components/ui/loader/loader';

const MemoMimicDiagramPreview = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="product-comparison">
      <div
        className="product-comparison__column-chart"
        style={{ position: 'relative' }}
      >
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 10,
            }}
          >
            <Loader />
          </div>
        )}
        <iframe
          src={`${import.meta.env.VITE_MIMIC_ADDRESS}preview/${treeData?.mimicDiagramId}/?lang=${getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string)}`}
          title="Mimic Diagram"
          width="100%"
          height="100%"
          style={{ border: 'none', minHeight: '500px', overflow: 'auto' }}
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </div>
  );
};

const MimicDiagramPreview = memo(MemoMimicDiagramPreview);

export default MimicDiagramPreview;
