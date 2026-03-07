
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Types ─────────────────────────────────────────────────────────────────────
interface EnquiryPayload {
  name: string;
  mobile: string;
  city: string;
  colorName: string;
  colorHex: string;
  finish: string;
  message?: string;
}

// ── Transporter setup ─────────────────────────────────────────────────────────
// Set these in your .env.local file:
//   EMAIL_HOST=smtp.gmail.com
//   EMAIL_PORT=587
//   EMAIL_USER=your@gmail.com
//   EMAIL_PASS=your_app_password
//   EMAIL_TO=admin@yourcompany.com

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: false, // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ── HTML email template ───────────────────────────────────────────────────────
function buildEmailHtml(data: EnquiryPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f0; margin: 0; padding: 24px; }
    .card { background: #ffffff; border-radius: 16px; max-width: 520px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #f59e0b, #d97706); padding: 28px 32px; }
    .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px; }
    .body { padding: 28px 32px; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0ece4; }
    .row:last-child { border-bottom: none; }
    .label { font-size: 12px; color: #9a8f82; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
    .value { font-size: 14px; color: #1c1917; font-weight: 600; text-align: right; }
    .color-chip { display: inline-block; width: 14px; height: 14px; border-radius: 4px; vertical-align: middle; margin-right: 6px; border: 1px solid rgba(0,0,0,0.1); }
    .footer { background: #fafaf8; padding: 16px 32px; text-align: center; }
    .footer p { font-size: 12px; color: #a8a29e; margin: 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🎨 New Paint Enquiry</h1>
      <p>Submitted via Wall Color Visualizer</p>
    </div>
    <div class="body">
      <div class="row">
        <span class="label">Customer Name</span>
        <span class="value">${data.name}</span>
      </div>
      <div class="row">
        <span class="label">Mobile</span>
        <span class="value">${data.mobile}</span>
      </div>
      <div class="row">
        <span class="label">City</span>
        <span class="value">${data.city}</span>
      </div>
      <div class="row">
        <span class="label">Selected Color</span>
        <span class="value">
          <span class="color-chip" style="background:${data.colorHex}"></span>
          ${data.colorName} (${data.colorHex.toUpperCase()})
        </span>
      </div>
      <div class="row">
        <span class="label">Finish</span>
        <span class="value" style="text-transform:capitalize">${data.finish}</span>
      </div>
      ${
        data.message
          ? `
      <div class="row" style="flex-direction:column;gap:6px">
        <span class="label">Message</span>
        <span style="font-size:14px;color:#44403c;line-height:1.5">${data.message}</span>
      </div>`
          : ""
      }
    </div>
    <div class="footer">
      <p>Sent automatically by KMOPL Paint Visualizer · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EnquiryPayload;

    // Basic server-side validation
    if (!body.name?.trim() || !body.mobile?.trim() || !body.city?.trim()) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(body.mobile)) {
      return NextResponse.json(
        { success: false, message: "Invalid mobile number" },
        { status: 400 }
      );
    }

    const transporter = createTransporter();

    // Send to admin
    await transporter.sendMail({
      from: `"KMOPL Visualizer" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
      subject: `🎨 New Paint Enquiry — ${body.name} (${body.city})`,
      html: buildEmailHtml(body),
      // Plain text fallback
      text: [
        `New paint enquiry from ${body.name}`,
        `Mobile: ${body.mobile}`,
        `City: ${body.city}`,
        `Color: ${body.colorName} (${body.colorHex})`,
        `Finish: ${body.finish}`,
        body.message ? `Message: ${body.message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // Optional: auto-reply to customer (requires customer email field)
    // Uncomment and extend form if you add email field
    // await transporter.sendMail({ ... });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Enquiry API Error]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Only POST is supported
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}