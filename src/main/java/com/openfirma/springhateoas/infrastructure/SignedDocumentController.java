package com.openfirma.springhateoas.infrastructure;

import com.openfirma.springhateoas.domain.entities.Document;
import com.openfirma.springhateoas.domain.entities.SignedDocument;
import com.openfirma.springhateoas.domain.entities.SigningRequest;
import com.openfirma.springhateoas.domain.services.SignedDocumentService;
import com.openfirma.springhateoas.domain.services.SigningRequestService;
import com.openfirma.springhateoas.domain.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@RestController
@RequestMapping("/signedDocuments")
@RequiredArgsConstructor
/**
 * Controlador encargado de gestionar las peticiones de firma
 */
public class SignedDocumentController {

    // Servicio signingRequest
    private final SigningRequestService signingRequestService;

    // Servicio storageService
    private final StorageService storageService;

    // Servicio signedDocumentService
    private final SignedDocumentService signedDocumentService;

    @PostMapping(value = "/new", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    /**
     * Método que gestiona las nuevas peticiones de firma
     * Consume dos parámetros RequestPart donde se recibe un fichero JSON y el fichero en a firmar
     */
    public ResponseEntity<?> newSignedDocument(@RequestPart("meta-data") EntityModel<SignedDocument> nuevo,
                                               @RequestPart("file-data") MultipartFile file) {

        // Almacenaremos la URL en esta variable
        String urlFichero = null;

        // Por cada file in files, instancia uno
        Document document = new Document();

        if (!file.isEmpty()) {

            // Almacenamos cada fichero
            String fichero = storageService.store(file);

            // Construimos la URL
            urlFichero = MvcUriComponentsBuilder
                    // El segundo argumento es necesario solo cuando queremos obtener el fichero
                    // En este caso tan solo necesitamos obtener la URL
                    .fromMethodName(FileController.class, "serveFile", fichero, null)
                    .build().toUriString();

            // Establece la URL, tamaño, nombre y tipo
            document.setDocumentURI(urlFichero);
            document.setDocumentSize(file.getSize());
            document.setDocumentName(file.getOriginalFilename()); //TODO: Corregir el nombre del fichero
            document.setType(file.getContentType());

        }

        // Instanciamos una petición recuperando los datos por su ID
        SigningRequest signingRequest = signingRequestService.findById(nuevo.getContent().getSigningRequest().getId()).map(
                sr -> {
                    sr.setStatus(SigningRequest.status.SIGNED);
                    return signingRequestService.save(sr);
                }
        ).orElseThrow();


        nuevo.getContent().setDocument(document);

        signedDocumentService.save(nuevo.getContent());

        // Retornamos la entidad
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo.getContent().getDocument());

    }

}