export default function ErrorContent({ error }: { error: string | null }) {
  return (
    error && (
      <div className="error">
        <span aria-label="error-content" className="error__content">
          {error}
        </span>
      </div>
    )
  );
}
