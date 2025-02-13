/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Repair } from '../models/Repair';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RepairControllerService {
    /**
     * @param id
     * @returns Repair OK
     * @throws ApiError
     */
    public static getRepairById(
        id: number,
    ): CancelablePromise<Repair> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/repairs/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Repair OK
     * @throws ApiError
     */
    public static updateRepair(
        id: number,
        requestBody: Repair,
    ): CancelablePromise<Repair> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/repairs/{id}',
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
    public static deleteRepair(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/repairs/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Repair OK
     * @throws ApiError
     */
    public static getAllRepairs(): CancelablePromise<Array<Repair>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/repairs',
        });
    }
    /**
     * @param requestBody
     * @returns Repair OK
     * @throws ApiError
     */
    public static createRepair(
        requestBody: Repair,
    ): CancelablePromise<Repair> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/repairs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
