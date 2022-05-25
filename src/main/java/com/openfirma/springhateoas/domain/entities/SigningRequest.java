package com.openfirma.springhateoas.domain.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@AllArgsConstructor // Genera un constructor con todos los argumentos
@NoArgsConstructor // Genera un constructor sin argumentos
@Getter // Genera todos los getters
@Setter // Genera todos los setters
@ToString // Genera un método toString
@Entity(name = "SigningRequest") // Define la clase como "Entidad". Spring JPA utiliza esta anotación para generar la correspondiente tabla en BBDD
@Table(name = "signing_request") // Define el nombre que tendrá la tabla en la BBDD.
/**
 * Clase Petición de firma
 * Modela una petición de firma dentro del dominio.
 * Dispone de Getter y Setter autogenerados por Lombok
 *
 * @Author JosePinoGuisado
 * @Version 0.5
 *
 */
public class SigningRequest {

    /**
     * Define la id del documento
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * Define la fecha de la petición
     */
    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate = LocalDateTime.now();

    /**
     * Define el mensaje adjunto a la petición
     */
    @Column(name = "message")
    private String message;

    /**
     * Define el usuario remitente de la petición.
     * Establece una relación con la entidad Usuario
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = " user_id")
    private User sender;

    /**
     * Define los usuarios destinatarios de la petición.
     * Establece una relación con la entidad Usuario.
     */
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "signing_request_addresses",
            joinColumns = @JoinColumn(name = "signing_request_id"),
            inverseJoinColumns = @JoinColumn(name = "addressee_id"))
    private Set<User> addressee = new LinkedHashSet<>();

    /**
     * Define el estado de la petición.
     *
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private status status;

    /**
     * Define los documentos adjuntos a la petición de firma.
     * Establece una relación con la entidad documentos.
     */
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "signing_request_documents",
            joinColumns = @JoinColumn(name = "signing_request_id"),
            inverseJoinColumns = @JoinColumn(name = "documents_id"))
    private Set<Document> documents = new LinkedHashSet<>();

    public enum status {
        SIGNED, PENDING, DRAFT,
    }



}