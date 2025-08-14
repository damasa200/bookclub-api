import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

class Mail {
  async sendEmail(email, data,) {
    try {
      const data = await resend.emails.send({
      from: 'noreply@send.booclub.damaso.com.br',
      to: 'contato@damaso.com.br',
      subject: 'Teste de envio',
      html: '<p>Este é um teste de envio usando Resend.</p>',
    });

      return result;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      return { error };
    }
  }
}

export default new Mail();