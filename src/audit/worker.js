addEventListener('message', function(event) {
    var i, steps, progress, interval;

    if (!event.data.hasOwnProperty('id')) {
        return;
    }

    switch (event.data.id) {
        case 'audit-bst-535':
            steps = 160;
            progress = 20;
            interval = 1000;
            break;
        case 'audit-bst-642':
            steps = 300;
            progress = 10;
            interval = 500;
            break;
        case 'audit-bst-649':
            steps = 3;
            progress = 1;
            interval = 1000;
            break;
        default:
            return;
    }

    postMessage({
        steps: steps
    });

    for (i = 1; i <= (steps / progress); i++) {
        setTimeout(function () {
            postMessage({
                progress: progress
            });
        }, i * interval);
    }
});

