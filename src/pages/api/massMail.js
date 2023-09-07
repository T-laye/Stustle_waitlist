import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No form data provided" });
    }

    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465, // Use Zoho's SMTP port
      secure: true, // Use SSL
      auth: {
        user: process.env.USER_EMAIL_ZOHO, // Replace with your Zoho email address
        pass: process.env.USER_PASS_ZOHO, // Replace with your Zoho email password
      },
    });

    const emailContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stustle</title>
  </head>
  <body style="font-family: Arial; font-size: 14px">
    <div
      style="
        margin: 0 auto;
        background-color: #ffffff;
        max-width: 400px;
        width: 100%;
      "
    >
      <div style="padding: 20px 0px 0px">
        <div style="width: 76px; padding: 0 20px">
          <img
            src="https://res.cloudinary.com/dlbvrotqu/image/upload/v1694100834/LOGO_gh4fux.png"
            alt="Stustle"
            style="width: 100%"
          />
        </div>
        <div
          style="
            width: 100%;
            overflow: hidden;
            height: 200px;
            margin-top: 20px;
            background-image: url('https://res.cloudinary.com/dlbvrotqu/image/upload/v1694100768/product112_pyin1w.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          "
        >
        </div>
        <div
          style="width: 80%; margin-top: 20px; font-size: 20px; padding: 0 20px"
        >
          <p>${subject}</p>
        </div>
        <div style="width: 80%; padding: 0 20px; margin-top: 30px">
          <p>
          ${message}
          </p>
        </div>
        <div style="width: 80%; text-align: center; margin: 30px auto 0">
          <a
            style="
              padding: 10px 5px;
              background-color: #e29507;
              color: white;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
              display: inline-block;
              border: none;
              cursor: pointer;
              width: 40%;
            "
            href="https://www.stustle.com/"
            >Sign Up Now</a
          >
        </div>
        <div style="width: 50%; padding: 0 20px; margin-top: 30px">
          <p>
            Best regards,
            <br />
            Stustle.
          </p>
        </div>
      </div>
      <div
        style="
          max-width: 400px;
          background-color: #f0f0f0;
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          padding: 5px;
        "
      >
        <p style="color: #096dd9; font-size: 10px">
          For more information, contact our
          <a
            href="tel:+2348115237006"
            style="color: #eb4335; text-decoration: underline"
            >customer service</a
          >
        </p>
        <div>
          <a
            style="display: inline-block; height: 20px; margin-right: 10px"
            href="https://instagram.com/stustle_official?igshid=NTc4MTIwNjQ2YQ=="
          >
            <img
              style="height: 100%"
              src="https://res.cloudinary.com/dlbvrotqu/image/upload/v1694100881/skill-icons_instagram_vbglan.png"
              alt="insta"
            />
          </a>
          <a
            style="display: inline-block; height: 20px; margin-right: 10px"
            href="https://www.facebook.com/profile.php?id=100090583722573&mibextid=9R9pXO"
          >
            <img
              style="height: 100%"
              src="https://i.postimg.cc/qMHzR7HT/devicon-facebook.png"
              alt="insta"
            />
          </a>
          <a
            style="display: inline-block; height: 20px"
            href="https://twitter.com/stustle?t=07Nuur6s-COLGQX_JIeGlQ&s=09"
          >
            <img
              style="height: 100%"
              src="https://i.postimg.cc/X7KXy0ny/devicon-twitter.png"
              alt="insta"
            />
          </a>
          <a
            style="display: inline-block; height: 20px"
            href="https://www.linkedin.com/company/stustle/"
          >
            <img
              style="height: 100%"
              src="https://i.postimg.cc/hGDwtccf/basil-linkedin-solid.pngg"
              alt="linkedIn"
            />
          </a>
        </div>
        <div>
          <p style="color: #2f2f2f; font-size: 10px">&copy; 2023 Stustle</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;

    const mailOptions = {
      from: process.env.USER_EMAIL_ZOHO, // Replace with your email address
      to: email,
      subject: subject,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    // Return a success response
    return res.status(200).json({ message: "Mail Sent Successfully" });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
}
