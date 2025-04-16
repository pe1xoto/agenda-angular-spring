package com.example.agenda.service;

import com.example.agenda.exception.ResourceNotFoundException;
import com.example.agenda.model.Pessoa;
import com.example.agenda.repository.PessoaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    public List<Pessoa> listarTodos() {
        return pessoaRepository.findAll();
    }

    public Pessoa buscarPorId(Long id) {
        return pessoaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada com id: " + id));
    }

    public Pessoa salvar(Pessoa pessoa) {
        if (pessoa.getId() == null && pessoaRepository.existsByCpfCnpj(pessoa.getCpfCnpj())) {
            throw new IllegalArgumentException("Já existe uma pessoa com este CPF/CNPJ");
        }
        return pessoaRepository.save(pessoa);
    }

    public void excluir(Long id) {
        if (!pessoaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pessoa não encontrada com id: " + id);
        }
        pessoaRepository.deleteById(id);
    }
}