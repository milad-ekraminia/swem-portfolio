import Image from '@/components/ui/image/image';

export default function EmptyContent({ img, height, width }: { img: string, height?: number, width?: number }) {
  return (
    img && (
      <div className="empty">
        <span aria-label="empty-content" className="empty__content" style={{ width: width, height: height }}>
          <Image src={img} alt="empty" />
        </span>
      </div>
    )
  );
}
