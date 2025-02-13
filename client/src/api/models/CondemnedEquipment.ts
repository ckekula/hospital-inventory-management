/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Equipment } from './Equipment';
import type { User } from './User';
export type CondemnedEquipment = {
    id?: number;
    equipment?: Equipment;
    unusableDate?: string;
    forwardedDate?: string;
    condemnedDate?: string;
    removedDate?: string;
    informedBMEDate?: string;
    informedPlanningUnitDate?: string;
    report?: string;
    bme?: User;
};

