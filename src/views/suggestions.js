var SuggestionsView = Backbone.View.extend({
    template: _.template($('#suggestions').html()),
    numbersTemplate: _.template($('#numbers').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    },
    
    renderHotColdTrend: function (numbers) {
        this.$el.find('.hot-cold-trend').html(this.numbersTemplate({
            numbers: numbers
        }));
        
        return this;
    },
    
    renderElapseTimeTrend: function (numbersByElapseTime, numbersByElapseTimeGap) {
        numbersByElapseTime.sort(this.sortAscending);
        numbersByElapseTimeGap.sort(this.sortAscending);
        
        this.$el.find('.elapse-time-trend').html(this.numbersTemplate({
            numbers: numbersByElapseTime
        }));
        this.$el.find('.elapse-time-gap-trend').html(this.numbersTemplate({
            numbers: numbersByElapseTimeGap
        }));
        
        return this;
    },
    
    sortAscending: function (a, b) {
        return a - b;
    }
});