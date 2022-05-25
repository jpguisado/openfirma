package com.openfirma.springhateoas.infrastructure;

import com.openfirma.springhateoas.domain.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
@RequiredArgsConstructor
/**
 * Define el controlador que gestiona el almacenamiento de ficheros haciendo uso del repositorio
 */
public class FileController {

	// Nos permitirá establecer un logger avanzado
	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	// Servicio de almacenamiento
	private final StorageService storageService;
	
	@GetMapping(value="/tmpDir/{filename:.+}")
	@ResponseBody
	/**
	 * Recupera los ficheros almacenados en el disco
	 */
	public ResponseEntity<Resource> serveFile(@PathVariable String filename, HttpServletRequest request) {

		// Recupera el recurso (fichero para su lectura)
		Resource file = storageService.loadAsResource(filename);

		// Declaramos una variable para almacenar el tipo de contenido
		String contentType = null;

		try {
			// Intentamos obtener el tipo de contenido del fichero almacenado
            contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("No se puede establecer el tipo de fichero.");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

		// Devolvemos la response entity con mensaje OK
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.body(file);
	}

}