import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

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

// HR notification recipient for career applications
const HR_EMAIL = "hr@kmopl.com";

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

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  city?: string;
  qualification?: string;
  expertise?: string;
  resumeUrl?: string;
  jobTitle?: string;
}

// ── HTML email template ───────────────────────────────────────────────────────
function buildApplicationEmailHtml(data: ApplicationData): string {
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
<body style="margin:0;padding:0;background:#f0ebe1;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0ebe1;padding:32px 16px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">

        <tr><td style="padding-bottom:24px;text-align:center;">
          <span style="font-size:28px;font-weight:900;color:#1c1917;letter-spacing:-0.03em;font-family:Georgia,serif;">KMOPL</span>
          <span style="font-size:12px;color:#a8a29e;display:block;margin-top:2px;letter-spacing:0.15em;text-transform:uppercase;">Careers</span>
        </td></tr>

        <tr><td>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.08);">

            <tr><td style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 50%,#b45309 100%);padding:36px 36px 32px;">
              <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">New Career Application</div>
              <div style="font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;font-family:Georgia,serif;">${data.name}</div>
              <div style="font-size:14px;color:rgba(255,255,255,0.8);margin-top:6px;">${data.jobTitle ? data.jobTitle : "General Application"} · ${timestamp}</div>
            </td></tr>

            <tr><td style="padding:24px 36px 8px;">
              <div style="font-size:11px;font-weight:700;color:#d97706;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:4px;">Applicant Details</div>
            </td></tr>
            <tr><td style="padding:0 36px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${detailRow("📧", "Email", `<a href="mailto:${data.email}" style="color:#1c1917;text-decoration:none;">${data.email}</a>`)}
                ${detailRow("📱", "Phone", `<a href="tel:${data.phone}" style="color:#1c1917;text-decoration:none;">${data.phone}</a>`)}
                ${data.city ? detailRow("📍", "City", data.city) : ""}
                ${data.qualification ? detailRow("🎓", "Qualification", data.qualification) : ""}
                ${data.expertise ? detailRow("💼", "Area of Expertise", data.expertise) : ""}
                ${data.jobTitle ? detailRow("📌", "Applied For", data.jobTitle) : ""}
              </table>
            </td></tr>

            ${data.resumeUrl ? `
            <tr><td style="padding:24px 36px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td align="center">
                  <a href="${data.resumeUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#292524,#1c1917);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;">
                    📄&nbsp;&nbsp;View / Download Resume
                  </a>
                </td>
              </tr></table>
            </td></tr>` : ""}

            <tr><td style="background:#faf7f2;padding:20px 36px;border-top:1px solid #f0ece4;">
              <div style="font-size:12px;color:#a8a29e;line-height:1.5;">
                Sent automatically by<br/><span style="font-weight:700;color:#78716c;">KMOPL Careers Portal</span>
              </div>
            </td></tr>

          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

// GET all career applications (admin)
export async function GET() {
  try {
    const snap = await adminDb.collection("career_applications").orderBy("createdAt", "desc").get();
    const applications = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ applications }, { status: 200 });
  } catch (err) {
    console.error("[Applications API GET Error]", err);
    return NextResponse.json({ applications: [] }, { status: 500 });
  }
}

// POST - submit a new career application (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, qualification, expertise, resumeUrl, jobTitle } = body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    const applicationData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city || "",
      qualification: qualification || "",
      expertise: expertise || "",
      resumeUrl: resumeUrl || "",
      jobTitle: jobTitle || "",
      createdAt: Timestamp.now(),
    };

    const docRef = await adminDb.collection("career_applications").add(applicationData);

    // Send email notification to HR (non-blocking — don't fail the request if email fails)
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"KMOPL Careers" <${process.env.EMAIL_USER}>`,
        to: HR_EMAIL,
        replyTo: applicationData.email,
        subject: `New Career Application — ${applicationData.name}${applicationData.jobTitle ? ` (${applicationData.jobTitle})` : ""}`,
        html: buildApplicationEmailHtml(applicationData),
        text: [
          `New career application from ${applicationData.name}`,
          `Email: ${applicationData.email}`,
          `Phone: ${applicationData.phone}`,
          applicationData.city ? `City: ${applicationData.city}` : "",
          applicationData.qualification ? `Qualification: ${applicationData.qualification}` : "",
          applicationData.expertise ? `Area of Expertise: ${applicationData.expertise}` : "",
          applicationData.jobTitle ? `Applied For: ${applicationData.jobTitle}` : "",
          applicationData.resumeUrl ? `Resume: ${applicationData.resumeUrl}` : "",
        ].filter(Boolean).join("\n"),
      });
    } catch (emailErr) {
      console.error("[Applications Email Error]", emailErr);
      // Don't fail — application is already saved to Firestore
    }

    return NextResponse.json({ id: docRef.id, ...applicationData }, { status: 201 });
  } catch (err) {
    console.error("[Applications API POST Error]", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

// DELETE - remove an application (admin)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    await adminDb.collection("career_applications").doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Applications API DELETE Error]", err);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
