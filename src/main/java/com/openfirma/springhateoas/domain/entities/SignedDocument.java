package com.openfirma.springhateoas.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor // Genera un constructor con todos los argumentos
@NoArgsConstructor // Genera un constructor sin argumentos
@Getter // Genera todos los getters
@Setter // Genera todos los setters
@Entity(name = "signed_document") // Define la clase como "Entidad". Spring JPA utiliza esta anotación para generar la correspondiente tabla en BBDD
@Table(name = "signed_document") // Define el nombre que tendrá la tabla en la BBDD.
/**
 * Clase Documento firmado
 * Modela un documento firmado dentro del dominio.
 * Dispone de Getter y Setter autogenerados por Lombok
 *
 * @Author JosePinoGuisado
 * @Version 0.5
 *
 */
public class SignedDocument {

    /**
     * Define la id del documento
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * Define el documento firmado
     * Establece una relación con la entidad Documento
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "document_id")
    private Document document;

    /**
     * Define la petición de la que nace el documento firmado
     * Establece una relación con la entidad Petición de firma (signingRequest)
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "signing_request_id")
    private SigningRequest signingRequest;

}
