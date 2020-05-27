import { enUS, ko } from "date-fns/locale";

const supportedLocales = { en: enUS, ko };

export default newLocale => {
    const newLocaleName = newLocale.split('-').shift();
    if(supportedLocales[newLocaleName])
        return { locale: supportedLocales[newLocaleName] };

    return { locale: enUS };
}
