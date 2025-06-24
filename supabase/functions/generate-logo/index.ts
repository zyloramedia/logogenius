import { corsHeaders } from "@shared/cors.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface LogoGenerationRequest {
  brandName: string;
  slogan?: string;
  businessDescription: string;
  colorPreferences: string[];
  logoStyle: string;
  userId?: string;
  variations?: number;
}

interface LogoGenerationResponse {
  success: boolean;
  logos?: {
    id: string;
    url: string;
    downloadUrl: string;
  }[];
  error?: string;
  creditsUsed?: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const requestData: LogoGenerationRequest = await req.json();

    const {
      brandName,
      slogan,
      businessDescription,
      colorPreferences,
      logoStyle,
      userId,
      variations = 3,
    } = requestData;

    // Validate required fields
    if (!brandName || !businessDescription || !logoStyle) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Missing required fields: brandName, businessDescription, and logoStyle are required",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Check user credits if userId is provided
    if (userId) {
      const { data: userCredits, error: creditsError } = await supabase
        .from("user_credits")
        .select("credits")
        .eq("user_id", userId)
        .single();

      if (creditsError || !userCredits || userCredits.credits < 1) {
        return new Response(
          JSON.stringify({
            success: false,
            error:
              "Insufficient credits. Please purchase more credits to generate logos.",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 402,
          },
        );
      }
    }

    // Create prompt for AI image generation
    const prompt = `Create a professional logo for "${brandName}"${slogan ? ` with slogan "${slogan}"` : ""}. Business description: ${businessDescription}. Style: ${logoStyle}. Colors: ${colorPreferences.join(", ")}. High quality, vector-style, clean design, suitable for business use.`;

    // Here you would integrate with your preferred AI image generation service
    // For now, I'll create a mock response structure that n8n can work with
    const mockLogos = Array.from({ length: variations }, (_, index) => ({
      id: `logo_${Date.now()}_${index}`,
      url: `https://api.placeholder.com/1024x1024/logo_${index}`,
      downloadUrl: `https://api.placeholder.com/1024x1024/logo_${index}?download=true`,
      prompt: prompt,
      style: logoStyle,
      colors: colorPreferences,
    }));

    // Store generation record in database
    const { data: generationRecord, error: insertError } = await supabase
      .from("logo_generations")
      .insert({
        user_id: userId,
        brand_name: brandName,
        slogan: slogan,
        business_description: businessDescription,
        color_preferences: colorPreferences,
        logo_style: logoStyle,
        prompt: prompt,
        variations_count: variations,
        status: "completed",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error storing generation record:", insertError);
    }

    // Deduct credits if userId is provided
    if (userId) {
      const { error: updateError } = await supabase
        .from("user_credits")
        .update({
          credits: supabase.sql`credits - 1`,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (updateError) {
        console.error("Error updating credits:", updateError);
      }
    }

    // Store individual logo records
    const logoRecords = mockLogos.map((logo) => ({
      generation_id: generationRecord?.id,
      logo_id: logo.id,
      image_url: logo.url,
      download_url: logo.downloadUrl,
      created_at: new Date().toISOString(),
    }));

    const { error: logoInsertError } = await supabase
      .from("generated_logos")
      .insert(logoRecords);

    if (logoInsertError) {
      console.error("Error storing logo records:", logoInsertError);
    }

    const response: LogoGenerationResponse = {
      success: true,
      logos: mockLogos,
      creditsUsed: 1,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Logo generation error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error during logo generation",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
