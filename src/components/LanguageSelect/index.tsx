import { useT } from 'talkr';
import Button from '~/components/Button';
import Stack from '~/components/Stack';

const SUPPORTED_LOCALES = ['en', 'fi', 'sv'];

/**
 * Not part of the original game.
 */
function LanguageSelect() {
  const { setLocale, locale: currentLocale } = useT();

  const onClick = (locale: string) => {
    localStorage.setItem('locale', locale);
    setLocale(locale);
  };

  return (
    <Stack
      direction="row"
      style={{
        position: 'absolute',
        top: '4px',
        right: '4px',
        gap: '4px',
        fontSize: '12px',
      }}
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <Button
          key={locale}
          onClick={() => onClick(locale)}
          disabled={currentLocale === locale}
          style={{
            width: '50px',
          }}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </Stack>
  );
}

export default LanguageSelect;
