import React from 'react';

import * as monthUtils from 'loot-core/src/shared/months';
import {
  View,
  Select,
  Button,
  ButtonLink
} from 'loot-design/src/components/common';
import { styles } from 'loot-design/src/style';
import ArrowLeft from 'loot-design/src/svg/v1/ArrowLeft';

import Filters from './Filters';

function validateStart(allMonths, start, end) {
  const earliest = allMonths[allMonths.length - 1].name;
  if (end < start) {
    end = monthUtils.addMonths(start, 6);
  }
  return boundedRange(earliest, start, end);
}

function validateEnd(allMonths, start, end) {
  const earliest = allMonths[allMonths.length - 1].name;
  if (start > end) {
    start = monthUtils.subMonths(end, 6);
  }
  return boundedRange(earliest, start, end);
}

function boundedRange(earliest, start, end) {
  const latest = monthUtils.currentMonth();
  if (end > latest) {
    end = latest;
  }
  if (start < earliest) {
    start = earliest;
  }
  return [start, end];
}

function getLatestRange(offset) {
  const end = monthUtils.currentMonth();
  const start = monthUtils.subMonths(end, offset);
  return [start, end];
}

function getFullRange(allMonths) {
  const start = allMonths[allMonths.length - 1].name;
  const end = monthUtils.currentMonth();
  return [start, end];
}

function Header({ title, start, end, show1Month, allMonths, onChangeDates }) {
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 0,
        flexShrink: 0
      }}
    >
      <ButtonLink
        to="/reports"
        bare
        style={{ marginBottom: '15', alignSelf: 'flex-start' }}
      >
        <ArrowLeft width={10} height={10} style={{ marginRight: 5 }} /> Back
      </ButtonLink>
      <View style={styles.veryLargeText}>{title}</View>

      <Filters></Filters>
    </View>
  );
}

export default Header;
