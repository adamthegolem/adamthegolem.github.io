const months = [
    "January||Januar",
    "February||Februar",
    "March||Marts",
    "April",
    "May||Maj",
    "June||Juni",
    "July||Juli",
    "August",
    "September",
    "October||Oktober",
    "November",
    "December",
]
export const useDateStore = defineStore("dateStore", () => {
    const languageStore = useLanguageStore()
    const { t } = languageStore
    function monthAndYear(dateCode: string) {
        const date = new Date(dateCode)
        return `${t(months[date.getMonth()])} ${date.getFullYear()}`
    }
    function timeSpan(start: string, end: string) {
        // const startDate = new Date(start)
        // const endDate = new Date(end)
        return `${monthAndYear(start)} - ${monthAndYear(end)}`
    }
    return {monthAndYear, timeSpan}
})