package com.openfirma.springhateoas.security;

import com.openfirma.springhateoas.security.jwt.JwtAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.mapping.HttpMethods;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final AuthenticationEntryPoint jwtAuthenticationEntryPoint; // It's invoked when someone fails at login
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final PasswordEncoder passwordEncoder;

    /**
     * This method exposes our authentication mechanism, so we can use it in a filter
     * @return
     * @throws Exception
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    /**
     * Access control
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .cors()
                .and()
                .csrf()
                    .disable()
                .exceptionHandling()
                    .authenticationEntryPoint(null) // Exceptions control
                .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // We establish SessionCreationPolicy as stateless
                .and()
                .authorizeRequests()
                .anyRequest().permitAll()
//                .antMatchers(HttpMethod.GET,"/*/**").permitAll()
//                .antMatchers(HttpMethod.GET,"/login").permitAll()
//                .antMatchers(HttpMethod.POST, "/auth/login").permitAll()
//                .antMatchers(HttpMethod.GET,"/firmas/**").hasRole("USER")
//                .antMatchers(HttpMethod.GET,"/admin/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.POST, "/signingRequest/new").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/signedDocuments/new").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/tmpDir/**").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/users/create").hasRole("ADMIN")
//                .antMatchers(HttpMethod.PATCH, "/users/update").hasRole("USER")
                  ;

        http.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class); // Our filter will take the token

        }

    }
