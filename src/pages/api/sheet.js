import { google } from "googleapis";
import keys from "../../../key";

export default async function handler(req, res) {
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
      auth: authentication,
    });

    // const client = new google.auth.JWT(
    //   process.env.GOOGLE_CLIENT_EMAIL,
    //   null,
    //   process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    //   ["https://www.googleapis.com/auth/spreadsheet"]
    // );

    // await client.authorize();

    // const gsapi = google.sheets({ version: "v4", auth: client });
    const opt = {
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A2:C",
    };

    const data = await sheets.spreadsheets.values.get(opt);
    return res.status(200).json({ success: true, data: data.data.values });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, error: true, message: e.message });
  }
}
