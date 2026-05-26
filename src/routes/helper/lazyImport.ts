import { lazy } from 'react';

/**
 * Lazy import with retry logic to handle "Failed to fetch dynamically imported module" errors
 * This helps when the browser cache is stale or network issues occur
 */
export function lazyImport<T extends object>(
  factory: () => Promise<T>,
  name?: keyof T,
) {
  return lazy(async () => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const module = await factory();
        return { default: name ? module[name] : (module as any).default };
      } catch (error: any) {
        // Check if it's a chunk loading error
        const isChunkLoadError =
          error?.message?.includes('Failed to fetch') ||
          error?.message?.includes('dynamically imported module') ||
          error?.message?.includes('Importing a module script failed');

        // If it's the last attempt or not a chunk load error, throw the error
        if (attempt === MAX_RETRIES || !isChunkLoadError) {
          // On final failure, try to reload the page to get fresh chunks
          if (isChunkLoadError) {
            console.error(
              `Failed to load module after ${MAX_RETRIES} attempts. Reloading page...`,
              error,
            );
            // Use sessionStorage to prevent reload loops
            const reloadKey = 'chunk-load-reload';
            const reloadCount = Number(
              sessionStorage.getItem(reloadKey) || '0',
            );

            if (reloadCount < 2) {
              sessionStorage.setItem(reloadKey, String(reloadCount + 1));
              window.location.reload();
            } else {
              sessionStorage.removeItem(reloadKey);
              console.error(
                'Max reloads reached. Please clear cache and try again.',
              );
            }
          }
          throw error;
        }

        // Wait before retrying
        console.warn(
          `Chunk load failed (attempt ${attempt}/${MAX_RETRIES}). Retrying...`,
          error,
        );
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * attempt),
        );
      }
    }

    // This should never be reached, but TypeScript needs it
    throw new Error('Unexpected error in lazyImport');
  });
}
