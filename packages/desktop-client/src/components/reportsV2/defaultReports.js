const data = {
  reports: [
    {
      name: 'test_1',
      displayName: 'test 1',
      createDate: '',
      modifiedDate: '',
      config: {
        groupBy: [{ $month: '$date' }],
        aggregates: [
          { date: { $month: '$date' } },
          { amount: { $sum: '$amount' } }
        ],
        filters: {
          a: ''
        }
      }
    }
  ]
};

export default data;
