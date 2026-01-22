export type Language = "en" | "da"
export const useLanguageStore = defineStore("languageStore", () => {
    enum Languages {
        English = "en",
        Danish = "da"
    }
    const languageOrder: Languages[] = [
        Languages.English,
        Languages.Danish
    ]
    // interface ILanguage {
        
    // }
    // const languageMap = new Map<Languages, ILanguage>()
    const languages = [
        {
            label: 'English',
            value: Languages.English
        },
        {
            label: 'Dansk',
            value: Languages.Danish
        }
    ]
    const languageByCode = {
        "da": Languages.Danish,
        "en": Languages.English
    }
    // const retrievedLangCode = Number(localStorage.getItem("lang") || 0)
    // const language = ref(languageOrder[retrievedLangCode] || Languages.English)
    const language = ref(Languages.English)
    function t(text: string | undefined) {
        if (text == undefined) return "";
        const split = text.split("||")
        return split[Math.min(languageOrder.indexOf(language.value), split.length - 1)] as string
    }
    return {language, t, Languages, languages, languageByCode, languageOrder}
})