// This defines the component with filter UI

// import { useState, React } from 'react';
import React, { useState } from 'react';
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

import { toDateRepr, fromDateReprToDay, runAll, index } from './util';

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

function getMinDate() {
  let data = runQuery(q('transactions').calculate({ $min: '$date' })).then(
    ({ data }) => data
  );

  return data.then(() => {});
  return new Date(
    String(data).substring(0, 4),
    String(data).substring(5, 6),
    String(data).substring(7, 8)
  );
}

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

function accountSelect(accounts) {
  console.log(accounts);
}

function getAccountOptions() {
  return [
    { name: 'Option 1️⃣', id: 1 },
    { name: 'Option 2️⃣', id: 2 }
  ];
}

let filterSelections = {};

function onSelect(selectedList, selectedItem) {
  console.log(selectedItem);
}

function onRemove(selectedList, removedItem) {
  console.log(removedItem);
  // selectionRange = removedItem;
}

function Filters() {
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -1),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  console.log(state);
  console.log(getMinDate());

  const minDate = getMinDate();

  const sideBar = sideBarOptions();
  const staticRanges = [
    // ...defaultStaticRanges,
    ...createStaticRanges(sideBar)
  ];

  function handleSelect(ranges) {
    console.log(ranges);
    setState([ranges.selection]);
  }

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 0,
        flexShrink: 0
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15
        }}
      >
        <DateRangePicker
          showSelectionPreview={true}
          months={2}
          minDate={minDate}
          direction="horizontal"
          showMonthAndYearPickers={true}
          ranges={state}
          staticRanges={staticRanges}
          onChange={handleSelect}
        />
        <Select
          style={{ flex: 0, backgroundColor: 'white' }}
          onChange={accountSelect}
          value="all"
        >
          <option key="all" value="all">
            All
          </option>
          <option key="acc1" value="acc1">
            acc1
          </option>
        </Select>

        <Multiselect
          showCheckbox={true}
          options={getAccountOptions()} // Options to display in the dropdown
          // selectedValues={[1]} // Preselected value to persist in dropdown
          onSelect={onSelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />

        <Multiselect
          showCheckbox={true}
          options={getAccountOptions()} // Options to display in the dropdown
          // selectedValues={[1]} // Preselected value to persist in dropdown
          onSelect={onSelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
      </View>
    </View>
  );
}

export default Filters;
