/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CondemnedEquipment } from '../models/CondemnedEquipment';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CondemnedEquipmentControllerService {
    /**
     * @param id
     * @returns CondemnedEquipment OK
     * @throws ApiError
     */
    public static getCondemnedEquipmentById(
        id: number,
    ): CancelablePromise<CondemnedEquipment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/condemned-equipment/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns CondemnedEquipment OK
     * @throws ApiError
     */
    public static updateCondemnedEquipment(
        id: number,
        requestBody: CondemnedEquipment,
    ): CancelablePromise<CondemnedEquipment> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/condemned-equipment/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteCondemnedEquipment(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/condemned-equipment/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns CondemnedEquipment OK
     * @throws ApiError
     */
    public static getAllCondemnedEquipment(): CancelablePromise<Array<CondemnedEquipment>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/condemned-equipment',
        });
    }
    /**
     * @param requestBody
     * @returns CondemnedEquipment OK
     * @throws ApiError
     */
    public static createCondemnedEquipment(
        requestBody: CondemnedEquipment,
    ): CancelablePromise<CondemnedEquipment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/condemned-equipment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
