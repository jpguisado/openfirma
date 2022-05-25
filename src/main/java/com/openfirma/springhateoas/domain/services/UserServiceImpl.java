package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.User;
import com.openfirma.springhateoas.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
/**
 * Implementa los métodos definidos en la clase UserServiceImpl
 */
public class UserServiceImpl implements UserService {

    /**
     * Repositorio de usuarios
     */
    private final UserRepository userRepository;

    /**
     * Codificador de contraseña
     */
    private final PasswordEncoder passwordEncoder;

    /**
     /**
     * Sobreescribe el método findByUsername.
     * Localiza un usuario por su nombre.
     * @param username username a localizar
     * @return Usuario localizado por username
     */
    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Sobreescribe el método findById
     * Localiza un usuario por su Id.
     * @param id Id del usuario a localizar
     * @return Usuario localizado por ID
     */
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Crea un nuevo usuario codificando su clave correctamente
     * @param user Usuario a crear
     * @return Usuario creado
     */
    @Override
    public User newUser(User user){
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    /**
     * Edita los campos de usuario.
     * Solo almacena aquellos campos con contenido, obviando los nulos
     * @param user Usuario cuyos campos hay que editar.
     * @return Usuario editado
     */
    @Override
    public User editUser(User user){

        /**
         * Localizamos el usuario por Id
         */
        User storedUser = userRepository.findById(user.getId()).orElseThrow();

        /**
         * Si la id es distinta a nulla
         * Comprobamos cada uno de los campos pasados
         * alterando solo aquellos que tienen contenido
         */
        if(user.getId() != null ) {

            if(user.getUsername() != null) {
                storedUser.setUsername(user.getUsername());
            }

            if (user.getName() != null) {
                storedUser.setName(user.getName());
            }

            if (user.getLastName1() != null) {
                storedUser.setLastName1(user.getLastName1());
            }

            if (user.getLastName2() != null) {
                storedUser.setLastName2(user.getLastName2());
            }

            if (user.getLanguage() != null) {
                storedUser.setLanguage(user.getLanguage());
            }

            if(user.getStatus() != null) {
                storedUser.setStatus(user.getStatus());
            }

            if(user.getAvatar() != null) {
                storedUser.setAvatar(user.getAvatar());
            }

            if(user.getNif() != null) {
                storedUser.setNif(user.getNif());
            }

            if(user.getPositions() != null) {
                storedUser.setPositions(user.getPositions());
            }

            if(user.getRoles() != null) {
                storedUser.setRoles(user.getRoles());
            }

        }

        // Almacenamos el usuario editado
        userRepository.save(storedUser);

        return storedUser;

    }

    /**
     * Modifica la contraseña
     * @param userId Id del usuario cuya contraseña queremos editar
     * @param oldPassword Contraseña antigua
     * @param newPassword Contraseña nueva
     * @return True si modifica la clave correctamente
     */
    @Override
    public boolean editPassword(Long userId, CharSequence oldPassword, String newPassword) {

        User user = userRepository.getById(userId);

        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            return true;
        }
        return false;

    }

}
