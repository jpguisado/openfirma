package com.openfirma.springhateoas.domain.entities;

import lombok.*;
import org.hibernate.Hibernate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Clase Usuario.
 *
 * <p>Modela un usuario dentro del dominio.</p>
 * <p>Dispone de Getter y Setter autogenerados por Lombok.</p>
 * <p>Implementa la clase UserDetails de Spring</p>
 *
 * @version 0.5
 * @author JosePinoGuisado
 *
 */
@AllArgsConstructor // Genera un constructor con todos los argumentos
@NoArgsConstructor // Genera un constructor sin argumentos
@Getter // Genera todos los getters
@Setter // Genera todos los setters
@ToString
@Entity(name = "User")
@Table(name = "user")
public class User implements UserDetails {

    private static final long serialVersionUID = 6189678452627071360L;

    /**
     * Define la id del documento
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * Define el nombre de usuario
     */
    @Basic(fetch = FetchType.LAZY)
    @NotNull
    @Column(name = "username", unique = true, length = 25)
    private String username;

    /**
     * Define la contraseña del usuario.
     */
    @Basic(fetch = FetchType.LAZY)
    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    /**
     * Define el nombre del usuario.
     */
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Define el primer apellido del usuario.
     */
    @Size(min = 2, message="El nombre de usuario debe tener al menos 2 caracteres")
    @Column(name = "last_name_1", nullable = false)
    private String lastName1;

    /**
     * Define el segundo apellido del usuario.
     * El segundo apellido no es un campo obligatorio.
     */
    @Column(name = "last_name_2")
    private String lastName2;

    /**
     * Define el idioma del usuario
     */
    @Column(name = "language")
    @NotNull
    private String language;

    /**
     * Define el estado del usuario
     */
    @Column(name = "status", nullable = false)
    private String status;

    /**
     * Define el avatar del usuario
     */
    @Column(name = "avatar")
    private String avatar;

    /**
     * Define el NIF del usuario
     */
    @Column(name = "IdentificationNumber")
    private String nif;

    /**
     * Define los cargos del usuario
     */
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_positions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "positions_id"))
    private Set<Positions> positions = new LinkedHashSet<>();

    /**
     * Define los roles del usuario
     */
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "UserRoles", nullable = false)
    private Set<UserRoles> roles;

    /**
     * Sobreescribe el método GrantedAuthority de Spring Security
     * Define los permisos del usuario.
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(ur -> new SimpleGrantedAuthority("ROLE_" + ur.name())).collect(Collectors.toList());
    }

    /**
     * Sobreescribe la clase isAccountNonExpired
     * Determina si la cuenta del usuario está activa.
     * Por defecto todas las cuentas no expiran
     * @return true si la cuenta sigue vigente
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Sobreescribe la clase isAccountNonLocked
     * Determina si la cuenta del usuario está bloqueada
     * @return true si está en estado distinto a Bloqueado
     */
    @Override
    public boolean isAccountNonLocked() {
        if(status.equalsIgnoreCase("Bloqueado")) {
            return false;
        }
        return true;
    }

    /**
     * Sobreescribe la clase isCredentialsNonExpired
     * Determina si la contraseña ha caducado
     * @return true si las credenciales no han expirado
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Sobreescribe la clase isEnable
     * Determina si la cuenta está habilitada
     * @return true si la cuenta está en estado Alta
     */
    @Override
    public boolean isEnabled() {
        if(!status.equalsIgnoreCase("Alta")) {
            return false;
        }
        return true;
    }

    /**
     * Define los documentos adjuntos a la petición de firma.
     * Establece una relación con la entidad documentos.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}