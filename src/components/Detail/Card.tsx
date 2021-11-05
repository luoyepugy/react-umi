/*
 * @Author: 张晗
 * @Date: 2021-10-27 14:34:41
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-02 09:50:54
 * @Description: 详情卡片
 */
import React from "react";
import "./index.less";
import classNames from "classnames";

interface CardProps {
  title: string;
  hasForm?: boolean; // 是否有表单，专为CardContent带form定制样式
  className?: string;
}

class Card extends React.Component<CardProps> {
  render() {
    const { hasForm, title, className: customizeClassName } = this.props;

    return (
      <section
        className={classNames("detail-card", customizeClassName, {
          "detail-card-hasForm": hasForm
        })}
      >
        <div className="detail-card-title">{title}</div>
        <div className="detail-card-body">{this.props.children}</div>
      </section>
    );
  }
}

export default Card;
