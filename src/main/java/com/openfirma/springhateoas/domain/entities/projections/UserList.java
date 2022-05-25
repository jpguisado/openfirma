
package com.openfirma.springhateoas.domain.entities.projections;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userList", types = {User.class})
/**
 * Simplificación de la entidad User
 *
 */
public interface UserList {

    Long getId();

    String getUsername();

    @Value("#{target.name} #{target.lastName1} #{target.lastName2}")
    String getFullName();

    String getStatus();

    String getAvatar();
}
