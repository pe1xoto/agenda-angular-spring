package com.example.agenda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String nome;

    @NotBlank(message = "CPF/CNPJ é obrigatório")
    @Column(unique = true)
    private String cpfCnpj;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    @Email(message = "E-mail deve ser válido")
    private String email;

    private String funcao;

    private String login;

    private String senha;

    private String perfil;
}