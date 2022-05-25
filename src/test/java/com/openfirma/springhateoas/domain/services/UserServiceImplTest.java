package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.User;
import com.openfirma.springhateoas.domain.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class) // Extendemos las funcionalidades de JUNIT con Mockito.
class UserServiceImplTest {

    @Mock private UserRepository userRepository;

    private UserService underTest;

    private PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);

    // Inicialización que necesitamos antes de ejecutar cada uno de los test
    @BeforeEach
    void setUp(){
        underTest = new UserServiceImpl(userRepository, passwordEncoder);
    }

    @Test // Indica que este método es de pruebas
    @DisplayName("Comprobar si el servicio localiza usuarios por su username") // Define el nombre del test
    void canFindByUserName(){

        // Given
        Long id = 1L;
        String username = "jpguisado";
        String password = "001800180";
        String name = "Jose";
        String lastName1 = "Pino";
        String lastName2 = "Guisado";
        String language = "Castellano";
        String status = "Alta";
        String avatar = "23.jpg";
        String nif = "49092989H";

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
                null,
                null
        );

        given(userRepository.findByUsername("jpguisado")).willReturn(Optional.of(user));

        Optional<User> foundUser = underTest.findByUsername("jpguisado");

        assertThat(foundUser.get()).isEqualTo(user);

    }

    @Test
    @DisplayName("Comprobar si devuelve error al no encontrar por username")
    void canNotFindByUserName(){

        given(userRepository.findByUsername("jpguisado")).willReturn(Optional.empty());

        Optional<User> foundUser = underTest.findByUsername("jpguisado");

        assertThat(foundUser.isPresent()).isEqualTo(false);

    }

    @Test
    @DisplayName("Comprobar si el servicio localiza usuarios por su id")
    void canFindById(){
        // Given
        Long id = 1L;
        String username = "jpguisado";
        String password = "001800180";
        String name = "Jose";
        String lastName1 = "Pino";
        String lastName2 = "Guisado";
        String language = "Castellano";
        String status = "Alta";
        String avatar = "23.jpg";
        String nif = "49092989H";

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
                null,
                null
        );

        given(userRepository.findById(1L)).willReturn(Optional.of(user));

        Optional<User> foundUser = underTest.findById(1L);

        assertThat(foundUser.get()).isEqualTo(user);
    }

    @Test
    @DisplayName("Comprobar si el servicio devuelve error al no encontrar por id")
    void canNotFindById(){

        given(userRepository.findById(1L)).willReturn(Optional.empty());

        Optional<User> foundUser = underTest.findById(1L);

        assertThat(foundUser.isPresent()).isEqualTo(false);

    }

    @Test
    @DisplayName("Comprobar si el servicio edita solo una parte del usuario")
    void canEditUser(){

        // Given
        Long id = 1L;
        String username = "jpguisado";
        String password = "001800180";
        String name = "Jose";
        String lastName1 = "Pino";
        String lastName2 = "Guisado";
        String language = "Castellano";
        String status = "Alta";
        String avatar = "23.jpg";
        String nif = "49092989H";

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
                null,
                null
        );

        User editedUser = new User(
                id,
                "mariadb",
                password,
                "Maria",
                "Diabolica",
                "Pericolosa",
                "Catalán",
                "Baja",
                "25.jpg",
                "28523166S",
                null,
                null
        );

        given(userRepository.findById(1L)).willReturn(Optional.of(user));

        User u = underTest.editUser(editedUser);

        assertThat(u.getUsername()).isEqualTo("mariadb");
        assertThat(u.getName()).isEqualTo("Maria");
        assertThat(u.getLastName1()).isEqualTo("Diabolica");
        assertThat(u.getLastName2()).isEqualTo("Pericolosa");
        assertThat(u.getLanguage()).isEqualTo("Catalán");
        assertThat(u.getStatus()).isEqualTo("Baja");
        assertThat(u.getAvatar()).isEqualTo("25.jpg");
        assertThat(u.getNif()).isEqualTo("28523166S");

    }

    @Test
    @DisplayName("Comprobar añadir usuarios.")
    void canAddUser(){
        // Given
        Long id = 1L;
        String username = "jpguisado";
        String password = "001800180";
        String name = "Jose";
        String lastName1 = "Pino";
        String lastName2 = "Guisado";
        String language = "Castellano";
        String status = "Alta";
        String avatar = "23.jpg";
        String nif = "49092989H";

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
                null,
                null
        );
        // When
        underTest.newUser(user);

        // Then
        ArgumentCaptor<User> userArgumentCaptor =
                ArgumentCaptor.forClass(User.class);

        verify(userRepository)
                .save(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();

        assertThat(capturedUser).isEqualTo(user);

    }

    @Test
    @DisplayName("Comprobar cambio de contraseña seguro")
    void canChangePassword() {
        // Given
        Long id = 1L;
        String username = "jpguisado";
        String password = "$2a$10$2T5EBgkMrOmBLHAcsqQPd.nUJ0jUDCBjb3ovnDGYvF/QMM.PVp52u";
        String name = "Jose";
        String lastName1 = "Pino";
        String lastName2 = "Guisado";
        String language = "Castellano";
        String status = "Alta";
        String avatar = "23.jpg";
        String nif = "49092989H";

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
                null,
                null
        );

        given(userRepository.getById(user.getId()))
                .willReturn(user);

        CharSequence ch = new StringBuffer("1234");

        given(passwordEncoder.matches(ch, user.getPassword())).willReturn(true);

        boolean result = underTest.editPassword(1L, ch, "nuevacontra");

        assertThat(result).isTrue();

    }

    @Test
    @DisplayName("Comprobar que no puede cambiar la contraseña")
    void CanNotChangePassword(){
        // Given
        Long id = 1L;
        String username = "jpguisado";
        String password = "$2a$10$2T5EBgkMrOmBLHAcsqQPd.nUJ0jUDCBjb3ovnDGYvF/QMM.PVp52u";
        String name = "Jose";
        String lastName1 = "Pino";
        String lastName2 = "Guisado";
        String language = "Castellano";
        String status = "Alta";
        String avatar = "23.jpg";
        String nif = "49092989H";

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
                null,
                null
        );

        given(userRepository.getById(user.getId()))
                .willReturn(user);

        CharSequence ch = new StringBuffer("1234");

        given(passwordEncoder.matches(ch, user.getPassword())).willReturn(false);

        boolean result = underTest.editPassword(1L, ch, "nuevacontra");

        assertThat(result).isFalse();
    }

}