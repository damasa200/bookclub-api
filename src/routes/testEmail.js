/*import express from 'express';
import Mail from '../libs/Mail.js'; // ajuste o caminho conforme seu projeto

const router = express.Router();

router.get('/test-email', async (req, res) => {
  try {
    const result = await Mail.sendEmail(
      'danilomartins75@gmail.com', // coloque um email seu para teste
      { name: 'Damaso', token: '123456' }
    );

    res.json({
      success: true,
      message: 'E-mail de teste enviado com sucesso',
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar e-mail de teste',
      error: error.message
    });
  }
});

export default router;*/
