// 合同状态
const STATUS = [
  { id: 1, name: '制单' },
  { id: 2, name: '已提交' },
  { id: 3, name: '已撤回' },
  { id: 4, name: '审核退回' },
  { id: 6, name: '已审核' },
  { id: 8, name: '提前终止' },
  { id: 9, name: '已结束' },
];

const STATUS_ALL = [{ id: 0, name: '全部状态' }].concat(STATUS);

// 按钮权限
const BUTTON_AUTH = {
  delete: {
    id: 1,
    name: '删除',
    icon: 'icon-delete',
  },
  edit: {
    id: 2,
    name: '编辑',
    icon: 'icon-edit',
  },
  detail: {
    id: 3,
    name: '详情',
    icon: 'icon-detail',
  },
  submit: {
    id: 4,
    name: '提交',
    icon: 'icon-edit',
  },
};

export default {
  STATUS,
  STATUS_ALL,
  BUTTON_AUTH,
};
