/**
 * Las proyecciones son una interfaz que ofrece
 * Spring Framework que permite reducir el número de datos
 * enviados a través de nuestros endpoint
 */
package com.openfirma.springhateoas.domain.entities.projections;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "UserIdNameAvatar", types = {User.class})
/**
 * Simplificación de la entidad User
 *
 */
public interface SimpleUser {

    /**
     * Id de la petición
     * @return id de la petición de firma
     */
    Long getId();

    /**
     * Nombre y primer apellido del usuario
     * @return Nombre del usuario
     */
    @Value("#{target.name} #{target.lastName1}")
    String getName();

    /**
     * Avatar del usuario
     * @return evatar del usuario
     */
    String getAvatar();
}
