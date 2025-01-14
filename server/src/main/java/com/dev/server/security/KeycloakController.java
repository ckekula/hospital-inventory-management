package com.dev.server.security;

import com.dev.server.services.KeycloakService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/keycloak")
@RequiredArgsConstructor
public class KeycloakController {
    private final KeycloakService keycloakService;

    @GetMapping("/users")
    @Secured("ROLE_hims_admin") // Changed from ROLE_admin
    public ResponseEntity<List<UserRepresentation>> getAllUsers() {
        return ResponseEntity.ok(keycloakService.getAllUsers());
    }

    @PutMapping("/users/{id}")
    @Secured("ROLE_hims_admin")
    public ResponseEntity<Void> updateUser(
            @PathVariable String id,
            @RequestBody UserRepresentation user) {
        keycloakService.updateUser(id, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/{id}")
    @Secured("ROLE_hims_admin")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        keycloakService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users")
    @Secured("ROLE_hims_admin")
    public ResponseEntity<UserRepresentation> createUser(@RequestBody UserRepresentation user) {
        return ResponseEntity.ok(keycloakService.createUser(user));
    }
}