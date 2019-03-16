export interface LayoutItem<TLayoutOptions> {
    type?: string;

    id?: string;
    parentId?: string;
    isAttached?: boolean;
    childIndex?: number;

    content?: Array<LayoutItem<TLayoutOptions>>;
    layoutOptions?: TLayoutOptions;

    parentTitle?: string;
    title?: string;
    subtitle?: string;

    widget?: string;
    widgetData?: any;
}
