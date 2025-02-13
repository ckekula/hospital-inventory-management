/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReceivedEquipment } from './ReceivedEquipment';
import type { Repair } from './Repair';
import type { Unit } from './Unit';
import type { User } from './User';
export type Equipment = {
    id?: number;
    name?: string;
    deliveredDate?: string;
    brand?: string;
    manufacturer?: string;
    model?: string;
    unitPrice?: string;
    receivedVia?: string;
    warrantyPeriod?: string;
    inventoryNo?: string;
    serialNo?: string;
    assignedUnit?: Unit;
    receivedCondition?: Equipment.receivedCondition;
    status?: Equipment.status;
    receivingOfficer?: User;
    createdDate?: string;
    lastModifiedDate?: string;
    receivedEquipment?: ReceivedEquipment;
    repair?: Array<Repair>;
};
export namespace Equipment {
    export enum receivedCondition {
        BRAND_NEW = 'BRAND_NEW',
        RECONDITION = 'RECONDITION',
        USED = 'USED',
    }
    export enum status {
        ACTIVE = 'ACTIVE',
        IN_SERVICE = 'IN_SERVICE',
        CONDEMNED = 'CONDEMNED',
    }
}

