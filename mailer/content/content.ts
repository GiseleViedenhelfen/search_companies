
import { mailStyle } from "./style";
export default function content(corporate_name: string, cnpj: string) {
  return (
    `<html>
    <head>${mailStyle}</head>
    <body>
    <section>
    <span>Prezado ${corporate_name},</span>
    <span>Confirmado o seu novo CNPJ ${cnpj}.</span>
    <div class="field">
    <span>Parabéns e que sua nova empresa venha com muito sucesso e negócios!</span>
    <span> Aproveito para lhe contatar pois sua contabilidade deve
    ter informado que agora você precisa fazer o certificado digital da sua empresa.</span>
    <span>Sou um grande emissor de certificados do país, credenciado pelo Serasa Experian.</span>
    <span>Para novos CNPJ's como o seu, possuímos valor promocional.</span>
    </div>
    <div class="field">
      <span>Fale conosco através de nosso whatsapp (51) 99998-1491 e
      agende o seu certificado com segurança, garantindo 20% de desconto.</span>
      <span>Caso prefira nos ligar (51) 3364-2225 nossa equipe estará
      pronta para lhe atender e emitir seu certificado ainda hoje. </span>  
      <span>Att.,</span>
      <span>agente de registro Lucas Alberto.</span>
    </div>
    </section>
    <img src="cid:unique@image" alt="LCR Assessoria"/>
    </body>
    </html>`
  );
}
