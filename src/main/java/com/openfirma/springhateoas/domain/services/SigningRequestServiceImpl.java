/**
 * Los servicios contienen lógica que no pertenece
 * a las entidades y tampoco al repositorio
 *
 */
package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.SigningRequest;
import com.openfirma.springhateoas.domain.entities.User;
import com.openfirma.springhateoas.domain.repositories.SigningRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SigningRequestServiceImpl implements SigningRequestService {

    /**
     * Dependencia repositorio de documentos
     */
    private final SigningRequestRepository signingRequestRepository;

    @Override
    /**
     * Sobreescribe el método save proporcionado por Spring
     */
    public SigningRequest save(SigningRequest signingRequest) {
        return signingRequestRepository.save(signingRequest);
    }

    @Override
    /**
     * Sobreescribe y concreta el método findById proporcionado por Spring
     */
    public Optional<SigningRequest> findById(Long id) {
        return signingRequestRepository.findById(id);
    }

    @Override
    /**
     * Recupera peticiones de firma según destinatario e id
     * @param Id del destinatario
     * @param SigningRequest.status Estado de la petición
     *
     */
    public long countDistinctByAddressee_IdAndStatus(Long id, SigningRequest.status status) {
        return signingRequestRepository.countDistinctByAddressee_IdAndStatus(id, status);
    }

}
