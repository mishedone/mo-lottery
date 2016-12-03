var SuggestionsView = Backbone.View.extend({
    template: _.template($('#suggestions').html()),
    numbersTemplate: _.template($('#numbers').html()),

    render: function () {
        this.$el.html(this.template());

        return this;
    },
    
    renderNumbers: function (hotColdTrend, elapseTimeTrend, elapseTimeTrendGaps) {
        this.$el.find('.hot-cold-trend').html(this.numbersTemplate({
            numbers: hotColdTrend
        }));
        this.$el.find('.elapse-time-trend').html(this.numbersTemplate({
            numbers: elapseTimeTrend
        }));
        this.$el.find('.elapse-time-trend-gaps').html(this.numbersTemplate({
            numbers: elapseTimeTrendGaps
        }));
        
        return this;
    }
});