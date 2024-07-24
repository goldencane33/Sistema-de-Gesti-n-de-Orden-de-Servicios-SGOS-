package com.edu.pe.service.impl;

import com.edu.pe.models.Trabajador;
import com.edu.pe.repository.ITrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private ITrabajadorRepository trabajadorRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Trabajador user = trabajadorRepository.BuscarPorCorreo(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("Usuario no encontrado", username));
        }

        List<GrantedAuthority> roles = new ArrayList<>();

        roles.add(new SimpleGrantedAuthority(user.getCargo().getNombre()));

        UserDetails ud = new org.springframework.security.core.userdetails.User(user.getCorreo(),
                user.getPassword(), user.getEstado() == 1, true, true, true, roles);

        return ud;
    }
}
