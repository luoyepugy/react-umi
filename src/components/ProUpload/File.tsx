/*
 * @Author: 张晗
 * @Date: 2021-12-13 10:58:30
 * @LastEditors: 张晗
 * @LastEditTime: 2021-12-15 16:24:22
 * @Description: 上传文件/附件
 */

import React, {
  useState,
  useImperativeHandle,
  useEffect,
  useReducer,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { Upload, message, Form, Input } from 'antd';
import { PaperClipOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './index.less';

interface UploadFileProps {
  /** 文件字段名称， 默认是'file'  */
  name?: string;
  /** 接口额外参数 */
  extraParams?: any;
  /** 默认文本为'请上传文件' */
  placeholder?: string;
  /** 支持上传的文件格式 */
  format?: string;
  /** 是否显示清空按钮，默认为true  */
  clearable?: boolean;
  /** 默认值{name: '', value: ''}显示的名称和值 */
  defaultNameValue?: any;
  /** 上传接口url */
  url: string;
  /** 是否手动上传，默认自动上传，为false */
  isManualUpload?: boolean;
  /** 获取当前文件 */
  getFile?: (file: File) => void;
}

interface Ref {
  getFilePath?: () => string;
  clear?: (e: Event) => void;
}

const UploadFile: ForwardRefRenderFunction<Ref, UploadFileProps> = (props, ref) => {
  const {
    name = 'file',
    url,
    extraParams = {},
    defaultNameValue = { name: '', value: '' },
    format,
    placeholder = '请上传文件',
    clearable = true,
    isManualUpload = false,
  } = props;
  const [currentFile, setCurrentFile] = useState({
    name: '',
    response: { data: '' },
  });
  const [status, setStatus]: any = useState();
  const [isUpload, setIsUpload] = useState(false);

  useImperativeHandle(ref, () => ({
    getFilePath: () => {
      return isUpload ? currentFile.response.data : defaultNameValue.value;
    },
    clear: (e: Event) => onClear(e),
  }));

  const uploadProps = {
    action: url,
    onChange: (info: any) => {
      if (isManualUpload) return;
      if (info.file.status === 'done' && info.file?.response?.status === 200) {
        setStatus('');
        setIsUpload(true);
        setCurrentFile(info.file);
      } else if (info.file.status === 'uploading') {
        setIsUpload(false);
        setStatus('validating');
      } else {
        setStatus('error');
        setIsUpload(false);
        message.error(info.file?.response?.msg || '上传失败');
      }
    },
    // .rar,.zip,.doc,.docx,.pdf,.jpg,.png,.gif,.txt,.bmp,.xls,.xlsx
    accept: format || '.xls,.xlsx',
    name,
    multiple: false,
    showUploadList: false,
    data: extraParams,
    beforeUpload: (file: any) => {
      setIsUpload(true);
      setCurrentFile(file);
      // props?.getFile(file);
      return !isManualUpload;
    },
  };

  const onClear = (e: Event) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsUpload(true);
    setCurrentFile({ name: '', response: { data: '' } });
  };

  return (
    <Form.Item hasFeedback validateStatus={status} className="upload-file">
      <Upload {...uploadProps}>
        <Input
          className="file"
          readOnly
          value={isUpload ? currentFile.name : defaultNameValue.name}
          placeholder={placeholder}
          suffix={
            (isUpload ? currentFile.name : defaultNameValue.name) && clearable ? (
              <CloseCircleOutlined onClick={(e: any) => onClear(e)} />
            ) : (
              <PaperClipOutlined />
            )
          }
        />
      </Upload>
    </Form.Item>
  );
};

export default forwardRef(UploadFile);
