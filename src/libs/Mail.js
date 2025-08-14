import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

class Mail {
  async sendEmail(email, data) {
    console.log("🔹 Iniciando envio de e-mail...");
    console.log("RESEND_API_KEY existe?", !!process.env.RESEND_API_KEY);
    console.log("E-mail destino:", email);
    console.log("Token:", data.token);

    try {
      const result = await resend.emails.send({
        from: 'noreply@send.booclub.damaso.com.br',
        to: email,
        subject: 'Recuperação de senha',
        html: `
          <h3>Olá, ${data.name || 'usuário'}</h3>
          <p>Use o código abaixo para redefinir sua senha:</p>
          <h2>${data.token}</h2>
          <p>Esse código expira em alguns minutos.</p>
        `,
      });

      console.log("✅ E-mail enviado com sucesso:", result);
      return result;
    } catch (error) {
      console.error("❌ Erro ao enviar e-mail:", error);
      return { error };
    }
  }
}

export default new Mail();
