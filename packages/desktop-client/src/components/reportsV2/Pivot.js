// import React from 'react';

// import * as d from 'date-fns';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  addYears,
  format
} from 'date-fns';
// import Plotly from 'plotly.js-basic-dist';
// import PivotTableUI from 'react-pivottable/PivotTableUI';
// import 'react-pivottable/pivottable.css';
// import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
// import TableRenderers from 'react-pivottable/TableRenderers';

import q, { runQuery } from 'loot-core/src/client/query-helpers';
// import * as monthUtils from 'loot-core/src/shared/months';
import {
  integerToCurrency,
  integerToAmount,
  amountToInteger
} from 'loot-core/src/shared/util';
import { View, P } from 'loot-design/src/components/common';
import { styles } from 'loot-design/src/style';

import Filters from '../reports/Filters';

// import { AlignedText } from 'loot-design/src/components/common';

// import { index } from '../util';

// create Plotly renderers via dependency injection
// const PlotlyRenderers = createPlotlyRenderers(Plot);

const reports = require('./defaultReports').default;

const defaultReport = reports.reports[0];

function generateAggs(arry = []) {
  let ot = [];

  arry.forEach(item => {
    let objParent = {};
    let objInner = {};

    objInner[item[0]] = '$' + item[1];
    objParent[item[1]] = objInner;
    ot.push(objParent);
  });

  return ot;
}

function unpack(rows, key) {
  return rows.map(function (row) {
    return row[key];
  });
}

function Pivot() {
  const [state, setState] = useState({
    data: [],
    layout: { title: defaultReport.displayName },
    frames: [],
    config: {}
  });

  function makeQuery() {
    // let query = q('transactions').raw('SELECT date FROM Transactions');
    let query = q('transactions')
      .groupBy(defaultReport.config.groupBy)
      .select(defaultReport.config.aggregates);

    console.log(query);
    return query;
  }

  function getData() {
    runQuery(makeQuery()).then(result => {
      console.log(result.data);

      var trace1 = {
        type: 'scatter',
        mode: 'lines',
        name: 'ss',
        x: unpack(result.data, 'date'),
        y: unpack(result.data, 'amount'),
        line: { color: '#17BECF' },
        aggregations: [{ target: 'y', func: 'sum', enabled: true }]
      };

      setState(prevState => ({
        ...prevState,
        data: [trace1]
        // Object.assign(
        //   ...Object.keys(result.data[0]).map(key => ({
        //     [key]: result.data.map(o => o[key])
        //   }))
        // )
      }));
    });

    console.log(state.data);
  }

  // function generatePlot(data) {
  //   var trace1 = {
  //     type: 'scatter',
  //     mode: 'lines',
  //     name: 'AAPL High',
  //     x: unpack(rows, 'Date'),
  //     y: unpack(rows, 'AAPL.High'),
  //     line: { color: '#17BECF' }
  //   };

  //   setState(prevState => ({
  //     ...prevState,
  //     data: Object.assign(
  //       ...Object.keys(result.data[0]).map(key => ({
  //         [key]: result.data.map(o => o[key])
  //       }))
  //     )
  //   }));
  // }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={[styles.page, { minWidth: 650, overflow: 'hidden' }]}>
      <Filters></Filters>
      <Plot
        data={state.data}
        layout={state.layout}
        frames={state.frames}
        config={state.config}
        onInitialized={figure => setState(figure)}
        onUpdate={figure => {
          setState(figure);
          console.log(figure);
        }}
        // data={[
        //   // {
        //   //   x: [1, 2, 3],

        //   //   y: [2, 6, 3],

        //   //   type: 'scatter',

        //   //   mode: 'lines+markers',

        //   //   marker: { color: 'red' }
        //   // },

        //   { type: 'table', x: state.data.date, y: state.data.amount }
        // ]}
        // layout={{ width: 1000, height: 500, title: test1.displayName }}
      />
      <View>{JSON.stringify(state.data)}</View>
    </View>
  );
}

export default Pivot;
