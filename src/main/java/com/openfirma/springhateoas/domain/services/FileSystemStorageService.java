package com.openfirma.springhateoas.domain.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

@Service
public class FileSystemStorageService implements StorageService {

    /**
     * Directorio raíz de nuestro almacenamiento
     * Se concretará gracias a la propiedad upload-root.location
     * de nuestro fichero "properties".
     */
    private final Path rootLocation;


    /**
     * Método constructor
     * @param path
     */
    public FileSystemStorageService(@Value("${upload.root-location}") String path) {
        this.rootLocation = Paths.get(path);
    }

    /**
     * Método que almacena un fichero en el almacenamiento secundario
     * desde un objeto de tipo MultipartFile
     *
     */
    @Override
    public String store(MultipartFile file) {

        /**
         * Nombre del fichero original
         */
        String filename = StringUtils.cleanPath(file.getOriginalFilename());

        /**
         * Extensión del fichero
         */
        String extension = StringUtils.getFilenameExtension(filename);

        /**
         * Nombre del fichero acortado
         */
        String justFilename = filename.replace("."+extension, "");

        /**
         * Nombre del fichero almacenado
         * Indicamos la hora del sistema en milisegundos para evitar duplicidades de ficheros
         *
         */
        String storedFilename = System.currentTimeMillis() + "_" + justFilename + "." + extension;

        try {

            // Chequeamos si el fichero a almacenar está vacío
            if (file.isEmpty()) {
                throw new StorageException("El fichero que intentas almacenar está vacío: " + filename);
            }

            // Chequeamos si el nombre contiene caracteres que tratan de manejar la ruta de almacenamiento
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "No se puede almacenar un fichero con una ruta relativa fuera del directorio actual."
                                + filename);
            }

            // Comparamos inputStream y file.getInputStream
            try (InputStream inputStream = file.getInputStream()) {

                // Copiamos inputStream al directorio donde almacenaremos indicando que, si existe, reemplace el fichero
                Files.copy(inputStream, this.rootLocation.resolve(storedFilename), StandardCopyOption.REPLACE_EXISTING);

                // Retornamos el nombre del fichero almacenado
                return storedFilename;
            }
        }
        catch (IOException e) {
            // Lanzamos la excepción
            throw new StorageException("Error al almacenar el fichero " + filename, e);
        }

    }

    /**
     * Método que devuelve la ruta de todos los ficheros que hay
     * en el almacenamiento secundario del proyecto.
     */
    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        }
        catch (IOException e) {
            throw new StorageException("Error al leer los ficheros almacenados", e);
        }

    }

    /**
     * Método que es capaz de cargar un fichero a partir de su nombre
     * Devuelve un objeto de tipo Path
     */
    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }


    /**
     * Método que es capaz de cargar un fichero a partir de su nombre
     * Devuelve un objeto de tipo Resource
     */
    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "No se ha encontrado el fichero: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("No se puede leer el fichero. URL incorrecta " + filename, e);
        }
    }


    /**
     * Método que elimina todos los ficheros del almacenamiento en disco.
     */
    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }


    /**
     * Método que inicializa el almacenamiento en disco del proyecto
     */
    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new StorageException("No se puede inicializar el almacenamiento en disco", e);
        }
    }


    /**
     * Método que elimina un fichero por su nombre
     * @param filename
     */
    @Override
    public void delete(String filename) {
        String justFilename = StringUtils.getFilename(filename);
        try {
            Path file = load(justFilename);
            Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new StorageException("Error al eliminar un fichero", e);
        }

    }
}
