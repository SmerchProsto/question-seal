import type { IClassesForComponent } from '../../../../models/IClassesForComponent';
import type { Component } from 'vue';

export interface IContentListItem extends IClassesForComponent {
    description?: string;
    element?: Component;
    props?: Record<string, unknown>;
}