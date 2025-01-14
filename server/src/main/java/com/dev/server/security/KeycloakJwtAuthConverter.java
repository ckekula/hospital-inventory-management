package com.dev.server.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.beans.factory.annotation.Value;

import java.util.*;
import java.util.stream.Stream;
import static java.util.stream.Collectors.toSet;

public class KeycloakJwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    @Value("${keycloak.service-account.client-id}")
    private String clientId;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = Stream.concat(
                extractRealmRoles(jwt).stream(),
                extractResourceRoles(jwt).stream())
                .collect(toSet());

        return new JwtAuthenticationToken(jwt, authorities);
    }

    private Collection<GrantedAuthority> extractResourceRoles(Jwt jwt) {
        Map<String, Object> resourceAccess;
        Map<String, Object> resource;
        Collection<String> resourceRoles;

        if (jwt.getClaim("resource_access") == null) {
            return Set.of();
        }

        resourceAccess = jwt.getClaim("resource_access");

        if (resourceAccess.get(clientId) == null) {
            return Set.of();
        }

        resource = (Map<String, Object>) resourceAccess.get(clientId);
        resourceRoles = (Collection<String>) resource.get("roles");

        return resourceRoles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(toSet());
    }

    private Collection<GrantedAuthority> extractRealmRoles(Jwt jwt) {
        Map<String, Object> realmAccess;
        Collection<String> realmRoles;

        if (jwt.getClaim("realm_access") == null) {
            return Set.of();
        }

        realmAccess = jwt.getClaim("realm_access");
        realmRoles = (Collection<String>) realmAccess.get("roles");

        return realmRoles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(toSet());
    }
}