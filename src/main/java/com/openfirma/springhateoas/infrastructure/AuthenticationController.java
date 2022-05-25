package com.openfirma.springhateoas.infrastructure;

import com.openfirma.springhateoas.domain.entities.User;
import com.openfirma.springhateoas.domain.entities.dtos.User.GetLoggedUserDTO;
import com.openfirma.springhateoas.domain.entities.dtos.User.GetUserDTO;
import com.openfirma.springhateoas.domain.entities.dtos.User.UserDtoConverter;
import com.openfirma.springhateoas.security.jwt.JwtTokenProvider;
import com.openfirma.springhateoas.security.jwt.model.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Habilitamos los orígenes cruzados CORS
/**
 * Controlador de autenticación
 * Gestiona las peticiones POST de autenticación
 */
public class AuthenticationController {

    /**
     * Authentication manager proporcionado por Spring
     */
    private final AuthenticationManager authenticationManager;

    /**
     * Proveedor de tokens JWT
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * DTO con el usuario simplificado
     */
    private final UserDtoConverter userDtoConverter;

    /**
     * Método que gestiona el login
     * @param loginRequest
     * @return ResponseEntity con los datos del DTO
     */
    @PostMapping("/auth/login")
    public ResponseEntity<GetUserDTO> login (@Valid @RequestBody LoginRequest loginRequest) {

        // Utilizamos el authenticationManager para autenticar al usuario
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                ));

        // Establecemos al usuario como autenticado en el contexto de Spring
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Recuperamos el usuario logeado
        User user = (User) authentication.getPrincipal();

        // Obtenemos el token
        String jwtToken = jwtTokenProvider.generateToken(authentication);

        // Devolvemos la ResponseEntity con el mensaje de CREADO, el user DTO con su TOKEN
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(convertUserEntityToGetUserDto(user,jwtToken));

    }

    /**
     * Retorna los datos básicos de autenticación
     * @param user EL usuario que se autentica
     * @return user info
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/users/me")
    public ResponseEntity<GetUserDTO> me(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(userDtoConverter.convertUserEntityToGetUserDto(user));
    }

    private GetLoggedUserDTO convertUserEntityToGetUserDto(User user, String token){
        return GetLoggedUserDTO
                .getLoggedUserBuilder()
                .id(user.getId())
                .name(user.getName())
                .fullName(user.getName()+ " " + user.getLastName1())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .token(token)
                .build();
    }



}
