function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ContactEmailData = {
  name: string;
  email: string;
  message: string;
};

/** Table-based layout with inline styles, since email clients don't reliably support flexbox/grid or CSS variables. */
export function renderContactEmailHtml({ name, email, message }: ContactEmailData): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Beirut",
  });

  return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e2e8f0;">
            <tr>
              <td style="background-color:#1e3a5f; padding:28px 32px;">
                <p style="margin:0; font-size:16px; font-weight:600; color:#ffffff;">Omar Chouman</p>
                <p style="margin:4px 0 0; font-size:13px; color:#93c5fd;">New message from your portfolio contact form</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:4px; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:#64748b;">
                      From
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:16px; font-weight:600; color:#0f172a;">
                      ${safeName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:2px;">
                      <a href="mailto:${safeEmail}" style="font-size:14px; color:#3b82f6; text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                  <tr>
                    <td style="padding-bottom:8px; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:#64748b;">
                      Message
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; font-size:15px; line-height:1.6; color:#0f172a;">
                      ${safeMessage}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px; border-top:1px solid #e2e8f0;">
                <p style="margin:0; font-size:12px; color:#94a3b8;">
                  Sent from the contact form at omarchouman.com &middot; ${timestamp}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
