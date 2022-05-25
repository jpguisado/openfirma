/**
 * Las proyecciones son una interfaz que ofrece
 * Spring Framework que permite reducir el número de datos
 * enviados a través de nuestros endpoint
 */

package com.openfirma.springhateoas.domain.entities.projections;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.openfirma.springhateoas.domain.entities.SigningRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;

@Projection(name = "requestDetails", types = {SigningRequest.class})
/**
 * Simplificación de la entidad SigningRequest
 *
 */
public interface requestDetails {

    /**
     * Id de la petición
     * @return id de la petición de firma
     */
    String getId();

    /**
     * Fecha de la petición
     * @return Fecha de la petición en formato dd-MM-AAAA HH:mm
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    LocalDateTime getRequestDate();

    /**
     * Mensaje que acompaña la petición
     * @return el mensaje
     */
    String getMessage();

    /**
     * Forma el nombre completo del remitente a partir de los campos nombre, primer apellido y segundo apellido
     * @return Nombre completo del remitente
     */
    @Value("#{target.sender.name} #{target.sender.lastName1} #{target.sender.lastName2}")
    String getSenderFullName();

    /**
     * El cargo del remitente si lo tuviera
     * @return Cargo del remitente
     */
    @Value("#{target.sender.positions.![denomination]}")
    String getSenderPosition();

    /**
     * Avatar del remitente
     * @return Avatar del remitente
     */
    @Value("#{target.sender.avatar}")
    String getSenderAvatar();

    /**
     * Nombre de los documentos adjuntos a la petición
     * @return Nombre de documentos adjuntos
     */
    @Value("#{target.documents.![documentName]}")
    String getDocumentName();

    /**
     * URI de los documentos adjuntos a la petición
     * @return URI de documentos adjuntos
     */
    @Value("#{target.documents.![documentURI]}")
    String getDocumentURI();

}
