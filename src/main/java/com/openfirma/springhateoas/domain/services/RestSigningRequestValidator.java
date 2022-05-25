package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.SigningRequest;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component("beforeCreateWebsiteSigningRequestValidator")
/**
 * Establece las validaciones a ejecutar en el controlador de peticiones de firma
 * Validará que la petición creada cumple con los requisitos mínimos y evita que lleguen
 * peticiones corruptas al servidor.
 *
 */
public class RestSigningRequestValidator implements Validator {

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

        EntityModel<SigningRequest> signingRequest = (EntityModel<SigningRequest>) target;

        /**
         * Comprobamos si la petición contiene destinatarios
         */
        if(signingRequest.getContent().getAddressee().size() >= 1) {
            errors.rejectValue("content.addressee", "La petición debe tener al menos un destinatario");
        }

        /**
         * Comprobamos si la petición tiene remitente
         */
        if(signingRequest.getContent().getSender() != null ) {
            errors.rejectValue("content.name", "La petición debe tener al menos un remitente");
        }

        /**
         * Comprobamos si la petición contiene documentos adjuntos
         */
        if(signingRequest.getContent().getDocuments().size() >= 1) {
            errors.rejectValue("content.name", "El NIF tiene nueve caracteres");
        }

        /**
         * Comprobamos si el tamaño del mensaje es mayor de 500 caracteres
         */
        if(signingRequest.getContent().getMessage().length() > 500 ) {
            errors.rejectValue("content.message", "El mensaje adjunto es demasiado largo (500 caracteres máximo)");
        }

    }

}
