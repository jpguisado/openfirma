package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import javax.validation.ConstraintValidator;

@Component("beforeCreateWebsiteUserValidatorUpdate")
/**
 * Establece las validaciones a ejecutar en el controlador de usuarios
 * Validará que el usuario creado cumple con los requisitos mínimos y evita que lleguen
 * peticiones corruptas al servidor.
 *
 */
public class RestUpdateUserValidator implements Validator {

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

        EntityModel<User> user = (EntityModel<User>) target;

        /**
         * Comprueba que el nombre del usuario tiene al menos tres caracteres
         */
        if(user.getContent().getName() != null && user.getContent().getName().length() < 3) {
            errors.rejectValue("content.name", "El nombre debe tener al menos tres caracteres");
        }

        /**
         * Comprueba si el nombre del usuario tiene al menos dos caracteres
         */
        if(user.getContent().getLastName1() != null && user.getContent().getLastName1().length() < 2) {
            errors.rejectValue("content.name", "El primer apellido debe tener al menos dos caracteres");
        }

        /**
         * Comprueba si el NIF del usuario tiene al menos 9 caracteres
         */
        if(user.getContent().getNif() != null && user.getContent().getNif().length() < 9) {
            errors.rejectValue("content.name", "El NIF tiene nueve caracteres");
        }


    }

}
