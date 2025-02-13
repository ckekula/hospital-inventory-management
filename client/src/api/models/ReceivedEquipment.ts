/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Equipment } from './Equipment';
import type { User } from './User';
export type ReceivedEquipment = {
    id?: number;
    equipment?: Equipment;
    receivedDate?: string;
    installedDate?: string;
    demonstratedDate?: string;
    operationStartDate?: string;
    demonstratorName?: string;
    demonstratorDesignation?: string;
    noOfTrainees?: number;
    servicesPerAnnum?: number;
    recommendedServiceCompany?: string;
    agentName?: string;
    agentPhone?: string;
    companyPhone?: string;
    companyEmail?: string;
    companyFax?: string;
    serviceCatalogReceivedDate?: string;
    receivingOfficer?: User;
};

