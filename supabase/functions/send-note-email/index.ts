
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key from environment variable
const resend = new Resend("re_GKbnfJaS_9685qHVujLhfHVgmvNPABLtr");

// Set up CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendNoteEmailRequest {
  recipientEmail: string;
  noteLink: string;
  senderEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipientEmail, noteLink, senderEmail } = await req.json() as SendNoteEmailRequest;

    if (!recipientEmail || !noteLink) {
      return new Response(
        JSON.stringify({ error: "Recipient email and note link are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create a sender display name based on email or default
    const fromEmail = "notifications@onetimenotesecure.com";
    const fromName = senderEmail ? `OneTimeNote (via ${senderEmail})` : "OneTimeNote";

    // Send the email
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [recipientEmail],
      subject: "You've received a secure note",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">You've received a secure note</h2>
          <p>Someone has shared a secure, self-destructing note with you.</p>
          <p style="margin-bottom: 25px;">To view this note, click the button below:</p>
          <a href="${noteLink}" style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Secure Note</a>
          <p style="margin-top: 25px; font-size: 14px; color: #666;">
            <strong>Warning:</strong> This note may be set to self-destruct after viewing. Make sure you're ready to view the contents before clicking the link.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999;">
            This is an automated message from OneTimeNote. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Email sending error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Email sent successfully:", data);
    
    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
