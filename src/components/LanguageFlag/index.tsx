import React from 'react';

interface LanguageFlagProps {
  language: LanguageType;
}

/**
 * Order should match with "assets/sprites/language-flags.png" sprite.
 * @todo Only has first 4 flags
 */
const LANGUAGES = ['null', 'it', 'de', 'en'] as const;

export type LanguageType = (typeof LANGUAGES)[number];

function LanguageFlag({ language }: LanguageFlagProps) {
  const flagIndex = LANGUAGES.indexOf(language);

  if (flagIndex === -1) {
    return null;
  }

  const background = `url(/assets/sprites/language-flags.png) -${11 * flagIndex}px 0`;

  return (
    <div
      style={{
        content: '""',
        width: '11px',
        height: '11px',
        background: background,
        marginLeft: '-10px',
        marginRight: '11px',
      }}
    />
  );
}

export default LanguageFlag;
