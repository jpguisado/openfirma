/**
 * Spring JPA facilita el acceso a BBDD
 * y expone endpoints para las operaciones más habituales
 * como creación, edición, actualizacion y lectura de las entidades.
 * Para ello, simplemente tenemos que declarar la interfaz haciendo que extienda de JpaRepository
 */

package com.openfirma.springhateoas.domain.repositories;

import com.openfirma.springhateoas.domain.entities.SigningRequest;
import com.openfirma.springhateoas.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Interfaz que extiende a JpaRepository que a su vez es proporcionada por Spring.
 * Se trata de una interfaz que llama a la bbdd y expone
 * los métodos comunes de gestión de entidades (CREATE, UPDATE, READ, DELETE).
 *
 */
public interface SigningRequestRepository extends JpaRepository<SigningRequest, Long> {

    /**
     * Devuelve las peticiones de firma filtrando por destinatario y estado
     * @param user
     * @param status
     * @return
     */
    Set<SigningRequest> findByAddresseeAndStatusEqualsOrderByRequestDateDesc(User user, SigningRequest.status status);

    /**
     * Devuelve las peticiones de firma pendientes por destinatario
     * @param id
     * @param status
     * @return
     */
    @Query("select s from SigningRequest s inner join s.addressee addressee " +
            "where addressee.id = ?1 and s.status = 'PENDING' " +
            "order by s.requestDate DESC")
    List<SigningRequest> findSigningRequestPendingByAddressees(Long id, SigningRequest.status status);

    /**
     * Devuelve las peticiones de firma filtrando por usuario que envía la petición.
     * @param user
     * @return
     */
    Set<SigningRequest> findSigningRequestBySender(User user);

    /**
     * Devuelve la cantidad de peticiones filtrando por estado pendiente y usuario destinatario
     * @param id Destinatario cuyas peticiones pendientes queremos consultar
     * @return
     */
    @Query("select count(s) from SigningRequest s inner join s.addressee addressee " +
            "where addressee.id = ?1 and s.status = 'PENDING'")
    long countSigningRequestPendingByAddresses(Long id);

    /**
     * Devuelve la cantidad de peticiones enviadas por un usuario
     * @param id
     * @return
     */
    @Query("select count(s) from SigningRequest s where s.sender.id = ?1")
    long countSigningRequestSentBySender(Long id);

    /**
     * Devuelve una petición consultando por la id de la petición
     * @param id
     * @return
     */
    @Query("select s from SigningRequest s where s.id = ?1")
    Optional<SigningRequest> findSigningRequestById(Long id);



    // POSSIBLY DEPRECATED
    Optional<SigningRequest> findById(Long id);

    Set<SigningRequest> findSigningRequestsByDocumentsNull();

    Long countDistinctByAddressee_IdAndStatus(Long id, SigningRequest.status status);

    Long countSigningRequestsBySender_Id(Long id);

}