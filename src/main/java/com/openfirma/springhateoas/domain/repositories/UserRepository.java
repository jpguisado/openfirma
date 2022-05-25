/**
 * Spring JPA facilita el acceso a BBDD
 * y expone endpoints para las operaciones más habituales
 * como creación, edición, actualizacion y lectura de las entidades.
 * Para ello, simplemente tenemos que declarar la interfaz haciendo que extienda de JpaRepository
 */
package com.openfirma.springhateoas.domain.repositories;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Interfaz que extiende a JpaRepository que a su vez es proporcionada por Spring.
 * Se trata de una interfaz que llama a la bbdd y expone
 * los métodos comunes de gestión de entidades (CREATE, UPDATE, READ, DELETE).
 *
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Busca un usuario por su username
     * @param username Nombre de usuario que utilizaremos par buscar
     * @return Entidad Usuario recuperada, si la encuentra.
     */
    Optional<User> findByUsername(String username);

}