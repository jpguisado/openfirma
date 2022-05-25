package com.openfirma.springhateoas.security.jwt;


import com.openfirma.springhateoas.domain.entities.User;
import com.openfirma.springhateoas.domain.entities.UserRoles;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Collectors;

@Log
@Component
public class JwtTokenProvider {

    public static final String TOKEN_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String TOKEN_TYPE = "JWT";

    @Value("${jwt.secret:Ley39/2015,de1deoctubre,delProcedimientoAdministrativoComúndelasAdministracionesPúblicas.}")
    private String jwtSecret;

    @Value("${jwt.token-expiration:86400}")
    private int jwtDurationTokenEnSecs;

    public String generateToken(Authentication authentication) {

        /**
         *  Al implementar nuestra clase entidad UserDetails
         *  al usarlo en la autenticación, lo que se guarda
         *  en la autenticación es nuestro User.
         */
        User user = (User) authentication.getPrincipal();

        Date tokenExpirationDate = new Date(System.currentTimeMillis() + (jwtDurationTokenEnSecs * 1000));

        /**
         * Builds token and compacts it
         */
        return Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS512)
                .setHeaderParam("typ", TOKEN_TYPE)
                .setSubject(Long.toString(user.getId())) // Later we use this to obtain the id
                .setIssuedAt(new Date())
                .setExpiration(tokenExpirationDate)
                .claim("roles", user.getRoles().stream()
                        .map(UserRoles::name)
                        .collect(Collectors.joining(", "))
                )
                .compact();

    }

    /**
     * Obtains user id from JWT
     *
     * @param token
     * @return
     */
    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());

    }

    /**
     * Validates the token
     *
     * @param authToken
     * @return
     */
    public boolean validateToken(String authToken) {

        try {
            Jwts.parserBuilder().setSigningKey(jwtSecret.getBytes()).build().parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            log.info("Error en la firma del token JWT: " + ex.getMessage());
        } catch (MalformedJwtException ex) {
            log.info("Token malformado: " + ex.getMessage());
        } catch (ExpiredJwtException ex) {
            log.info("El token ha expirado: " + ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            log.info("Token JWT no soportado: " + ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.info("JWT claims vacío");
        }
        return false;

    }


}