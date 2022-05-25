package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Interfaz que define el contrato de UserService.
 * No implementa los métodos
 */
public interface UserService {

    User newUser(User user);

    User editUser(User user);

    boolean editPassword(Long userId, CharSequence oldPassword, String newPassword);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);


}
