export interface EnderecoClienteModel {
  id: number;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  clienteId: number;
}









// public int Id { get; set; }
// public string Cep { get; set; }
// public string Logradouro { get; set; }
// public string Complemento { get; set; }

// //Relacionamento entre as tabelas CLIENTE x ENDERECOCLIENTE
// public int ClienteId { get; set; }
