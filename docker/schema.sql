CREATE TABLE aluno (
  id_aluno serial,
	nome varchar(128),
  email varchar(128),
  senha varchar(256),
  semestre int,
  ativo boolean,
  PRIMARY KEY (id_aluno)
);


CREATE TABLE habilidades (
	id_habilidade serial,
  nome varchar(128),
  PRIMARY KEY (id_habilidade)
);

CREATE TABLE aluno_habilidades (
	id_aluno serial,
  id_habilidade serial,
  PRIMARY KEY(id_aluno, id_habilidade),
  CONSTRAINT fk_aluno FOREIGN KEY(id_aluno) REFERENCES aluno(id_aluno),
  CONSTRAINT fk_habilidade FOREIGN KEY(id_habilidade) REFERENCES habilidades(id_habilidade)
);


CREATE TABLE vagas (
	id_vaga serial,
  empresa varchar(128),
  cargo varchar(128),
  remuneracao varchar(128),
  contrato varchar(64),
  aberta boolean,
  PRIMARY KEY(id_vaga)
);


CREATE TABLE vagas_alunos (
	id_aluno serial,
  id_vaga serial,
  PRIMARY KEY(id_aluno, id_vaga),
  CONSTRAINT fk_aluno FOREIGN KEY(id_aluno) REFERENCES aluno(id_aluno),
  CONSTRAINT fk_vaga FOREIGN KEY(id_vaga) REFERENCES vagas(id_vaga)
);
