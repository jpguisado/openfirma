package com.openfirma.springhateoas.domain.entities.dtos.User;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.stereotype.Component;

@Component
/**
 * Transforma la entidad en DTO
 */
public class UserDtoConverter {

    public GetUserDTO convertUserEntityToGetUserDto(User user) {
        return GetUserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .fullName(user.getName()+ " "+ user.getLastName1())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }

}
