/*
 * @Author: 张晗
 * @Date: 2021-12-13 10:58:38
 * @LastEditors: 张晗
 * @LastEditTime: 2021-12-15 16:36:03
 * @Description: 上传图片/图标
 */

import React, { Component } from 'react';
import { Upload, message, notification } from 'antd';
import _ from 'lodash';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('接收 JPG/PNG 格式的图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能大于 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface UploadImageProps {
  id?: string;
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
  uploadUrl: string;
}
interface UploadImageState {
  loading: boolean;
  imageUrl?: string;
}
export default class UploadImage extends Component<UploadImageProps, UploadImageState> {
  state = {
    loading: false,
  };

  handleChange = (info: any) => {
    const { onChange } = this.props;
    let { status, response } = info.file;
    if (status === 'uploading') {
      this.setState({ loading: true });
      return;
    } else if (status === 'done') {
      if (String(response.status) === '200') {
        if (_.isFunction(onChange)) {
          onChange(response.data.filePath);
        }
      } else {
        notification.error({
          message: `出错了`,
          description: `${response.msg || '图片上传失败'} ，错误代码：${response.status}`,
        });
      }

      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { value: imageUrl, name = 'file', uploadUrl } = this.props;
    const { loading } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
    return (
      <Upload
        name={name}
        multiple={false}
        listType="picture-card"
        className="upload-img"
        showUploadList={false}
        action={uploadUrl}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {_.isString(imageUrl) ? (
          <img src={imageUrl} alt="图片" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
