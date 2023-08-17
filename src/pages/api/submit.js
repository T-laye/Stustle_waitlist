import { google } from "googleapis"; // Import google from googleapis library

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const formDetails = req.body;

  try {
    const authentication = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      version: "v4",
      auth: authentication, // Use 'auth' instead of 'authentication'
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:C1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[formDetails.name, formDetails.email, formDetails.phone]],
      },
    });

    res.status(200).json({
      status: true,
      data: response.data, // Use response.data instead of just response
      message: "Successfully submitted",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
}
