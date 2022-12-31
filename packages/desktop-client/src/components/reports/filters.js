// This defines the component with filter UI

// import { useState, React } from 'react';
import React, { useEffect, useState } from 'react';
import {
  DateRangePicker,
  createStaticRanges,
  defaultStaticRanges
} from 'react-date-range';

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
  addYears
} from 'date-fns';
import Multiselect from 'multiselect-react-dropdown';

import { runQuery } from 'loot-core/src/client/query-helpers';
import q from 'loot-core/src/client/query-helpers';
import {
  View,
  Select,
  Button,
  ButtonLink
} from 'loot-design/src/components/common';

// import { toDateRepr, fromDateReprToDay, runAll, index } from './util';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
  startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
  startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOflastYear: startOfYear(addYears(new Date(), -1)),
  endOflastYear: endOfYear(addYears(new Date(), -1)),
  startOf5Year: startOfYear(addYears(new Date(), -5))
  // endOflastYear: endOfYear(addYears(new Date(), -))
};

const sideBarOptions = () => {
  const customDateObjects = [
    {
      label: 'Lifetime',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday
      })
    },
    {
      label: 'Last 5 Years',
      range: () => ({
        startDate: defineds.startOf5Year,
        endDate: defineds.endOfToday
      })
    }
  ];
  return customDateObjects;
};

function Filters() {
  const [state, setState] = useState({
    minDate: addYears(new Date(), -10),
    accounts: [],
    categories: [],
    ranges: [
      {
        startDate: addDays(new Date(), -1),
        endDate: new Date(),
        key: 'selection'
      }
    ],
    filters: {
      accounts: [],
      categoryGroups: [],
      categories: [],
      tags: []
    }
  });

  console.log(state);

  const sideBar = sideBarOptions();
  const staticRanges = [
    // ...defaultStaticRanges,
    ...createStaticRanges(sideBar)
  ];

  function onRemove(selectedList, removedItem) {
    console.log(selectedList);
  }

  function onAccountSelect(selectedList, selectedItem) {
    console.log(selectedList);
    setState(prevState => ({
      ...prevState,
      filters: { ...prevState.filters, accounts: selectedList }
    }));
  }

  function onCategorySelect(selectedList, selectedItem) {
    console.log(selectedList);
    setState(prevState => ({
      ...prevState,
      filters: { ...prevState.filters, categories: selectedList }
    }));
  }

  function getMinDate() {
    runQuery(q('transactions').calculate({ $min: '$date' })).then(result => {
      setState(prevState => ({
        ...prevState,
        minDate: new Date(
          String(result.data).substring(0, 4),
          String(result.data).substring(5, 6),
          String(result.data).substring(7, 8)
        )
      }));
    });
  }

  function getAccountOptions() {
    runQuery(q('accounts').select('*')).then(result => {
      console.log(result.data);
      setState(prevState => ({ ...prevState, accounts: result.data }));
    });
  }

  function getCategoryOptions() {
    runQuery(q('categories').select('*')).then(result => {
      console.log(result.data);
      setState(prevState => ({ ...prevState, categories: result.data }));
    });
  }

  function handleSelect(ranges) {
    console.log(ranges);
    setState(prevState => ({ ...prevState, ranges: [ranges.selection] }));
  }

  useEffect(() => {
    getMinDate();
    getAccountOptions();
    getCategoryOptions();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        // alignItems: 'center',
        marginTop: 15
      }}
    >
      <div style={{ margin: 7 }}>
        <DateRangePicker
          showSelectionPreview={true}
          months={1}
          minDate={state.minDate}
          maxDate={addDays(new Date(), 90)}
          direction="horizontal"
          showMonthAndYearPickers={true}
          ranges={state.ranges}
          staticRanges={staticRanges}
          onChange={handleSelect}
        />
      </div>

      <div style={{ margin: 7 }}>
        <Multiselect
          style={{ padding: 10 }}
          showCheckbox={true}
          options={state.accounts} // Options to display in the dropdown
          // selectedValues={[1]} // Preselected value to persist in dropdown
          onSelect={onAccountSelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
      </div>

      <div style={{ margin: 7 }}>
        <Multiselect
          style={{ padding: 10 }}
          showCheckbox={true}
          options={state.categories} // Options to display in the dropdown
          // selectedValues={[1]} // Preselected value to persist in dropdown
          onSelect={onCategorySelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
      </div>
    </View>
  );
}

export default Filters;
