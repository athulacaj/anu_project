import i18next from 'i18next';
import en from './locales/en/en';
import ml from './locales/ml/ml';
import hi from './locales/hi/hi';
import ta from './locales/ta/ta';

function initLocalize(){
  i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en,
      ml,
      hi,
      ta
    }
  }, function(err, t) {
    console.log('resources loaded ',i18next.t('label_login'));
  });
}

// i18next.init({
//   lng: 'en', // if you're using a language detector, do not define the lng option
//   debug: true,
//   resources: {
//     en,
//     ml
//   }
// }, function(err, t) {
//   console.log('resources loaded ',i18next.t('label_login'));
// });
export default initLocalize;
