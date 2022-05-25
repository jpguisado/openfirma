package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@Component("beforeCreateWebsiteUserValidator")
/**
 * Establece las validaciones a ejecutar en el controlador de usuarios
 * Validará que el usuario creado cumple con los requisitos mínimos y evita que lleguen
 * peticiones corruptas al servidor.
 *
 */
public class RestUserValidator implements Validator {

    @Override
    /**
     * Método que comprueba si la entidad a validar es del tipo adecuado
     */
    public boolean supports(Class<?> clazz) {
        return EntityModel.class.equals(clazz);
    }

    @Override
    /**
     * Método que realiza las validaciones
     */
    public void validate(Object target, Errors errors) {

        /**
         * Método proporcionado por Spring
         * Facilita la validación de cadenas de texto
         * Si está vacía o es nula, rechaza el campo
         */
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "content.name", "El nombre no puede estar vacío o contener espacios en blanco ");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "content.lastName1", "El apellido no puede estar vacío o contener espacios en blanco ");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "content.username", "El username no puede estar vacío o contener espacios en blanco" );
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "content.password", "La contraseña no puede estar vacío o contener espacios en blanco" );
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "content.status", "El estado no puede estar vacío o contener espacios en blanco ");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "content.nif", "El NIF no puede estar vacío o contener espacios en blanco ");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "content.roles", "Los permisos no pueden estar vacíos o contener espacios en blanco ");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "content.positions", "El cargo no puede estar vacío o contener espacios en blanco ");

        EntityModel<User> user = (EntityModel<User>) target;

        /**
         * Comprueba que el nombre del usuario tiene al menos tres caracteres
         */
        if(user.getContent().getName().length() < 3) {
            errors.rejectValue("content.name", "El nombre debe tener al menos tres caracteres");
        }

        /**
         * Comprueba si el nombre del usuario tiene al menos dos caracteres
         */
        if(user.getContent().getLastName1().length() < 2) {
            errors.rejectValue("content.name", "El primer apellido debe tener al menos dos caracteres");
        }

        /**
         * Comprueba si el NIF del usuario tiene al menos 9 caracteres
         */
        if(user.getContent().getNif().length() < 9) {
            errors.rejectValue("content.name", "El NIF tiene nueve caracteres");
        }


    }

}
