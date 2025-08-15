import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config(); // garante que o .env seja carregado

const resend = new Resend(process.env.RESEND_API_KEY);

class Mail {
  async sendEmail(email, data) {
    try {
      const result = await resend.emails.send({
        from: 'noreply@send.booclub.damaso.com.br', // domínio verificado no Resend
        to: email,
        subject: 'Recuperação de senha',
        html: `
          <h3>Olá, ${data.name}</h3>
          <p>Use o código abaixo para redefinir sua senha:</p>
          <h2>${data.token}</h2>
          <p>Esse código expira em alguns minutos.</p>
        `,
      });

      console.log('E-mail enviado com sucesso:', result);
      return result;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error; // melhor lançar o erro para tratar na rota
    }
  }
}

export default new Mail();
