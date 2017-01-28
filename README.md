# City Science traffic visualisation demonstration

By Craig Buckler

## Overview
Data from traffic surveys throughout Devon is shown on a heatmap. As well as map zooming and panning, the controls in the bottom right allow you to set:

1. the survey year
2. the type of vehicle
3. whether the data is weighted by traffic volumes.

When **weighted** is unticked, the map illustrates where surveys have taken place. Clusters of red highlight areas where more surveys occurred.

When **weighted** is ticked, each survey point is factored by the volume of traffic to highlight busier locations.

Hover your cursor over any survey point circle to view the traffic figures, control point number and road information.


## Supported browsers
The system works best in Chromium browsers such as Chrome, Opera and Vivaldi.

Chrome for Android, Firefox, Edge and IE11 have A-grade support but are a little slower than Chromium.

IE9 and IE10 work but have some rendering differences and may show Google Maps API warning messages.

Safari on iOS *should* work but has not been tested.


## Development method
The original data was modified:

* control point BNG co-ordinates were converted to latitude and longitude
* the data set was highly compressed into a JavaScript object.

The Google Maps API is used to show the map and generate the heatmaps. On generation, each heatmap is cached so it *should* appear faster on subsequent redraws

Each control point is drawn on first load and has the hover-over title changed when necessary.


## Suggested improvements
Suggested visualisation enhancements:

* it is not known whether each survey recorded one-way, two-way or a mixture of traffic
* around ten survey locations were removed because of incomplete data. Additional development could have fixed this.
* the data could be supplemented by directional traffic information
* a heatmap could be added to highlight traffic growth, perhaps by calculating a moving average or the standard deviation
* a heatmap could be added to highlight traffic comparisons, e.g. areas with high numbers of cyclists and HGVs
* a more accurate representation of traffic flows could be plotted if geographical points were known


Suggested application enhancements:

* the heatmap could be animated show changes over time
* load and parse data from a URL or file dragged into browser
* data could have been cached semi-permanently (perhaps in localStorage)
* the user's previous settings could be retained between sessions
* GET parameters could have been set and parsed so URLs could be shared
* the history API could recall previous choices when using the browser back button
* heatmap colours could be configured
* build tools could be used to minify, concatenate and perhaps inline all code
