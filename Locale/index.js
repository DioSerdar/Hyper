class locale {
    dict = {};
    set = (lang) => {
        let translations = this.__get_language(lang);
        return (object) => {
            this.dict[lang] = { ...translations, ...object };
        }
    }
    __get_language = (lang) => {
        let { [lang]: translations } = this.dict;
        if (!translations)
            return {}
        return translations;
    }
    translate = (lang) => {
        return (key, ...args) => {
            let text = this.__get_language(lang)[key];
            if (!text)
                return `${key} ${lang}`;
            args.forEach((k, i) => {
                text = text.replace("{" + i + "}", k);
            })
            return text;
        }
    }
}



module.exports = locale;