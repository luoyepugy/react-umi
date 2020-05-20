import React from 'react';
declare class BlGridTableColumn extends React.PureComponent {
    newDatas: Array<any>;
    onConfirm: () => void;
    onChange: (vals: any[]) => void;
    render(): JSX.Element;
}
export { BlGridTableColumn };
