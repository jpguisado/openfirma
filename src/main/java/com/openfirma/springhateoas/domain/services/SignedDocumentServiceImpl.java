/**
 * Los servicios contienen lógica que no pertenece a las entidades y tampoco al repositorio
 *
 */
package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.SignedDocument;
import com.openfirma.springhateoas.domain.repositories.SignedDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
/**
 * Implementa la interfaz SignedDocumentService
 * Concreta la implementación de métodos en el servidor
 */
public class
SignedDocumentServiceImpl implements SignedDocumentService {

    /**
     * Dependencia repositorio de documentos
     */
    private final SignedDocumentRepository signedDocumentRepository;

    @Override
    /**
     * Sobreescribe el método save del repositorio
     *
     */
    public SignedDocument save(SignedDocument signedDocument) {
        return signedDocumentRepository.save(signedDocument);
    }

}
