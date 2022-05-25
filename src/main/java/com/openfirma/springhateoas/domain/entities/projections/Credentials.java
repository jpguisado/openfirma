/**
 * Las proyecciones son una interfaz que ofrece
 * Spring Framework que permite reducir el número de datos
 * enviados a través de nuestros endpoint
 */

package com.openfirma.springhateoas.domain.entities.projections;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.data.rest.core.config.Projection;


@Projection(name = "credentials", types = { User.class })
/**
 * Devuelve solo usuario y contraseña en el endpoint /credentials
 *
 */
public interface Credentials {
    String getUsername();
    String getPassword();
}
