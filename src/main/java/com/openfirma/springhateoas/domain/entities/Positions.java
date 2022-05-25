package com.openfirma.springhateoas.domain.entities;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@AllArgsConstructor // Genera un constructor con todos los argumentos
@NoArgsConstructor // Genera un constructor sin argumentos
@Getter // Genera todos los getters
@Setter // Genera todos los setters
@Entity(name = "Positions") // Define la clase como "Entidad". Spring JPA utiliza esta anotación para generar la correspondiente tabla en BBDD
@Table(name = "positions") // Define el nombre que tendrá la tabla en la BBDD.
/**
 * Clase Positions
 * Modela un cargo político o administrativo dentro del dominio.
 * Dispone de Getter y Setter autogenerados por Lombok
 *
 * @Author JosePinoGuisado
 * @Version 0.5
 *
 */
public class Positions {

    /**
     * Define la id del documento
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * Define el nombre o denominación del cargo
     */
    @Column(name = "denomination", length = 50)
    private String denomination;

    /**
     * Define la fecha de creación del cargo
     */
    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate = LocalDateTime.now();

    /**
     * Define el tipo de cargo
     */
    @Column(name = "type_of_position", length = 50)
    private String typeOfPosition;

    /**
     * Sobreescribe el método equals
     * Compara un objeto con cargo e indica si es el mismo
     * @param o El objeto a comparar
     * @return true si es igual, false si es distinto.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Positions positions = (Positions) o;
        return id != null && Objects.equals(id, positions.id);
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