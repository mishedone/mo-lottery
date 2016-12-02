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
        this.$el.find('.elapse-time-trend').html(this.numbersTemplate({
            numbers: numbersByElapseTime
        }) + this.numbersTemplate({
            numbers: numbersByElapseTimeGap
        }));
        
        return this;
    }
});