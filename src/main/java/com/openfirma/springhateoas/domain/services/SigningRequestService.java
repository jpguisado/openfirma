package com.openfirma.springhateoas.domain.services;

import com.openfirma.springhateoas.domain.entities.SigningRequest;
import com.openfirma.springhateoas.domain.entities.User;

import java.util.Optional;

public interface SigningRequestService {

    SigningRequest save(SigningRequest signingRequest);

    Optional<SigningRequest> findById(Long id);

    long countDistinctByAddressee_IdAndStatus(Long id, SigningRequest.status status);

}
