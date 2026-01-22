export const useUtilStore = defineStore("utilStore", () => {
    function stringKeySorter(a: string, b: string) {
        const stringA = a.toUpperCase(); // ignore upper and lowercase
        const stringB = b.toUpperCase(); // ignore upper and lowercase
        if (stringA < stringB) {
            return -1;
        }
        if (stringA > stringB) {
            return 1;
        }

        // names must be equal
        return 0;
    }
    return { stringKeySorter }
})