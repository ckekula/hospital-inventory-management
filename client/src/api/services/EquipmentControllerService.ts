/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Equipment } from '../models/Equipment';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EquipmentControllerService {
    /**
     * @param id
     * @returns Equipment OK
     * @throws ApiError
     */
    public static getEquipmentById(
        id: number,
    ): CancelablePromise<Equipment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/equipment/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Equipment OK
     * @throws ApiError
     */
    public static updateEquipment(
        id: number,
        requestBody: Equipment,
    ): CancelablePromise<Equipment> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/equipment/{id}',
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
    public static deleteEquipment(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/equipment/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Equipment OK
     * @throws ApiError
     */
    public static getAllEquipment(): CancelablePromise<Array<Equipment>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/equipment',
        });
    }
    /**
     * @param requestBody
     * @returns Equipment OK
     * @throws ApiError
     */
    public static createEquipment(
        requestBody: Equipment,
    ): CancelablePromise<Equipment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/equipment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
