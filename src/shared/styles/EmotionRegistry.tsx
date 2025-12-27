'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';

const createEmotionCache = () => {
  const cache = createCache({ key: 'css', prepend: true });
  cache.compat = true;
  return cache;
};

const EmotionRegistry = ({ children }: PropsWithChildren) => {
  const [cache] = useState(createEmotionCache);

  useServerInsertedHTML(() => {
    const insertedStyles = Object.entries(cache.inserted).filter(
      ([, value]) => typeof value === 'string',
    );

    const names = insertedStyles.map(([key]) => key).join(' ');
    const styles = insertedStyles.map(([, value]) => value).join(' ');

    return (
      <style
        data-emotion={`${cache.key} ${names}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default EmotionRegistry;
