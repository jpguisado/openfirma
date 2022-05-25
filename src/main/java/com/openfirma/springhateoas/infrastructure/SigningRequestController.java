package com.openfirma.springhateoas.infrastructure;

import com.openfirma.springhateoas.domain.entities.Document;
import com.openfirma.springhateoas.domain.entities.SigningRequest;
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

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/signingRequests")
@RequiredArgsConstructor
public class SigningRequestController {

    private final SigningRequestService signingRequestService;
    private final StorageService storageService;

    @PostMapping(value = "/new", consumes= {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> newSigningRequest(@RequestPart("meta-data") EntityModel<SigningRequest> nuevo,
                                           @RequestPart("file-data") MultipartFile[] files) {

        // Almacenamos el fichero y obtenemos su URL
        String urlFichero = null;

        Set<Document> documentList = new HashSet<Document>();

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String fichero = storageService.store(file);
                urlFichero = MvcUriComponentsBuilder
                        // El segundo argumento es necesario solo cuando queremos obtener el fichero
                        // En este caso tan solo necesitamos obtener la URL
                        .fromMethodName(FileController.class, "serveFile", fichero, null)
                        .build().toUriString();

                Document document = new Document();
                document.setDocumentURI(urlFichero);
                document.setDocumentSize(file.getSize());
                document.setDocumentName(file.getOriginalFilename());
                document.setType(file.getContentType());
                documentList.add(document);

            }

            nuevo.getContent().setDocuments(documentList);

        }

        // Almacenamos el objeto
        signingRequestService.save(nuevo.getContent());

        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo.getContent().getId());
    }

}
