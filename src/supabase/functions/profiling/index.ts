import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, uid",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    const { nombre, cursos, carrera } = await req.json();

    if (
      typeof nombre !== "string" ||
      !Array.isArray(cursos) ||
      typeof carrera !== "string"
    ) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const cursosList = cursos.length > 0 ? cursos.join(", ") : "sin cursos específicos";

    const prompt = `Genera un breve resumen profesional de perfil para una persona llamada ${nombre}, que estudia ${carrera} y ha completado estos cursos: ${cursosList}.`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      return new Response(JSON.stringify({ error: `OpenAI API error: ${errText}` }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const openaiData = await openaiRes.json();
    const aiSummary = openaiData.choices?.[0]?.message?.content ?? "No summary generated.";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const uid = req.headers.get("uid");
    if (!uid) {
      return new Response(JSON.stringify({ error: "Missing uid header" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { error } = await supabase
      .from("ai_profiles")
      .update({ perfil_ai: { summary: aiSummary } })
      .eq("firebase_uid", uid);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ summary: aiSummary }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});

// This function is designed to be deployed as a serverless function on Supabase.