const HTML = {
  HEAD: `
  <head>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
    crossorigin="anonymous"
  />
  </head>
  `,
  IMAGE: (src, alt, width, height) => `
  <div
  style="
    display: flex;
    justify-content: space-between;
  "
  >
    <img
      src=${src}
      alt=${alt}
      style="margin: auto"
      width=${width}
      height=${height}
      border="0"
    />
</div>
  `,
  BUTTON: (url, callToAction) => `
  <a
  href="${url}"
  target="_blank"
  rel="noopener noreferrer"
  style="
    border-radius: 26.5px;
    background-color: #ff6150;
    border: 1px solid #ff6150;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    padding: 12px 20px;
    text-decoration: none;
    text-align: center;
    margin: auto;
    display: block;
  "
  >
    <b>${callToAction}</b>
  </a>
  `,
  FOOTER: (message, hr) => `
  <h2 class="mt-4 mb-4">
  ${message},
  <br />
  Read and Act Support (no reply)
  </h2>
  <br />
  <h3 style="text-align: center">
    <i>
      N.b: URL will expire after ${hr} hours
      <br />
      If this is not you, please ignore this email
   </i>
  </h3>
  `,
};

const verificationEmailEnSubject = `Email Address Confirmation on "Read and Act" Back-End`;
const verificationEmailArSubject = `تأكيد البريد الإلكتروني على موقع إدارة Read and Act`;
const passwordResetEmailEnSubject = `Reset your Password on "Read and Act" Back-End`;
const passwordResetEmailArSubject = `إعادة تعيين كلمة المرور على موقع إدارة Read and Act`;

const setEnVerificationEmail = (name, email, url) => `
<html>
  ${HTML.HEAD}
  <body class="ms-2 me-2 mt-2 mb-2">
    <h2>Hi ${name},</h2>
    <h2>
      Thank you for volunteering for the "Read and Act" project.
      <br />
      This email sent to ${email} to verify your account on the back-end
      website.
      <br />
      Please click on the dark red-orange button below to confirm your email address.
    </h2>
    ${HTML.IMAGE(
      "https://i.ibb.co/BZqKQgX/undraw-Confirm-re-69me.png",
      "Account Verification",
      320,
      216
    )}
    ${HTML.BUTTON(url, "Confirm your Email")}
    ${HTML.FOOTER("Thanks", 48)}
  </body>
</html>
`;

const setArVerificationEmail = (name, email, url) => `
<html>
  ${HTML.HEAD}
  <body class="ms-2 me-2 mt-2 mb-2">
    <h2>مرحبًا ${name}</h2>
    <h2>
      ."Read and Act" شكرًا لك( ِ) على التطوع في مشروع
      <br />
      للتأكد من حسابك( ِ) على موقع الإدارة، تم إرسال هذا البريد
      الإلكتروني إلى
      <br>
      ${email}
      <br />
      رجاءً إضغط(ي) على الزر أدناه أسفل الصورة لتأكيد بريدك( ِ) الإلكتروني
    </h2>
    ${HTML.IMAGE(
      "https://i.ibb.co/BZqKQgX/undraw-Confirm-re-69me.png",
      "Account Verification",
      320,
      216
    )}
    ${HTML.BUTTON(url, "أكِّد(ي) بريدك( ِ) الإلكتروني")}
    ${HTML.FOOTER("شكرًا", 48)}
  </body>
</html>
`;

const setEnPasswordResetEmail = (name, email, url) => `
<html>
  ${HTML.HEAD}
  <body class="ms-2 me-2 mt-2 mb-2">
    <h2>Hi ${name},</h2>
    <h2>
      Thank you for volunteering for the "Read and Act" project.
      <br />
      This email sent to ${email} to reset your password on the back-end
      website.
      <br />
      Please click on the dark red-orange button below to reset the password.
    </h2>
    ${HTML.IMAGE(
      "https://i.ibb.co/86TFJzc/undraw-Access-account-re-8spm.png",
      "Password Reset",
      320,
      294.5
    )}
    ${HTML.BUTTON(url, "Reset your Password")}
    ${HTML.FOOTER("Thanks", 24)}
  </body>
</html>
`;

const setArPasswordResetEmail = (name, email, url) => `
<html>
  ${HTML.HEAD}
  <body class="ms-2 me-2 mt-2 mb-2">
    <h2>مرحبًا ${name}</h2>
    <h2>
      ."Read and Act" شكرًا لك( ِ) على التطوع في مشروع
      <br />
      لإعادة تعيين كلمة مرور حسابك( ِ) على موقع الإدارة، تم إرسال هذا البريد
      الإلكتروني إلى
      <br>
      ${email}
      <br />
      رجاءً إضغط(ي) على الزر أدناه أسفل الصورة لإعادة تعيين كلمة المرور
    </h2>
    ${HTML.IMAGE(
      "https://i.ibb.co/86TFJzc/undraw-Access-account-re-8spm.png",
      "Password Reset",
      320,
      294.5
    )}
    ${HTML.BUTTON(url, "قم(ي) بإعادة تعيين كلمة المرور")}
    ${HTML.FOOTER("شكرًا", 24)}
  </body>
</html>
`;

module.exports.verificationEmailEnSubject = verificationEmailEnSubject;
module.exports.verificationEmailArSubject = verificationEmailArSubject;
module.exports.passwordResetEmailEnSubject = passwordResetEmailEnSubject;
module.exports.passwordResetEmailArSubject = passwordResetEmailArSubject;
module.exports.setEnVerificationEmail = setEnVerificationEmail;
module.exports.setArVerificationEmail = setArVerificationEmail;
module.exports.setEnPasswordResetEmail = setEnPasswordResetEmail;
module.exports.setArPasswordResetEmail = setArPasswordResetEmail;
