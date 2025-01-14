package com.dev.server.services;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.ws.rs.core.Response;

@Service
@RequiredArgsConstructor
public class KeycloakService {
    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public List<UserRepresentation> getAllUsers() {
        return keycloak.realm(realm)
                .users()
                .list();
    }

    public UserRepresentation createUser(UserRepresentation userRepresentation) {
        // Create a temporary password
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue("temp" + System.currentTimeMillis());
        credential.setTemporary(true);
        userRepresentation.setCredentials(List.of(credential));

        Response response = keycloak.realm(realm)
                .users()
                .create(userRepresentation);

        String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

        return keycloak.realm(realm)
                .users()
                .get(userId)
                .toRepresentation();
    }

    public void updateUser(String userId, UserRepresentation userRepresentation) {
        keycloak.realm(realm)
                .users()
                .get(userId)
                .update(userRepresentation);
    }

    public void deleteUser(String userId) {
        keycloak.realm(realm)
                .users()
                .get(userId)
                .remove();
    }
}