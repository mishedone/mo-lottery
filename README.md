# Lottery analysis and prediction

### Short description

The mo-lottery project aims at implementing various statistical algorithms to analyse
past lottery draws and trying to predict the numbers in the next draw. It consists of two
sub-projects. The first one is a backend readonly API written in pure PHP that provides
endpoints for retrieving supported lottery games information like numbers, draw size, past
draws, etc. The second sub-project is a single-page application built with Backbone.js and
Bootstrap that implements the analysis and prediction algorithms and provides an user
interface for browsing supported games information, auditing algorithm results and checking
the latest best score predictions.

### Algorithms

The list of available statistical algorithms is pretty long but only the following have been
implemented so far:

1. Hot-cold trend analysis - divides past draws in periods with certain size (8 for example) and
checks which numbers have been drawn the most in each period - the hot numbers. An extra addition
to the algorithm is monitoring the "rising" hot numbers - numbers that have been drawn more and
more often in the last few periods and are getting "hotter".

2. Elapse time trend analysis - accumulates statistics for each number how many draws after it's
last hit it gets hit again. For example if 3 gets hit on each 4 draws on average and it was last
drawn 2 draws ago there is an increasing chance of hitting it again the next draw.

After running a set of automated audits that check the performance of each algorithm by itself results
were not very promising - something like a hit rate of 13-14%.

I was able to increase the hit rate percentage by implementing custom mixtures of the algorithms and
running an automatic audit process before each prediction to choose the best performing algorithm.
This way I was able to get a hit rate of 17-19% which is not very promising too - but is significantly better.

### Games / Providers

Games (or providers) are different lottery games that the backend API is familiar with. Familiar in this
case means that the API knows how to scrape all past draws for the game so it can feed the frontend for analysis
when demanded to. The backend has been designed to support many providers that can be easily added any time by
using a set of generic abstract classes.

The currently supported games / providers are:

1. Bulgarian Sport Totalizator (BST) - 5/35

2. Bulgarian Sport Totalizator (BST) - 6/42

3. Bulgarian Sport Totalizator (BST) - 6/49

### Installation

The project includes a Vagrant file that installs all necessary software and deploys an initial version of the
backend database (so you can get going faster). You just need to install Vagrant, run git clone and boot the VM
via vagrant up. Afterwards the frontend will be accessible at http://127.0.0.1:9100 and you can start playing.

### User interface

The interface is pretty simple actually. It is trying to give the best available predictions with the least
amount of clicks possible. When the application is started it runs algorithm audits for each available game
in background processes (via Web Workers) so you can get the best predictions it can produce.

For each supported game you can do the following:

1. Suggestions page - shows the currently predicted numbers. Also lists a table with all algorithm audit winners
that have been recorded so far (an audit winner is the algorithm that got the best score in an audit).

2. Audit page - shows detailed information about the latest audit that has run. From here you can check how
algorithms perform compared to each other.

3. Browse page - shows all past draws of the currently selected game grouped by year.

### Tests

The analysis algorithms have been fully covered with Jasmine specs. You can run the test suite by going to
http://127.0.0.1:9100/tests/runner.html. All tests are written to be easily read afterwards - this way
they are extremely useful for reverse engineering - I do forget sometimes too...

### Browser support

The project has NOT been developed with any legacy browser support in mind.