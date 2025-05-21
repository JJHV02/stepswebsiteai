// functions/index.js (Firebase Cloud Functions)
const functions = require("firebase-functions");
const { createClient } = require("@supabase/supabase-js");
const fetch = require("node-fetch");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.generateProfileSummary = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, cursos, carrera } = req.body;
  if (!nombre || !cursos || !carrera) {
    return res.status(400).json({ error: "Missing input data" });
  }

  const cursosList = cursos.length > 0 ? cursos.join(", ") : "sin cursos específicos";

  const prompt = `Genera un breve resumen profesional de perfil para una persona llamada ${nombre}, que estudia ${carrera} y ha completado estos cursos: ${cursosList}.`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      return res.status(500).json({ error: `OpenAI API error: ${errText}` });
    }

    const openaiData = await openaiRes.json();
    const aiSummary = openaiData.choices?.[0]?.message?.content ?? "No summary generated.";

    const uid = req.headers["uid"];
    if (!uid) {
      return res.status(400).json({ error: "Missing uid header" });
    }

    const { error } = await supabase
      .from("ai_profiles")
      .update({ perfil_ai: { summary: aiSummary } })
      .eq("firebase_uid", uid);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ summary: aiSummary });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
