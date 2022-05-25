/**
 * Las proyecciones son una interfaz que ofrece
 * Spring Framework que permite reducir el número de datos
 * enviados a través de nuestros endpoint
 */
package com.openfirma.springhateoas.domain.entities.projections;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userDetails", types = {User.class})
/**
 * Simplificación de la entidad User
 *
 */
public interface UserDetails {

    /**
     * Id del usuario
     * @return id del usuario
     */
    Long getId();

    /**
     * Username del usuario
     * @return username
     */
    String getUsername();

    /**
     * Nombre del usuario
     * @return Nombre del usuario
     */
    String getName();

    /**
     * Primer apellido del usuario
     * @return primer apellido del usuario
     */
    String getLastName1();

    /**
     * Segundo apellido del usuario
     * @return segundo apellido del usuario
     */
    String getLastName2();

    /**
     * Idioma del usuario
     * @return idioma del usuario
     */
    String getLanguage();

    /**
     * Avatar del usuario
     * @return URL del avatar del usuario
     */
    String getAvatar();

    /**
     * NIF del usuario
     * @return NIF del usuario
     */
    String getNif();

}
