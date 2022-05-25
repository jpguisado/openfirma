package com.openfirma.springhateoas.domain.entities;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@AllArgsConstructor // Genera un constructor con todos los argumentos
@NoArgsConstructor // Genera un constructor sin argumentos
@Getter // Genera todos los getters
@Setter // Genera todos los setters
@Entity(name = "Document") // Define la clase como "Entidad". Spring JPA utiliza esta anotación para generar la correspondiente tabla en BBDD
@Table(name = "document") // Define el nombre que tendrá la tabla en la BBDD.
/**
 * Clase Documento
 * Modela un documento dentro del dominio.
 * Dispone de Getter y Setter autogenerados por Lombok
 *
 * @Author JosePinoGuisado
 * @Version 0.5
 *
 */
public class Document {

    /**
     * Define la id del documento
     */
    @Id // Marca el campo como ID
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Marca el campo como auto incrementable
    @Column(name = "id", nullable = false) // Define el nombre de la columna en la tabla de la BBDD y lo marca como not_null
    private Long id;

    /**
     * Define el nombre del documento
     */
    @Column(name = "document_name", nullable = false)
    private String documentName;

    /**
     * Define el tamaño del documento
     */
    @Column(name = "document_size", nullable = false)
    private Long documentSize;

    /**
     * Define el tipo de documento
     */
    @Column(name = "type", nullable = false, length = 25) // Limita el tamaño del campo
    private String type;

    /**
     * Define la URL de acceso al documento
     */
    @Column(name = "document_uri", nullable = false)
    private String documentURI;

    /**
     * Sobreescribe el método equals
     * Compara un objeto con documento e indica si es el mismo
     * @param o El objeto a comparar
     * @return true si es igual, false si es distinto.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Document document = (Document) o;
        return id != null && Objects.equals(id, document.id);
    }

    /**
     * Sobre el método hashCode
     * @return
     */
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}