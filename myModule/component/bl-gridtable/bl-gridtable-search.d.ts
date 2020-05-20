import React from 'react';
import { FormInstance } from 'antd/lib/form';
declare const DynamicForm: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
declare class BlGridTableSearch extends React.PureComponent {
    refForm: React.RefObject<FormInstance>;
    private formVals;
    componentDidMount(): void;
    onValueChange(key: any, value: any, type: any): void;
    initRangeVals(key: string, value: any, obj: any): void;
    getDefaultValues(): any;
    onConfirm: () => Promise<void>;
    onClear: () => void;
    onCancel(): void;
    render(): JSX.Element;
}
export { BlGridTableSearch, DynamicForm };
