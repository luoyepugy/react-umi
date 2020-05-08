import Mock from 'mockjs';

const { Random } = Mock;

const list = Mock.mock({
  code: 0,
  data: {
    'rows|20': [
      {
        id: 1,
        createTime: Random.datetime('yyyy-MM-dd'),
        name: Random.cname(),
        createUser: Random.cname(),
        status: 0 || 1,
        remark: Random.csentence(2, 10),
        age: Random.float(10, 50),
        address: Random.city(),
        operateAuth: [2, 3],
      },
      {
        id: 2,
        createTime: Random.datetime('yyyy-MM-dd'),
        name: Random.cname(),
        createUser: Random.cname(),
        status: 0 || 1,
        remark: Random.csentence(2, 10),
        age: Random.float(10, 50),
        address: Random.city(true),
        operateAuth: [1, 3],
      },
      {
        'id|+1': 3,
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
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 100,
        checked: true,
        disabled: true,
      },
      {
        title: '姓名',
        key: 'name',
        checked: true,
        disabled: false,
      },
      {
        title: '年龄',
        key: 'age',
        checked: true,
        disabled: false,
      },
      {
        title: '地址',
        key: 'address',
        checked: true,
        disabled: false,
      },
    ],
    toolbar: [
      {
        type: 'Select',
        key: 'status',
        options: [
          {
            id: 0,
            title: '全部类型',
          },
          {
            id: 1,
            title: '合同',
          },
          {
            id: 2,
            title: '活动',
          },
        ],
      },
    ],
    allAuth: [
      {
        icon: 'icon-edit',
        text: '编辑',
        id: 1,
      },
      {
        icon: 'icon-detail',
        text: '详情',
        id: 2,
      },
      {
        icon: 'icon-delete',
        text: '删除',
        id: 3,
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
