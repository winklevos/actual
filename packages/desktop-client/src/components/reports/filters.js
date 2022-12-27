// This defines the component with filter UI

import React from 'react';
import { DateRangePicker } from 'react-date-range';

import Multiselect from 'multiselect-react-dropdown';

import {
  View,
  Select,
  Button,
  ButtonLink
} from 'loot-design/src/components/common';
import { styles } from 'loot-design/src/style';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const selectionRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

function dateSelect(ranges) {
  console.log(ranges);
  // {
  //   selection: {
  //     startDate: [native Date Object],
  //     endDate: [native Date Object],
  //   }
  // }
}

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
}

function Filters() {
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
        <DateRangePicker ranges={[selectionRange]} onChange={dateSelect} />
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
