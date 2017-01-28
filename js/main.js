/*
City Science data visualisation code
By Craig Buckler
*/
var cs = cs || {};
cs.main = (function() {

  'use strict';

  // dependencies
  if (!window.addEventListener) return;

  // configuration
  var
    cfg = {
      map: {
        init: {
          center: { lat: 50.714785, lng: -3.9747587 },
          zoom: 9,
          mapTypeId: 'roadmap',
          mapTypeControl: false,
          streetViewControl: false
        }
      },
      dom: {
        map: document.getElementById('map'),
        year: document.getElementById('year'),
        transport: document.getElementById('transport'),
        weighted: document.getElementById('weighted')
      }
    },
    trf = cs.traffic,
    trfN = cs.traffic.length,
    year, curYear = 0,
    transport, curTrans = 0,
    weighted, curWeight = cfg.dom.weighted.checked ? 1 : 0,
    map,
    heatmap = [],
    marker = [];


  // initialise
  function init() {

    // load map
    map = new google.maps.Map(cfg.dom.map, cfg.map.init);
    if (map) {

      // form events
      cfg.dom.year.addEventListener('change', valueUpdate);
      cfg.dom.transport.addEventListener('change', valueUpdate);
      cfg.dom.weighted.addEventListener('change', valueUpdate);

      valueUpdate();

    }

  }


  // get form values
  function valueUpdate() {

    year = {
      index: parseFloat(cfg.dom.year.value),
      label: cfg.dom.year[cfg.dom.year.selectedIndex].textContent
    };

    transport = {
      index: parseFloat(cfg.dom.transport.value),
      label: cfg.dom.transport[cfg.dom.transport.selectedIndex].textContent
    };

    weighted = cfg.dom.weighted.checked ? 1 : 0;

    showHeatmap();

  }


  // display heatmap
  function showHeatmap() {

    // generate new or use cached heatmap
    heatmap[weighted] = heatmap[weighted] || [];
    heatmap[weighted][year.index] = heatmap[weighted][year.index] || [];
    heatmap[weighted][year.index][transport.index] = heatmap[weighted][year.index][transport.index] || { layer: null, data: [], new: true };

    // loop traffic data
    var hm = heatmap[weighted][year.index][transport.index].data, t, title;
    for (var d = 0; d < trfN; d++) {

      t = trf[d];

      // add location to heatmap
      hm[d] = hm[d] || {
        location: new google.maps.LatLng(t.lat, t.lng),
        weight: weighted ? t.data[year.index][transport.index] : 1
      };

      // set title
      title =
        addCommas(t.data[year.index][transport.index]) + '\n' +
        year.label + ' ' + transport.label + '\ncontrol point ' + t.cp + '\n' +
        t.road + ' (' + t.start + ' to ' + t.end + ')';


      if (marker[d]) {

        // update marker title
        marker[d].setTitle(title);

      }
      else {

        // create new marker
        marker[d] = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(t.lat, t.lng),
          title: title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 2.5,
            strokeWeight: 1,
            strokeColor: '#222',
            strokeOpacity: 0.6
          }
        });

      }

    }

    // show new heatmap
    if (heatmap[weighted][year.index][transport.index].new) {

      heatmap[weighted][year.index][transport.index].layer = new google.maps.visualization.HeatmapLayer({
        data: hm,
        opacity: 0.6,
        radius: 0.05,
        dissipating: false
      });

      heatmap[weighted][year.index][transport.index].new = false;

    }

    // remove old heatmap
    if (heatmap[curWeight] && heatmap[curWeight][curYear] && heatmap[curWeight][curYear][curTrans]) {
      heatmap[curWeight][curYear][curTrans].layer.setMap(null);
    }

    // show new heatmap
    curWeight = weighted;
    curYear = year.index;
    curTrans = transport.index;
    heatmap[curWeight][curYear][curTrans].layer.setMap(map);

  }


  // add thousands commas
  var reThousands = /(\d)(?=(\d{3})+(?!\d))/g;
  function addCommas(num) {
    return String(num).replace(reThousands, '$1,');
  }


  return {
    init: init
  };

})();
