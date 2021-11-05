/*
 * @Author: 张晗
 * @Date: 2021-10-27 14:34:41
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-02 14:28:38
 * @Description: 详情布局
 */
import React from "react";
import Card from "./Card";
import Info from "./Info";
import classNames from "classnames";
import { Button } from "antd";

interface DetailProps {
  hasFooter?: boolean; // 是否有页脚，专为编辑页面底部操作按钮定制
  className?: string;
  onSubmit?: () => void;
}

class Detail extends React.PureComponent<DetailProps> {
  static Layout: typeof Detail;
  static Card: typeof Card;
  static Info: typeof Info;

  render() {
    const {
      hasFooter,
      className: customizeClassName,
      onSubmit: onCustomSubmit
    } = this.props;

    return (
      <section
        className={classNames("detail-layout", customizeClassName, {
          "detail-layout-hasFooter": hasFooter
        })}
      >
        {this.props.children}
        {hasFooter && (
          <div className="footer">
            <Button onClick={() => window.history.go(-1)}>取消</Button>
            <Button type="primary" onClick={onCustomSubmit}>
              保存
            </Button>
          </div>
        )}
      </section>
    );
  }
}

export default Detail;
