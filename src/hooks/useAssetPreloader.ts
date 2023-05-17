import { useEffect, useState } from 'react';

const PRELOAD_ASSETS = [
  '/assets/sprites/bg-lobbyselect.gif',
  '/assets/sprites/bg-lobby-single.gif',
  '/assets/sprites/bg-lobby-dual.gif',
  '/assets/sprites/bg-lobby-multi.gif',
  '/assets/sprites/language-flags.png',
];

export function useAssetPreloader() {
  const [loadingAssets, setLoadingAssets] = useState(true);

  useEffect(() => {
    let loadedAssets = 0;

    PRELOAD_ASSETS.forEach((picture) => {
      const img = new Image();
      img.src = picture;
      img.onload = () => {
        loadedAssets++;
        if (loadedAssets === PRELOAD_ASSETS.length) {
          setLoadingAssets(false);
        }
      };
    });
  }, []);

  return loadingAssets;
}
