import type { IFeatureRow } from '../../Feature/FeatureRow/models/IFeatureRow';

export interface IHeresyFeatures {
    title: string;
    contents: Array<IContent>;
}

export interface IContent {
    featureRows: Array<IFeatureRow>;
}