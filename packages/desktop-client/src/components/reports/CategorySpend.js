import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';

import * as d from 'date-fns';
// import { bindActionCreators } from 'redux';

// import * as actions from 'loot-core/src/client/actions';
import { send } from 'loot-core/src/platform/client/fetch';
import * as monthUtils from 'loot-core/src/shared/months';
// import { integerToCurrency } from 'loot-core/src/shared/util';
import { View, P } from 'loot-design/src/components/common';
import { styles } from 'loot-design/src/style';

// import Change from './Change';
import categorySpendSpreadsheet from './graphs/category-spend-spreadsheet';
import CategorySpendGraph from './graphs/CategorySpendGraph';
import Header from './Header';
import useReport from './useReport';
import { fromDateRepr, useArgsMemo } from './util';

function CategorySpend() {
  const [earliestMonth, setEarliestMonth] = useState(null);
  const [allMonths, setAllMonths] = useState(null);
  const [start, setStart] = useState(
    monthUtils.subMonths(monthUtils.currentMonth(), 5)
  );
  const [end, setEnd] = useState(monthUtils.currentMonth());

  const data = useReport(
    'category_spend',
    useArgsMemo(categorySpendSpreadsheet)(start, end)
  );

  useEffect(() => {
    async function run() {
      const trans = await send('get-earliest-transaction');
      const currentMonth = monthUtils.currentMonth();
      let earliestMonth = trans
        ? monthUtils.monthFromDate(d.parseISO(fromDateRepr(trans.date)))
        : currentMonth;

      // Make sure the month selects are at least populates with a
      // year's worth of months. We can undo this when we have fancier
      // date selects.
      const yearAgo = monthUtils.subMonths(monthUtils.currentMonth(), 12);
      if (earliestMonth > yearAgo) {
        earliestMonth = yearAgo;
      }

      const allMonths = monthUtils
        .rangeInclusive(earliestMonth, monthUtils.currentMonth())
        .map(month => ({
          name: month,
          pretty: monthUtils.format(month, 'MMMM, yyyy')
        }))
        .reverse();

      setEarliestMonth(earliestMonth);
      setAllMonths(allMonths);
    }
    run();
  }, []);

  function onChangeDates(start, end) {
    setStart(start);
    setEnd(end);
  }

  if (!allMonths || !data) {
    return null;
  }

  return (
    <View style={[styles.page, { minWidth: 400, overflow: 'hidden' }]}>
      <Header
        title="Category Spend"
        allMonths={allMonths}
        start={start}
        end={end}
        onChangeDates={onChangeDates}
      />
      <View
        style={{
          backgroundColor: 'white',
          padding: '30px',
          overflow: 'auto'
        }}
      >
        <CategorySpendGraph
          start={start}
          end={end}
          graphData={data.graphData}
        />

        <View style={{ marginTop: 30 }}>
          <P>
            <strong>How is category spend calculated?</strong>
          </P>
          <P>
            This groups all spending by the categories and related transations.
          </P>
        </View>
      </View>
    </View>
  );
}

// export default connect(
//   state => ({ accounts: state.queries.accounts }),
//   dispatch => bindActionCreators(actions, dispatch)
// )(CategorySpend);

export default CategorySpend;
