import { getDate } from "./helpers";
export const filePath = "../../data.json";
export const page_url = "https://casadosdados.com.br"
export const root = page_url + "/solucao/cnpj/pesquisa-avancada"
export const inputs = {
  uf: {
    tag: 'input.input.is-is-normal[placeholder="Selecione o estado"]',
    value: 'Rio Grande do Sul'
  },
  city: {
    tag: 'input.input.is-normal[placeholder="Selecione um município"]',
    value: 'Porto Alegre'
  }
}
export const date = {
  tag: 'input.input[placeholder="A partir de"]',
  value: getDate()
}
export const noResultsTag = ".has-text-weight-bold"
export const keys = ['CNPJ', 'Razão Social', 'Natureza Jurídica', 'Capital Social', 'E-MAIL', 'Telefone', 'Atividade Principal'];
export const mei = 'span.check.is-default'
export const email = 'span.check.is-warning';
export const successButton = 'a.button.is-success.is-medium';
export const lenButton = 'ul.pagination-list li:last-child';
