import React from 'react';

import * as d from 'date-fns';

import q, { runQuery } from 'loot-core/src/client/query-helpers';
import * as monthUtils from 'loot-core/src/shared/months';
import {
  integerToCurrency,
  integerToAmount,
  amountToInteger
} from 'loot-core/src/shared/util';
import { AlignedText } from 'loot-design/src/components/common';

import { index } from '../util';

export default function createSpreadsheet(start, end) {
  return async (spreadsheet, setData) => {
    const data = await Promise.resolve(
      runQuery(
        q('transactions')
          .filter({
            $and: [
              { date: { $gte: start + '-01' } },
              { date: { $lte: end + '-31' } },
              { 'category.is_income': false }
            ]
          })
          .groupBy('category.name')
          .select([
            { category: 'category.name' },
            { amount: { $sum: '$amount' } }
          ])
      ).then(({ data }) => data)
    );

    // console.log(data);

    setData(recalculate(data, start, end));
  };
}

function recalculate(data, start, end) {
  let arr = [];

  data.forEach(elem => {
    arr.push({
      x: elem.category,
      y: Math.abs(integerToAmount(elem.amount))
    });
  });

  console.log(arr);

  return {
    graphData: {
      data: arr,
      start,
      end
    }
  };
}
