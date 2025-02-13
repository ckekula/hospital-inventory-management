/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Equipment } from './Equipment';
export type Repair = {
    id?: number;
    equipment?: Equipment;
    directorApprovalDate?: string;
    bmeApprovalDate?: string;
    ddgApprovalDate?: string;
    sentDate?: string;
    receivedDate?: string;
    serviceType?: Repair.serviceType;
    stage?: Repair.stage;
    serviceProvider?: string;
};
export namespace Repair {
    export enum serviceType {
        MAINTENANCE = 'MAINTENANCE',
        BREAKDOWN = 'BREAKDOWN',
    }
    export enum stage {
        APPROVED_BY_DIRECTOR = 'APPROVED_BY_DIRECTOR',
        APPROVED_BY_BME = 'APPROVED_BY_BME',
        IN_PROGRESS = 'IN_PROGRESS',
    }
}

