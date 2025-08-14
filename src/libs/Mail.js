import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

class Mail {
  async sendEmail(email, data,) {
    try {
      const result = await resend.emails.send({
        from: 'noreply@send.booclub.damaso.com.br', // você pode trocar depois por seu domínio
         to: email,
        subject: 'Recuperação de senha',
        html: `
          <h3>Olá, ${data.name}</h3>
          <p>Use o código abaixo para redefinir sua senha:</p>
          <h2>${data.token}</h2>
          <p>Esse código expira em alguns minutos.</p>
        `,
      });

      return result;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      return { error };
    }
  }
}

export default new Mail();