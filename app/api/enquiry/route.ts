import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// ── Firebase Admin (server-side) ──────────────────────────────────────────────
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}
const adminDb = getFirestore();

// ── Types ─────────────────────────────────────────────────────────────────────
interface EnquiryPayload {
  name: string;
  mobile: string;
  city: string;
  roomType?: string;
  colorInterest?: string;
  colorName?: string;
  colorHex?: string;
  finish?: string;
  message?: string;
  skipFirestore?: boolean;
}

// ── Transporter setup ─────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ── HTML email template ───────────────────────────────────────────────────────
function buildEmailHtml(data: EnquiryPayload): string {
  const colorHex = data.colorHex || "#d97706";
  const colorName = data.colorInterest || data.colorName || "";
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const detailRow = (icon: string, label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #f5f0e8;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
          <td width="40" style="vertical-align:top;">
            <div style="width:32px;height:32px;border-radius:8px;background:#fef3c7;text-align:center;line-height:32px;font-size:15px;">${icon}</div>
          </td>
          <td style="vertical-align:top;padding-left:12px;">
            <div style="font-size:11px;font-weight:700;color:#a8a29e;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:2px;">${label}</div>
            <div style="font-size:15px;font-weight:600;color:#1c1917;">${value}</div>
          </td>
        </tr></table>
      </td>
    </tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f0ebe1;font-family:'Segoe UI',Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0ebe1;padding:32px 16px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">

        <!-- Logo Bar -->
        <tr><td style="padding-bottom:24px;text-align:center;">
          <span style="font-size:28px;font-weight:900;color:#1c1917;letter-spacing:-0.03em;font-family:Georgia,serif;">Krishna</span>
          <span style="font-size:12px;color:#a8a29e;display:block;margin-top:2px;letter-spacing:0.15em;text-transform:uppercase;">The Brand of India</span>
        </td></tr>

        <!-- Main Card -->
        <tr><td>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.04);">

            <!-- Header Banner -->
            <tr><td style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 50%,#b45309 100%);padding:36px 36px 32px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td>
                  <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">New Enquiry Received</div>
                  <div style="font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;font-family:Georgia,serif;">${data.name}</div>
                  <div style="font-size:14px;color:rgba(255,255,255,0.8);margin-top:6px;">${data.city} · ${timestamp}</div>
                </td>
                <td width="64" style="vertical-align:top;text-align:right;">
                  <div style="width:56px;height:56px;border-radius:16px;background:rgba(255,255,255,0.2);text-align:center;line-height:56px;font-size:28px;">🎨</div>
                </td>
              </tr></table>
            </td></tr>

            ${colorName ? `
            <!-- Color Preview Strip -->
            <tr><td style="padding:0 36px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:-20px;background:#1c1917;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.15);">
                <tr>
                  <td width="60" style="background:${colorHex};width:60px;height:60px;"></td>
                  <td style="padding:12px 20px;">
                    <div style="font-size:15px;font-weight:700;color:#ffffff;">${colorName}</div>
                    <div style="font-size:12px;color:rgba(255,255,255,0.5);font-family:monospace;margin-top:2px;">${colorHex.toUpperCase()}${data.finish ? ` · ${data.finish.charAt(0).toUpperCase() + data.finish.slice(1)}` : ""}</div>
                  </td>
                </tr>
              </table>
            </td></tr>` : ""}

            <!-- Details Section -->
            <tr><td style="padding:${colorName ? "24px" : "32px"} 36px 8px;">
              <div style="font-size:11px;font-weight:700;color:#d97706;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:4px;">Contact Details</div>
            </td></tr>
            <tr><td style="padding:0 36px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${detailRow("📱", "Mobile Number", `<a href="tel:+91${data.mobile}" style="color:#1c1917;text-decoration:none;">+91 ${data.mobile.slice(0,5)} ${data.mobile.slice(5)}</a>`)}
                ${detailRow("📍", "City", data.city)}
                ${data.roomType ? detailRow("🏠", "Room Type", data.roomType) : ""}
                ${data.finish && !colorName ? detailRow("✨", "Finish", data.finish.charAt(0).toUpperCase() + data.finish.slice(1)) : ""}
              </table>
            </td></tr>

            ${data.message ? `
            <!-- Message Section -->
            <tr><td style="padding:20px 36px 0;">
              <div style="font-size:11px;font-weight:700;color:#d97706;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:10px;">Customer Message</div>
              <div style="background:#faf7f2;border-radius:12px;padding:16px 20px;border-left:4px solid #f59e0b;">
                <div style="font-size:14px;color:#44403c;line-height:1.6;font-style:italic;">"${data.message}"</div>
              </div>
            </td></tr>` : ""}

            <!-- CTA Button -->
            <tr><td style="padding:28px 36px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td align="center">
                  <a href="tel:+91${data.mobile}" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;box-shadow:0 6px 20px rgba(217,119,6,0.35);">
                    📞&nbsp;&nbsp;Call ${data.name.split(" ")[0]} Now
                  </a>
                </td>
              </tr></table>
            </td></tr>

            <!-- Footer -->
            <tr><td style="background:#faf7f2;padding:20px 36px;border-top:1px solid #f0ece4;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="font-size:12px;color:#a8a29e;line-height:1.5;">
                  Sent automatically by<br/><span style="font-weight:700;color:#78716c;">Krishna Paint Visualizer</span>
                </td>
                <td align="right" style="font-size:11px;color:#d6d3d1;">
                  ${timestamp}
                </td>
              </tr></table>
            </td></tr>

          </table>
        </td></tr>

        <!-- Bottom Tagline -->
        <tr><td style="padding:24px 0;text-align:center;">
          <span style="font-size:11px;color:#a8a29e;letter-spacing:0.1em;">KRISHNA · THE BRAND OF INDIA</span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EnquiryPayload;

    if (!body.name?.trim() || !body.mobile?.trim() || !body.city?.trim()) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(body.mobile)) {
      return NextResponse.json({ success: false, message: "Invalid mobile number" }, { status: 400 });
    }

    // Save to Firestore (only if not already saved client-side)
    if (!body.skipFirestore) {
      await adminDb.collection("enquiries").add({
        ...body,
        createdAt: Timestamp.now(),
      });
    }

    // Send email (non-blocking — don't fail the request if email fails)
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Krishna Visualizer" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
        subject: `New Paint Enquiry — ${body.name} (${body.city})`,
        html: buildEmailHtml(body),
        text: [
          `New paint enquiry from ${body.name}`,
          `Mobile: ${body.mobile}`,
          `City: ${body.city}`,
          body.roomType ? `Room: ${body.roomType}` : "",
          body.colorInterest ? `Color: ${body.colorInterest}` : "",
          body.message ? `Message: ${body.message}` : "",
        ].filter(Boolean).join("\n"),
      });
    } catch (emailErr) {
      console.error("[Email Error]", emailErr);
      // Don't fail — enquiry is already saved to Firestore
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Enquiry API Error]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}