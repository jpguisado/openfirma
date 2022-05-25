package com.openfirma.springhateoas.domain.repositories;

import com.openfirma.springhateoas.domain.entities.Positions;
import com.openfirma.springhateoas.domain.entities.User;
import com.openfirma.springhateoas.domain.entities.UserRoles;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository underTest;

    @Test
    @DisplayName("Devolver usuario por nombre de usuario")
    void itShouldFindUserByUsername() {

        Positions position = new Positions(
                1L,
                "Secretario General",
                LocalDateTime.now(),
                "FLHN"
        );

        Set<Positions> userPos = new HashSet<>();

        System.out.println(position);

        userPos.add(position);

        Set<UserRoles> userRoles = new HashSet<>();

        userRoles.add(UserRoles.USER);

        Long id = 1L;
        String username = "jpguisado";
        String password = "00180018";
        String name = "Jose";
        String lastName1 = "Pino";
        String lastName2 = "Guisado";
        String language = "Castellano";
        String status = "Alta";
        String avatar = "23.jpg";
        String nif = "49092989H";

        // given
        User user = new User(
                id,
                username,
                password,
                name,
                lastName1,
                lastName2,
                language,
                status,
                avatar,
                nif,
                userPos,
                userRoles
        );

        underTest.save(user);

        // when
        Optional<User> foundUser = underTest.findByUsername("jpguisado");
        User tested = foundUser.get();
        // then
        assertThat(tested).isInstanceOf(User.class);
    }

}