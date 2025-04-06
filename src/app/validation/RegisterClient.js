import { z } from 'zod';

export const clienteSchema = z.object({
  responsavel: z.array(z.string())
    .min(1, { message: 'Selecione pelo menos um responsável' }),
  
  cnpj: z.string()
    .min(18, { message: 'CNPJ inválido' })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: 'Formato de CNPJ inválido' }),
  
  regimeTributario: z.string().optional(),
  
  nomeFantasia: z.string()
    .min(1, { message: 'Nome Fantasia é obrigatório' }),
  
  razaoSocial: z.string()
    .min(1, { message: 'Razão Social é obrigatória' }),
  
  cidade: z.string().optional(),
  uf: z.string().optional(),
  endereco: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  
  cep: z.string()
    .optional()
    .refine(val => !val || /^\d{5}-\d{3}$/.test(val), {
      message: 'CEP deve estar no formato 00000-000'
    }),
  
  bairro: z.string().optional(),
  nire: z.string().optional(),
  
  fones: z.string()
    .optional()
    .refine(val => !val || /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val), {
      message: 'Telefone deve estar no formato (00) 00000-0000'
    }),
  
  email: z.string()
    .min(1, { message: 'Email é obrigatório' })
    .email({ message: 'Email inválido' }),
  
  inscricaoMunicipal: z.string().optional(),
  inscricaoEstadual: z.string().optional(),
  dataInscricaoEstadual: z.string().optional(),
  comentarios: z.string().optional()
});

export default clienteSchema;