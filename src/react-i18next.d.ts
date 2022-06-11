import 'react-i18next';
import english from './i18n/english/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'english';
    resources: {
      english: typeof english;
    };
  }
}
