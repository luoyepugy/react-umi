/*
 * @Descripttion: 详情基本信息
 * @version:
 * @Author: chang.yan
 * @Date: 2021-06-11 16:11:54
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-02 14:29:39
 */
import React from 'react'
// import IconFont from "../../assets/iconfont";
import _ from 'lodash'
import classNames from 'classnames'
import './index.less'

interface Item {
  key: string
  name: string
}

interface InfoProps {
  icon?: string
  list: Array<Item>
  data: any
  extra?: React.ReactNode // 额外Element配置
  isDivision?: boolean // 是否需要分割线
  className?: string
}

class Info extends React.PureComponent<InfoProps> {
  render() {
    const {
      list,
      data,
      icon,
      extra,
      isDivision = true,
      className: customizeClassName,
    } = this.props
    return (
      <section className={classNames('detail-info', customizeClassName)}>
        <div className="detail-info-icon">{/* <IconFont type={icon} /> */}</div>
        <div className="detail-info-main">
          <h1 className="detail-info-title">
            {list[0].name}：{data[list[0].key]}
          </h1>
          <div className="cp-inline-flex">
            <ul className="detail-info-content">
              {(isDivision ? list.slice(1, -4) : list.slice(1)).map((item) => {
                return (
                  <li key={item.key}>
                    <span className="detail-info-name">{item.name}：</span>
                    <span className="detail-info-value">
                      {_.isString(item.key) ? data[item.key] : item.key}
                    </span>
                  </li>
                )
              })}
              {isDivision && (
                <ul className="c-mt-20 detail-info-content">
                  {list.slice(-4).map((item: any) => {
                    return (
                      <li key={item.key}>
                        <span className="detail-info-name">{item.name}：</span>
                        {_.isFunction(item?.render) ? (
                          item?.render(item?.key, data)
                        ) : (
                          <span className="detail-info-value">
                            {_.isString(item.key) ? data[item.key] : item.key}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </ul>
          </div>
        </div>
        <div className="detail-info-extra">{extra}</div>
      </section>
    )
  }
}

export default Info
