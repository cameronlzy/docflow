export const verificationHtmlBuilder = (link) => {
  return `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Verify your DocFlow Account</title>
  </head>
  <body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
           style="background:#f9fafb;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                 style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;
                        box-shadow:0 4px 12px rgba(0,0,0,0.06);">
            <tr>
              <td style="padding:32px;text-align:center;">
                <h1 style="margin:0;font-size:24px;color:#111827;">DocFlow</h1>
                <p style="margin:16px 0;font-size:16px;color:#374151;">
                  Welcome! Please verify your account by clicking the button below.
                </p>
                <a href="${link}" target="_blank"
                   style="display:inline-block;padding:12px 20px;margin-top:12px;
                          border-radius:6px;background:#2563eb;color:#ffffff;
                          text-decoration:none;font-weight:bold;">
                  Verify Email
                </a>
                <p style="margin-top:24px;font-size:13px;color:#6b7280;line-height:1.4;">
                  If the button doesn’t work, copy and paste this link into your browser:<br/>
                  <a href="${link}" style="color:#2563eb;">${link}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}
