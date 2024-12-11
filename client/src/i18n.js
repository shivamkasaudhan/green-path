import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import  { initReactI18next } from 'react-i18next';

i18n.use(languageDetector).use(initReactI18next).init({
    debug:true,
    lng:'en',
    resources:{
        en:{
            translation:{
                intro:"this is client side"
            }
        },
        hi:{
            translation:{
                intro:"यह ग्राहक पक्ष है "
            }

        }
    }
});