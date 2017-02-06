importScripts(
    'vendor/underscore/underscore-min.js',
    'vendor/backbone/backbone-min.js',
    'src/analysers/elapse-time-trend/data/hit.js',
    'src/analysers/elapse-time-trend/data/period.js',
    'src/analysers/elapse-time-trend/data/result.js',
    'src/analysers/elapse-time-trend/factory/period.js',
    'src/analysers/elapse-time-trend/factory/result.js',
    'src/analysers/elapse-time-trend/analyser.js',
    'src/analysers/hot-cold-trend/data/hit.js',
    'src/analysers/hot-cold-trend/data/period.js',
    'src/analysers/hot-cold-trend/data/result.js',
    'src/analysers/hot-cold-trend/data/rising.js',
    'src/analysers/hot-cold-trend/factory/period.js',
    'src/analysers/hot-cold-trend/factory/result.js',
    'src/analysers/hot-cold-trend/factory/rising.js',
    'src/analysers/hot-cold-trend/analyser.js',
    'src/analysers/number-aggregator.js',
    'src/analysers/number-extractor.js',
    'src/analysers/number-sorter.js',
    'src/analysers/suggestions.js',
    'src/audit/data.js',
    'src/audit/table.js',
    'src/audit/table-builder.js',
    'src/collections/number.js'
);

addEventListener('message', function(event) {
    var self = this, start, table, builder;

    if (!event.data.hasOwnProperty('start')) {
        return;
    }

    // ok, this is the start message - run the audit
    builder = new AuditTableBuilder();
    builder.on('started', function (event) {
        self.postMessage({
            audits: event.count
        });
    });
    builder.on('processed', function () {
        self.postMessage({
            processed: 1
        });
    });

    start = event.data.start;
    table = builder.get(
        start.numbers,
        start.drawSize,
        start.drawsPerWeek,
        start.draws
    );

    // send result
    postMessage({
       done: table
    });
});
