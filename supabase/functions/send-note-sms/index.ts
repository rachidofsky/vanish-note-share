
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Twilio } from "npm:twilio@4.19.3";

// Initialize Twilio with API credentials from environment variables
const twilioClient = new Twilio(
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
      return new Response(
        JSON.stringify({ error: "Phone number and note link are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Format phone number: ensure it has a country code
    const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+1${phoneNumber.replace(/\D/g, "")}`;

    // Send the SMS
    const message = await twilioClient.messages.create({
      body: `You've received a secure note! View it here: ${noteLink} (Note: This message may self-destruct after viewing)`,
      from: Deno.env.get("TWILIO_PHONE_NUMBER"),
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
