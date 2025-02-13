/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReceivedEquipment } from '../models/ReceivedEquipment';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReceivedEquipmentControllerService {
    /**
     * @param id
     * @returns ReceivedEquipment OK
     * @throws ApiError
     */
    public static getReceivedEquipmentById(
        id: number,
    ): CancelablePromise<ReceivedEquipment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/received-equipment/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ReceivedEquipment OK
     * @throws ApiError
     */
    public static updateReceivedEquipment(
        id: number,
        requestBody: ReceivedEquipment,
    ): CancelablePromise<ReceivedEquipment> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/received-equipment/{id}',
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
    public static deleteReceivedEquipment(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/received-equipment/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns ReceivedEquipment OK
     * @throws ApiError
     */
    public static getAllReceivedEquipment(): CancelablePromise<Array<ReceivedEquipment>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/received-equipment',
        });
    }
    /**
     * @param requestBody
     * @returns ReceivedEquipment OK
     * @throws ApiError
     */
    public static createReceivedEquipment(
        requestBody: ReceivedEquipment,
    ): CancelablePromise<ReceivedEquipment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/received-equipment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
