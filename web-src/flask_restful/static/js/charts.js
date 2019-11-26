var trace1 = {
    x: [20, 14, 23],
    y: ['College Dropout', 'Late Registration', 'Graduation', '80s & Heartbreat', 'My Beautiful Dark Twisted Fantasy', 'Yeezus', 'Life of Pablo', 'Ye', 'Jeasus is King'],
    name: 'Negative',
    orientation: 'h',
    marker: {
      color: 'rgba(217, 102, 55, 0.9)',
      width: 1
    },
    type: 'bar'
  };
  
  var trace2 = {
    x: [12, 18, 29],
    y: ['College Dropout', 'Late Registration', 'Graduation', '80s & Heartbreat', 'My Beautiful Dark Twisted Fantasy', 'Yeezus', 'Life of Pablo', 'Ye', 'Jeasus is King'],
    name: 'Neutral',
    orientation: 'h',
    type: 'bar',
    marker: {
      color: 'rgba(196, 148, 86, 0.9))',
      width: 1
    }
  };

  var trace3 = {
    x: [12, 18, 29],
    y: ['College Dropout', 'Late Registration', 'Graduation', '80s & Heartbreat', 'My Beautiful Dark Twisted Fantasy', 'Yeezus', 'Life of Pablo', 'Ye', 'Jeasus is King'],
    name: 'Positive',
    orientation: 'h',
    type: 'bar',
    marker: {
      color: 'rgba(205, 182, 93, 0.9)',
      width: 1
    }
  };
  
  var data = [trace1, trace2, trace3];
  
  var layout = {
    title: 'Colored Bar Chart',
    barmode: 'stack'
  };
  
  Plotly.newPlot('myDiv', data, layout, {showSendToCloud:true});