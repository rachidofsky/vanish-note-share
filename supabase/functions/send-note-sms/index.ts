
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import twilio from "npm:twilio@4.19.3";

// Initialize Twilio with API credentials from environment variables
const twilioClient = twilio(
  Deno.env.get("TWILIO_ACCOUNT_SID"),
  Deno.env.get("TWILIO_AUTH_TOKEN")
);

// Set up CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendNoteSmsRequest {
  phoneNumber: string;
  noteLink: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, noteLink } = await req.json() as SendNoteSmsRequest;

    if (!phoneNumber || !noteLink) {
      console.error("Missing required fields:", { phoneNumber: !!phoneNumber, noteLink: !!noteLink });
      return new Response(
        JSON.stringify({ error: "Phone number and note link are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending SMS to:", phoneNumber);
    console.log("Note link:", noteLink);

    // Format phone number: ensure it has a country code
    const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+1${phoneNumber.replace(/\D/g, "")}`;
    console.log("Formatted phone number:", formattedPhone);

    // Check if we have Twilio credentials
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const fromNumber = Deno.env.get("TWILIO_PHONE_NUMBER");
    
    console.log("Using Twilio credentials:", {
      accountSid: accountSid ? "✓" : "✗",
      authToken: authToken ? "✓" : "✗",
      fromNumber: fromNumber ? "✓" : "✗"
    });

    if (!accountSid || !authToken || !fromNumber) {
      return new Response(
        JSON.stringify({ error: "Missing Twilio credentials or phone number" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Ensure the noteLink is properly formatted
    const formattedLink = noteLink.includes("http") ? noteLink : `https://${noteLink}`;

    // Send the SMS
    const message = await twilioClient.messages.create({
      body: `You've received a secure note! View it here: ${formattedLink} (Note: This message may self-destruct after viewing)`,
      from: fromNumber,
      to: formattedPhone,
    });

    console.log("SMS sent successfully:", message.sid);
    
    return new Response(
      JSON.stringify({ success: true, messageId: message.sid }),
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
