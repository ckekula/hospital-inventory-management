/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Unit } from '../models/Unit';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UnitControllerService {
    /**
     * @param id
     * @returns Unit OK
     * @throws ApiError
     */
    public static getUnitById(
        id: number,
    ): CancelablePromise<Unit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Unit OK
     * @throws ApiError
     */
    public static updateUnitHead(): CancelablePromise<Unit> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/unit/{id}',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUnit(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/unit/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Unit OK
     * @throws ApiError
     */
    public static getAllUnits(): CancelablePromise<Array<Unit>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit',
        });
    }
    /**
     * @param requestBody
     * @returns Unit OK
     * @throws ApiError
     */
    public static createUnit(
        requestBody: Unit,
    ): CancelablePromise<Unit> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/unit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
