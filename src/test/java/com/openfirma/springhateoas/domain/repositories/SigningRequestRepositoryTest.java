package com.openfirma.springhateoas.domain.repositories;

import com.openfirma.springhateoas.domain.entities.Document;
import com.openfirma.springhateoas.domain.entities.SigningRequest;
import com.openfirma.springhateoas.domain.entities.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDateTime;
import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class SigningRequestRepositoryTest {

    @Autowired
    private SigningRequestRepository underTest;

    @BeforeEach
    void tearDown(){
        underTest.deleteAll();
    }

    @Test
    @DisplayName("Recuperar peticiones filtradas " +
            "por estado y destinatario y ordenadas por fecha")
    void findSigningRequestPendingByAddressees() {

        User usuario1 = new User(
                null,
                "alguisado",
                "contraseña",
                "Jose",
                "Pino",
                "Guisado",
                "Castellano",
                "Alta",
                "23.jpg",
                "49092989H",
                null,
                null
        );

        User usuario2 = new User(
                null,
                "martalopez",
                "contraseña",
                "Lucia",
                "Lopez",
                "Guisado",
                "Castellano",
                "Alta",
                "24.jpg",
                "28523166S",
                null,
                null
        );

        Set<User> destinatarios = new HashSet<>();

        destinatarios.add(usuario1);
        destinatarios.add(usuario2);

        Document d1 = new Document(null, "Nombre del documento", 1000L, "application/pdf", "localhost.com");

        Set<Document> documents = new HashSet<>();

        documents.add(d1);

        SigningRequest signingRequest = new SigningRequest(
                null,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                usuario1,
                destinatarios,
                SigningRequest.status.PENDING,
                documents
        );

        underTest.save(signingRequest);

        List<SigningRequest> retrievedSigningRequest =
                underTest.findSigningRequestPendingByAddressees(usuario1.getId(), SigningRequest.status.PENDING);

        // Verificamos que el número de resultados es el esperado
        assertThat(retrievedSigningRequest.size()).isEqualTo(1);

        // Verificamos que el orden devuelto es el correcto
        assertThat(retrievedSigningRequest.iterator().next().getId()).isEqualTo(signingRequest.getId());

        underTest.deleteAll();

    }

    @Test
    @DisplayName("Recuperar número de peticiones pendientes " +
            "por usuario.")
    void countSigningRequestPendingByAddresses(){

        User u1 = new User(
                null,
                "jpguisado5555",
                "contraseña",
                "Jose",
                "Pino",
                "Guisado",
                "Castellano",
                "Alta",
                "23.jpg",
                "49092989H",
                null,
                null
        );

        User u2 = new User(
                null,
                "llopez55555",
                "contraseña",
                "Lucia",
                "Lopez",
                "Guisado",
                "Castellano",
                "Alta",
                "24.jpg",
                "28523166S",
                null,
                null
        );

        User u3 = new User(
                null,
                "mmguisado55555",
                "contraseña",
                "Lucia",
                "Lopez",
                "Guisado",
                "Castellano",
                "Alta",
                "24.jpg",
                "28523166S",
                null,
                null
        );

        Set<User> destinatarios1 = new HashSet<>();
        Set<User> destinatarios2 = new HashSet<>();
        Set<User> destinatarios3 = new HashSet<>();

        destinatarios1.add(u1);
        destinatarios1.add(u2);
        destinatarios1.add(u3);
        destinatarios2.add(u1);
        destinatarios2.add(u2);
        destinatarios3.add(u1);
        destinatarios3.add(u3);

        Document d1 = new Document(null, "Nombre del documento", 1000L, "application/pdf", "localhost.com");

        Set<Document> documents = new HashSet<>();

        documents.add(d1);

        SigningRequest signingRequest1 = new SigningRequest(
                null,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u1,
                destinatarios1,
                SigningRequest.status.PENDING,
                documents
        );

        SigningRequest signingRequest2 = new SigningRequest(
                null,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u1,
                destinatarios2,
                SigningRequest.status.PENDING,
                documents
        );

        SigningRequest signingRequest3 = new SigningRequest(
                null,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u1,
                destinatarios3,
                SigningRequest.status.PENDING,
                documents
        );

        underTest.save(signingRequest1);
        underTest.save(signingRequest2);
        underTest.save(signingRequest3);

        long count1 = underTest.countSigningRequestPendingByAddresses(1L);
        long count2 = underTest.countSigningRequestPendingByAddresses(2L);
        long count3 = underTest.countSigningRequestPendingByAddresses(3L);

        assertThat(count1).isEqualTo(3);
        assertThat(count2).isEqualTo(2);
        assertThat(count3).isEqualTo(2);

    }

    @Test
    @DisplayName("Recuperar número de peticiones enviadas " +
            "por usuario")
    void countSigningRequestSentBySender(){
        User u1 = new User(
                1L,
                "jpguisado3",
                "contraseña",
                "Jose",
                "Pino",
                "Guisado",
                "Castellano",
                "Alta",
                "23.jpg",
                "49092989H",
                null,
                null
        );

        User u2 = new User(
                2L,
                "llopez3",
                "contraseña",
                "Lucia",
                "Lopez",
                "Guisado",
                "Castellano",
                "Alta",
                "24.jpg",
                "28523166S",
                null,
                null
        );

        User u3 = new User(
                3L,
                "mmguisado3",
                "contraseña",
                "Lucia",
                "Lopez",
                "Guisado",
                "Castellano",
                "Alta",
                "24.jpg",
                "28523166S",
                null,
                null
        );

        Set<User> destinatarios1 = new HashSet<>();
        Set<User> destinatarios2 = new HashSet<>();
        Set<User> destinatarios3 = new HashSet<>();

        destinatarios1.add(u1);
        destinatarios1.add(u2);
        destinatarios1.add(u3);
        destinatarios2.add(u1);
        destinatarios2.add(u2);
        destinatarios3.add(u1);
        destinatarios3.add(u3);

        Document d1 = new Document(1L, "Nombre del documento", 1000L, "application/pdf", "localhost.com");

        Set<Document> documents = new HashSet<>();

        documents.add(d1);

        SigningRequest signingRequest1 = new SigningRequest(
                1L,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u1,
                destinatarios1,
                SigningRequest.status.PENDING,
                documents
        );

        SigningRequest signingRequest2 = new SigningRequest(
                2L,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u2,
                destinatarios2,
                SigningRequest.status.PENDING,
                documents
        );

        SigningRequest signingRequest3 = new SigningRequest(
                3L,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u3,
                destinatarios3,
                SigningRequest.status.PENDING,
                documents
        );

        underTest.save(signingRequest1);
        underTest.save(signingRequest2);
        underTest.save(signingRequest3);

        long count1 = underTest.countSigningRequestSentBySender(u1.getId());

        assertThat(count1).isEqualTo(1);

    }

    @Test
    @DisplayName("Recuperar peticiones enviadas por un usuario.")
    void findSigningRequestBySender() {
        User u1 = new User(
                null,
                "jpguisado4",
                "contraseña",
                "Jose",
                "Pino",
                "Guisado",
                "Castellano",
                "Alta",
                "23.jpg",
                "49092989H",
                null,
                null
        );

        User u2 = new User(
                null,
                "llopez4",
                "contraseña",
                "Lucia",
                "Lopez",
                "Guisado",
                "Castellano",
                "Alta",
                "24.jpg",
                "28523166S",
                null,
                null
        );

        User u3 = new User(
                null,
                "mmguisado4",
                "contraseña",
                "Lucia",
                "Lopez",
                "Guisado",
                "Castellano",
                "Alta",
                "24.jpg",
                "28523166S",
                null,
                null
        );

        Set<User> destinatarios1 = new HashSet<>();
        Set<User> destinatarios2 = new HashSet<>();
        Set<User> destinatarios3 = new HashSet<>();

        destinatarios1.add(u1);
        destinatarios1.add(u2);
        destinatarios1.add(u3);
        destinatarios2.add(u1);
        destinatarios2.add(u2);
        destinatarios3.add(u1);
        destinatarios3.add(u3);

        Document d1 = new Document(null, "Nombre del documento", 1000L, "application/pdf", "localhost.com");

        Set<Document> documents = new HashSet<>();

        documents.add(d1);

        SigningRequest signingRequest1 = new SigningRequest(
                null,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u1,
                destinatarios1,
                SigningRequest.status.PENDING,
                documents
        );

        SigningRequest signingRequest2 = new SigningRequest(
                null,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u1,
                destinatarios2,
                SigningRequest.status.PENDING,
                documents
        );

        SigningRequest signingRequest3 = new SigningRequest(
                null,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u1,
                destinatarios3,
                SigningRequest.status.PENDING,
                documents
        );

        underTest.save(signingRequest1);
        underTest.save(signingRequest2);
        underTest.save(signingRequest3);

        Set<SigningRequest> signingRequests = underTest.findSigningRequestBySender(u1);

        assertThat(signingRequests.size()).isEqualTo(3);

    }


    @Test
    @DisplayName("Recuperar petición por id")
    void findSigningRequestById(){

        User u1 = new User(
                null,
                "jpguisado5",
                "contraseña",
                "Jose",
                "Pino",
                "Guisado",
                "Castellano",
                "Alta",
                "23.jpg",
                "49092989H",
                null,
                null
        );

        Set<User> destinatarios1 = new HashSet<>();

        destinatarios1.add(u1);

        Document d1 = new Document(null, "Nombre del documento", 1000L, "application/pdf", "localhost.com");

        Set<Document> documents = new HashSet<>();

        documents.add(d1);

        SigningRequest signingRequest1 = new SigningRequest(
                null,
                LocalDateTime.now(),
                "Petición de firma bajo condiciones de test",
                u1,
                destinatarios1,
                SigningRequest.status.PENDING,
                documents
        );

        underTest.save(signingRequest1);

        Optional<SigningRequest> s1 = underTest.findSigningRequestById(1L);

        assertThat(s1.get().getMessage()).isEqualTo("Petición de firma bajo condiciones de test");

    }

}