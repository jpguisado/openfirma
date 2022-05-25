package com.openfirma.springhateoas.domain.entities.dtos.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
/**
 * Objeto Data transfer Object (DTO)
 * Lo utilizamos para devolver una versión simplificada
 * de la entidad usuaria cuando un usuario realiza login
 * en la aplicación. Se le añade el token de autenticación.
 *
 *
 */
public class GetLoggedUserDTO extends GetUserDTO{

    /**
     * Cadena de texto que alojará el token
     */
    String token;

    /**
     *
     * @param id Id del usuario logeado
     * @param name Nombre del usuario logeado
     * @param username Username del usuario logeado
     * @param avatar Avatar del usuario logeado
     * @param fullName Nombre completo del usuario logeado
     * @param token Token de autenticación del usuario logado
     */
    @Builder(builderMethodName="getLoggedUserBuilder")
    public GetLoggedUserDTO(Long id, String name, String username, String avatar, String fullName, String token){
        super(id, name, fullName, username, avatar);
        this.token = "Bearer " + token;
    }

}
