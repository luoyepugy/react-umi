import Mock from 'mockjs';

const { Random } = Mock;

const list = Mock.mock({
  code: 0,
  data: {
    'rows|20': [
      {
        'id|+1': 1,
        createTime: Random.datetime('yyyy-MM-dd'),
        name: Random.cname(),
        createUser: Random.cname(),
        status: 0 || 1,
        remark: Random.csentence(2, 10),
        age: Random.float(10, 50),
        address: Random.city(true),
        operateAuth: [1, 2],
      },
    ],
    total: 50,
    footer: null,
  },
  errorMsg: null,
});

export default {
  'GET /api/report/list': list,
};
