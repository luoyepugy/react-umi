/*
 * @Author: 张晗
 * @Date: 2021-11-18 09:47:44
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-18 09:47:45
 * @Description:
 */

import React, { useState } from 'react';

/**
 * @returns visible 是否显示
 * @returns toggle 切换弹窗显示函数
 * @description 弹窗钩子函数
 */

function useModalVisible(initVisible?: boolean | (() => void)): [boolean, () => void] {
  const [visible, setVisible] = useState((initVisible = false));

  const toggle = () => {
    setVisible(!visible);
  };

  return [visible, toggle];
}

export default useModalVisible;
