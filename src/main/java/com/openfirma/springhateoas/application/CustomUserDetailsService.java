package com.openfirma.springhateoas.application;

import com.openfirma.springhateoas.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Username not found"));
    }

    public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
        return userService.findById(id)
                .orElseThrow(()-> new UsernameNotFoundException("User with ID: " + id + " not found"));
    }

}
