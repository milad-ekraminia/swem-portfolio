import ErrorPageContent from '@/components/pages/error/content';
import ErrorPageImage from '@/components/pages/error/image';

export default function NotFound() {
  return (
    <div className="dv-error">
      <ErrorPageContent />
      <ErrorPageImage />
    </div>
  );
}
