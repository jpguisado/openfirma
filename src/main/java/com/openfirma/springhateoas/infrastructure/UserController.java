package com.openfirma.springhateoas.infrastructure;

import com.openfirma.springhateoas.domain.entities.User;
import com.openfirma.springhateoas.domain.services.RestUpdateUserValidator;
import com.openfirma.springhateoas.domain.services.RestUserValidator;
import com.openfirma.springhateoas.domain.services.StorageService;
import com.openfirma.springhateoas.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
/**
 * Gestiona las peticiones http relacionadas con los usuarios
 */
public class UserController {

    // Dependencia userService
    private final UserService userService;

    // Dependencia storageService
    private final StorageService storageService;

    // Relaciona el método de validación con la petición
    @InitBinder()
    public void initCreatorDTOBinder(WebDataBinder binder) {
        if (binder.getObjectName().equals("usuarioEditado")) {
            binder.setValidator(new RestUpdateUserValidator());
        }
        if (binder.getObjectName().equals("usuarioCreado")) {
            binder.addValidators(new RestUserValidator());
        }
    }

    /**
     * Método que gestiona la peticiónd e actualización
     * @param usuarioEditado Los datos del usuario a editar
     * @param file El avatar
     * @return
     */
    @PatchMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestPart EntityModel<User> usuarioEditado,
                                        @RequestPart(value = "avatar", required = false) @Nullable MultipartFile file) {

        // Almacenamos la URL del avatar en esta variable
        String urlFichero;

        if (file != null && !file.isEmpty()) {

            String fichero = storageService.store(file);

            // Construimos la URL
            urlFichero = MvcUriComponentsBuilder
                    .fromMethodName(FileController.class, "serveFile", fichero, null)
                    .build().toUriString();
                    usuarioEditado.getContent().setAvatar(urlFichero);
        }

        return ResponseEntity.status(HttpStatus.OK).body(userService.editUser(usuarioEditado.getContent()));
    }


    /**
     * Método que gestiona al alta de un nuevo usuario
     * @param usuarioCreado Los datos del usuario a crear
     * @param file El avatar del usuario
     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<?> newUser(@Valid @RequestPart EntityModel <User> usuarioCreado,
                                     @RequestPart(value = "avatar") MultipartFile file) {

        // Almacenamos la URL del avatar en esta variable
        String urlFichero;

        if (file != null && !file.isEmpty()) {

            String fichero = storageService.store(file);

            // Construimos la URL
            urlFichero = MvcUriComponentsBuilder
                    .fromMethodName(FileController.class, "serveFile", fichero, null)
                    .build().toUriString();

            usuarioCreado.getContent().setAvatar(urlFichero);
        }

        userService.newUser(usuarioCreado.getContent());

        return ResponseEntity.status(HttpStatus.OK).body(usuarioCreado.getContent());
    }

}
