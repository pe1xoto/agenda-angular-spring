package com.example.agenda.repository;

import com.example.agenda.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    boolean existsByCpfCnpj(String cpfCnpj);
}