import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

export const sendEmail = async (email, name, token) => {
  try {
    const request = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "contato@damaso.com.br",
              Name: "Equipe BookClub",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
             TemplateID: 7254961,
             TemplateLanguage: true,
             Subject: "Alteração de senha",
             Variables: {
				     token: token,
				     name: name
            },
          },
        ],
      });

    console.log("Email enviado com sucesso:", request.body);
  } catch (err) {
    console.error("Erro ao enviar email:", err);
  }
};
