import App from './App';

import { createRoot } from 'react-dom/client';
import { Talkr } from 'talkr';
import en from './i18n/en.json';
import fi from './i18n/fi.json';
import sv from './i18n/sv.json';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Talkr languages={{ en, fi, sv }} defaultLanguage="fi" detectBrowserLanguage>
      <App />
    </Talkr>,
  );
}
