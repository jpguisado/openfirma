package com.openfirma.springhateoas.domain.entities.dtos.User;

import lombok.*;

import java.io.Serializable;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
/**
 * Representa una versión simplificada de la entidad User
 * Lo utilizaremos en el controlador de autenticación
 */
public class GetUserDTO implements Serializable {

    private Long id;
    private String name;
    private String fullName;
    private String username;
    private String avatar;

}
