import { useEffect, useState } from "react";

interface PreloadState {
  loaded: number;
  failed: number;
  total: number;
  isComplete: boolean;
  progress: number;
}

/**
 * Preloads images in the background
 * Returns loading state and progress
 */
export function useImagePreload(imageUrls: string[]): PreloadState {
  const [state, setState] = useState<PreloadState>({
    loaded: 0,
    failed: 0,
    total: imageUrls.length,
    isComplete: false,
    progress: 0,
  });

  useEffect(() => {
    if (imageUrls.length === 0) {
      setState({
        loaded: 0,
        failed: 0,
        total: 0,
        isComplete: true,
        progress: 100,
      });
      return;
    }

    let loadedCount = 0;
    let failedCount = 0;
    const total = imageUrls.length;

    const updateState = () => {
      const completed = loadedCount + failedCount;
      setState({
        loaded: loadedCount,
        failed: failedCount,
        total,
        isComplete: completed === total,
        progress: Math.round((completed / total) * 100),
      });
    };

    // Preload images using Image objects
    imageUrls.forEach((url) => {
      const img = new Image();

      img.onload = () => {
        loadedCount++;
        updateState();
      };

      img.onerror = () => {
        failedCount++;
        updateState();
      };

      // Start loading
      img.src = url;
    });
  }, [imageUrls]);

  return state;
}

/**
 * Preload a batch of images with priority support
 * First batch loads immediately, rest load after
 */
export function useImagePreloadBatched(
  imageUrls: string[],
  priorityCount: number = 12
): PreloadState & { priorityComplete: boolean } {
  const [priorityComplete, setPriorityComplete] = useState(false);
  const [state, setState] = useState<PreloadState>({
    loaded: 0,
    failed: 0,
    total: imageUrls.length,
    isComplete: false,
    progress: 0,
  });

  useEffect(() => {
    if (imageUrls.length === 0) {
      setState({
        loaded: 0,
        failed: 0,
        total: 0,
        isComplete: true,
        progress: 100,
      });
      setPriorityComplete(true);
      return;
    }

    let loadedCount = 0;
    let failedCount = 0;
    let priorityLoadedCount = 0;
    const total = imageUrls.length;
    const priorityUrls = imageUrls.slice(0, priorityCount);
    const remainingUrls = imageUrls.slice(priorityCount);

    const updateState = () => {
      const completed = loadedCount + failedCount;
      setState({
        loaded: loadedCount,
        failed: failedCount,
        total,
        isComplete: completed === total,
        progress: Math.round((completed / total) * 100),
      });
    };

    const loadImage = (url: string, isPriority: boolean) => {
      const img = new Image();

      img.onload = () => {
        loadedCount++;
        if (isPriority) {
          priorityLoadedCount++;
          if (priorityLoadedCount >= priorityUrls.length) {
            setPriorityComplete(true);
            // Load remaining images after priority batch
            remainingUrls.forEach((u) => loadImage(u, false));
          }
        }
        updateState();
      };

      img.onerror = () => {
        failedCount++;
        if (isPriority) {
          priorityLoadedCount++;
          if (priorityLoadedCount >= priorityUrls.length) {
            setPriorityComplete(true);
            remainingUrls.forEach((u) => loadImage(u, false));
          }
        }
        updateState();
      };

      img.src = url;
    };

    // Load priority images first
    priorityUrls.forEach((url) => loadImage(url, true));

    // If no priority images, load all
    if (priorityUrls.length === 0) {
      remainingUrls.forEach((url) => loadImage(url, false));
      setPriorityComplete(true);
    }
  }, [imageUrls, priorityCount]);

  return { ...state, priorityComplete };
}
