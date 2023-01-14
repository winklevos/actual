// import React from 'react';
// import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

import * as queries from 'loot-core/src/client/queries';
import q, {
  sqlQuery,
  pagedQuery,
  runQuery
} from 'loot-core/src/client/query-helpers';

// import { getPayees } from 'loot-core/src/client/actions/queries';
// import { send } from 'loot-core/src/platform/client/fetch';
// import { conditionsToAQL } from 'loot-core/src/server/accounts/transaction-rules';
// import { View, Block, AnchorLink } from 'loot-design/src/components/common';
// import { colors, styles } from 'loot-design/src/style';

// see documentation for supported input formats
const data = [
  ['attribute', 'attribute2'],
  ['value1', 'value2']
];

export default function Pivot({ setLoading = () => {} }) {
  const [state, setState] = useState(null);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function run() {
      //   console.log(q('transactions').raw('SELECT * FROM transactions'));
      //   let { data: rows } = await sqlQuery(
      //     'SELECT * FROM transactions LIMIT 10'
      //   );
      let { data: rows } = await runQuery(
        q('transactions')
          .select(['*', 'payee.name', 'account.name', 'category.name'])
          .limit(1000)
      );
      // q('transactions').filter('LEFT JOIN payees p ON t.payee = p.id').raw()

      // -- SQLite
      // SELECT t.name, t.date, t.amount p.name FROM v_transactions t
      // LEFT JOIN v_payees p
      // ON t.payee = p.id

      //   .filter({
      //     id: { $oneof: [...selectedItems] },
      //     parent_id: { $oneof: [...selectedItems] }
      //   })
      //   .select('id')
      //   );
      console.log(rows);
      setData(rows);
      //   let ids = new Set(rows.map(r => r.id));

      //   let finalIds = [...selectedItems].filter(id => !ids.has(id));
      //   let { data: balance } = await runQuery(
      //     q('transactions')
      //       .filter({ id: { $oneof: finalIds } })
      //       .options({ splits: 'all' })
      //       .calculate({ $sum: '$amount' })
      //   );
      //   setBalance(balance);
    }
    run();

    // async function loadData() {
    //   //   let loadedRules = await loadRules();
    //   //   setRules(loadedRules.slice(0, 100));
    //   let payees = await send('transactions-get');
    //   setState(payees);
    //   //   await setState(dispatch(getPayees()));
    //   //   setLoading(false);
    // }
    // // dispatch(getPayees());
    // // undo.setUndoState('openModal', 'manage-rules');

    // loadData();

    // console.log(state);

    return () => {
      //   undo.setUndoState('openModal', null);
    };
  }, []);

  return data ? (
    <PivotTableUI
      data={data}
      onChange={s => {
        setState(s);
        console.log(s);
      }}
      {...state}
    />
  ) : (
    <h1>loading..</h1>
  );
}

//   constructor(props) {
//     super(props);
//     this.state = props;
//   }

//   render() {
//     return (
//       <View
//         style={[
//           styles.page,
//           { paddingLeft: 40, paddingRight: 40, minWidth: 700 }
//         ]}
//       >
//         <PivotTableUI
//           data={data}
//           onChange={s => this.setState(s)}
//           {...this.state}
//         />
//       </View>
//     );
//   }
// }

// // ReactDOM.render(<App />, document.body);
// export default Pivot;
