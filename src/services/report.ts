import request from 'umi-request';

export async function queryList() {
  return request('/api/report/list');
}

// export async function queryList(): Promise<any> {
//   return request('/report/list');
// }
