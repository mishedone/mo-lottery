/* */

function YearLoader() {}

YearLoader.prototype = {
    constructor: YearLoader,
    load: function () {
        // ok - let's throw in some ideas what do we want here...
        // if (!localStorage.databaseIsLoaded)
        // - load available years
        // - foreach (availableYears as year) load and save if not present in localStorage
        // else
        // - if (!localStorage.currentYearLoadedToday)
        // - - load current year and overwrite
    }
};