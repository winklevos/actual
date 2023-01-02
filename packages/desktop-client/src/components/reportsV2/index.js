import React from 'react';
import { Route } from 'react-router-dom';

import { View } from 'loot-design/src/components/common';

// import CashFlow from './CashFlow';
// import CategorySpend from './CategorySpend';
// import NetWorth from './NetWorth';
// import Overview from './Overview';
import Home from './Home';
import Pivot from './Pivot';

class ReportsV2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Route path="/reportsV2" exact component={Pivot}></Route>
      </View>
    );
  }
}

export default ReportsV2;
