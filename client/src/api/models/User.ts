/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GrantedAuthority } from './GrantedAuthority';
import type { Role } from './Role';
export type User = {
    id?: number;
    firstname?: string;
    lastname?: string;
    dateOfBirth?: string;
    email?: string;
    password?: string;
    accountLocked?: boolean;
    enabled?: boolean;
    roles?: Array<Role>;
    createdDate?: string;
    lastModifiedDate?: string;
    name?: string;
    fullName?: string;
    accountNonLocked?: boolean;
    username?: string;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
    authorities?: Array<GrantedAuthority>;
};

