import {
    LayoutItem,
    WidgetOptionsHostDirective
} from '.';

export interface WidgetDefinition {
    name: string;
    config?: any;
}

export interface Widget {
    readonly definition: WidgetDefinition;
    data?: any;
}

export interface WidgetWithOptions {
    widgetOptionsHost?: WidgetOptionsHostDirective;
    controlComponents?: any[];
    controlComponentsInstances?(instances: WeakMap<any, any>): void;
}

export interface IWidgetFactory<TLayoutOptions, TWidget> {
    getWidget(item: LayoutItem<TLayoutOptions>): TWidget;
}

export interface OnControlComponentsInited {
    OnControlComponentsInited(): void;
}

export enum WidgetType {
    Nested = 'ngNestedComponent',
    Single = 'ngComponent'
}
