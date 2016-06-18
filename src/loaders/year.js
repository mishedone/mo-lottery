function YearLoader() {
    // TODO: consider catching parsing errors so when the data structure is changed app works fine
    this.data = JSON.parse(localStorage.getItem(this.storageKey));

    // local storage is empty so we save some default values
    if (null == this.data) {
        this.data = {
            isLoaded: false
        };

        this.saveData();
    }
}

YearLoader.prototype = {
    constructor: YearLoader,
    storageKey: 'year-loader',

    isLoaded: function () {
        return this.data.isLoaded;
    },

    load: function () {
        if (this.isLoaded()) {
            // if (!localStorage.currentYearLoadedToday)
            // - load current year and overwrite
        } else {
            // load available years
            // foreach (availableYears as year) load and save if not present in localStorage
        }
    },

    saveData: function () {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
};