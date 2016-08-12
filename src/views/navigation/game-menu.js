var NavigationGameMenuView = Backbone.View.extend({
    template: _.template($('#navigation-game-menu').html()),
    fragment: '',
    game: {},

    initialize: function (options) {
        this.game = options.game;
    },
    
    render: function () {
        this.$el.html(this.template({
            game: this.game,
            suggestionsClass: this.getClass('suggestions'),
            browseClass: this.getClass('browse')
        }));

        return this;
    },
    
    setFragment: function (fragment) {
        this.fragment = fragment;
    },

    setGame: function (game) {
        this.game = game;
    },
    
    getClass: function (search) {
        if (this.fragment.indexOf(search) == 0) {
            return ' class="active"';
        }
        
        return '';
    }
});