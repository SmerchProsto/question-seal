import type { IContentListItem } from '../../../Contents/ContentList/models/ContentListItem';

export interface IFeatureRow {
    title: string;
    src: string;
    alt: string;
    items: Array<IContentListItem>;
}