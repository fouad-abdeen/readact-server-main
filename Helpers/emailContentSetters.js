const verificationEmailEnSubject = `Email Address Confirmation on "Read and Act" Back-End`;
const verificationEmailArSubject = `تأكيد البريد الإلكتروني على موقع إدارة Read and Act`;

const setEnVerificationEmail = (name, email, url) => `
<html>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
      crossorigin="anonymous"
    />
  </head>
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
    <div
      style="
        display: flex;
        justify-content: space-between;
      "
    >
      <img
        src="https://i.ibb.co/BZqKQgX/undraw-Confirm-re-69me.png"
        alt="Account Verification"
        style="margin: auto"
        width="320"
        height="216"
        border="0"
      />
      </div>
      <a
        href="${url}"
        target="_blank"
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
        <b>Confirm your Email </b>
      </a>
    <h2 class="mt-4 mb-4">
      Thanks,
      <br />
      Read and Act Support (no reply)
    </h2>
    <br />
    <h3 style="text-align: center">
      <i>
        N.b: URL will expire after 48 hours.
        <br />
        If this is not you, please ignore this email.
      </i>
    </h3>
  </body>
</html>
`;

const setArVerificationEmail = (name, email, url) => `
<html>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
      crossorigin="anonymous"
    />
  </head>
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
    <div
      style="
        display: flex;
        justify-content: space-between;
      "
    >
      <img
        src="https://i.ibb.co/BZqKQgX/undraw-Confirm-re-69me.png"
        alt="Account Verification"
        style="margin: auto"
        width="320"
        height="216"
        border="0"
      />
    </div>
      <a
        href="${url}"
        target="_blank"
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
        <b> أكِّد(ي) بريدك( ِ) الإلكتروني </b>
      </a>
    <h2 class="mt-4 mb-4">
      شكرًا,
      <br />
      Read and Act Support (no reply)
    </h2>
    <br />
    <h3 style="text-align: center">
      <i>
        N.b: URL will expire after 48 hours
        <br />
        If this is not you, please ignore this email
      </i>
    </h3>
  </body>
</html>
`;

module.exports.verificationEmailEnSubject = verificationEmailEnSubject;
module.exports.verificationEmailArSubject = verificationEmailArSubject;
module.exports.setEnVerificationEmail = setEnVerificationEmail;
module.exports.setArVerificationEmail = setArVerificationEmail;
