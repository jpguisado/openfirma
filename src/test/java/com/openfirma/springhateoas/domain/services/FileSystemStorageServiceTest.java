package com.openfirma.springhateoas.domain.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestComponent;
import org.springframework.core.io.Resource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest
class FileSystemStorageServiceTest {

    private final String FILE_NAME = "src/test/resources/pruebas.txt";

    @Autowired
    private FileSystemStorageService underTest;

    @AfterEach
    @BeforeEach
    void cleanUpFiles() {
        File targetFile = new File(FILE_NAME);
    }

    @Test
    @DisplayName("Almacenar ficheros en disco")
    void canStoreInFileSystem() throws IOException {

        Path newFilePath = Paths.get(FILE_NAME);
        String name = "pruebas.txt";
        String originalFileName = "pruebas.txt";
        String contentType = "text/plain";

        byte[] content = null;

        try {
            content = Files.readAllBytes(newFilePath);
        } catch (final IOException e) {

        }

        MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);

        String returnedOriginalFileName = underTest.store(result);

        assertThat(returnedOriginalFileName).contains("pruebas.txt");

    }

    @Test
    @DisplayName("Lanza excepción si el fichero es vacío.")
    void throwsExceptionOnEmptyFile(){

        Path newFilePath = Paths.get(FILE_NAME);
        String name = "throwsExceptionOnEmptyFile.txt";
        String originalFileName = "throwsExceptionOnEmptyFile.txt";
        String contentType = "text/plain";

        byte[] content = null;

        MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);

        Exception ex = assertThrows(StorageException.class, () -> {
            underTest.store(result);
        });

        String expectedMessage = "El fichero que intentas almacenar está vacío: ";
        String actualMessage = ex.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));

    }

    @Test
    @DisplayName("Carga todos los ficheros")
    void loadAll() {

        Stream<Path> results = underTest.loadAll();

        assertTrue(results.count() > 0);

    }

    @Test
    @DisplayName("Carga un único fichero por su nombre")
    void load() {

        Path newFilePath = Paths.get(FILE_NAME);
        String name = "pruebas.txt";
        String originalFileName = "pruebas.txt";
        String contentType = "text/plain";

        byte[] content = null;

        try {
            content = Files.readAllBytes(newFilePath);
        } catch (final IOException e) {

        }

        MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);

        String returnedOriginalFileName = underTest.store(result);

        Path file = underTest.load(returnedOriginalFileName);
        String fileName = file.toString();
        assertThat(fileName.contains("_pruebas"));

    }

    @Test
    void loadAsResource() {

        Path newFilePath = Paths.get(FILE_NAME);
        String name = "pruebas.txt";
        String originalFileName = "pruebas.txt";
        String contentType = "text/plain";

        byte[] content = null;

        try {
            content = Files.readAllBytes(newFilePath);
        } catch (final IOException e) {

        }

        MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);

        String returnedOriginalFileName = underTest.store(result);

        Path file = underTest.load(returnedOriginalFileName).getFileName();

        String fileName = file.toString();

        Resource resource = underTest.loadAsResource(fileName);

        assertThat(resource);
    }

    @Test
    @DisplayName("Borrar todos los ficheros del almacenamiento")
    void deleteAll() {

        Path newFilePath = Paths.get(FILE_NAME);
        String name = "pruebas.txt";
        String originalFileName = "pruebas.txt";
        String contentType = "text/plain";

        byte[] content = null;

        try {
            content = Files.readAllBytes(newFilePath);
        } catch (final IOException e) {

        }

        MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);

        underTest.store(result);

        underTest.deleteAll();

        assertThrows(StorageException.class, () -> {
            underTest.loadAll();
        });

        underTest.init();

    }

    @Test
    @DisplayName("Inicializa el almacenamiento en disco.")
    void init() {
        underTest.init();
    }

    @Test
    @DisplayName("Eliminar un fichero")
    void delete() {

        Path newFilePath = Paths.get(FILE_NAME);
        String name = "pruebas.txt";
        String originalFileName = "pruebas.txt";
        String contentType = "text/plain";

        byte[] content = null;

        try {
            content = Files.readAllBytes(newFilePath);
        } catch (final IOException e) {

        }

        MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);

        String returnedOriginalFileName = underTest.store(result);

        Path file = underTest.load(returnedOriginalFileName).getFileName();

        String fileName = file.toString();

        underTest.delete(fileName);

        assertThrows(StorageFileNotFoundException.class, () -> {
            underTest.loadAsResource(fileName);
        });


    }
}