export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { name, email, message } = req.body || {};

        if (!name || !email || !message) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_KEY;
        if (!apiKey) {
            res.status(500).json({ error: 'RESEND_API_KEY (or EMAIL_KEY) not configured' });
            return;
        }

        const subject = 'Nova mensagem de contato no Portfólio';
        const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin: 0 0 12px; color: #1f2937;">Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <div style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">${message}</div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 12px; color: #475569;">Enviado automaticamente pelo formulário de contato do portfólio.</p>
      </div>
    `;

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev',
                to: 'yuriallmeida@mail.com', // Este e-mail DEVE ser o mesmo da sua conta Resend
                subject,
                html,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            res.status(response.status).json({ error: data.error || 'Failed to send email', details: data });
            return;
        }

        res.status(200).json({ success: true, id: data.id });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
