// src/insertToSupabase.js
// -----------------------
// Lee profiles.json desde la raíz del proyecto, mapea campos
// (sin 'cursos') y los inserta en la tabla ai_profiles.

require("dotenv").config();               // carga SUPABASE_URL & SUPABASE_KEY
const path   = require("path");
const fs     = require("fs");
const { createClient } = require("@supabase/supabase-js");

// 1) Inicializa el cliente de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 2) Carga el JSON exportado
const dataPath = path.resolve(__dirname, "../profiles.json");
let rawProfiles;
try {
  rawProfiles = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  console.log(`✅ Cargados ${rawProfiles.length} perfiles desde ${dataPath}`);
} catch (err) {
  console.error(`❌ No se pudo cargar profiles.json:`, err);
  process.exit(1);
}

// 3) Función para mapear el objeto de Firestore al esquema de Supabase
function mapProfile(f) {
  // Mapea el campo Student_Groups/Clubs a grupos (vacío si "NA")
  const gruposRaw = f["Student_Groups/Clubs"];
  const grupos = (gruposRaw && gruposRaw !== "NA")
    ? (Array.isArray(gruposRaw) ? gruposRaw : [gruposRaw])
    : [];

  return {
    firebase_uid:   f.userName || f.firebase_uid || f.id,
    nombre:         f.userName || null,
    carrera:        f.Career || null,
    certificados:   Array.isArray(f.Certifications)
                     ? f.Certifications
                     : (f.Certifications ? [f.Certifications] : []),
    grupos:         grupos,
    proyectos:      Array.isArray(f.Projects)
                     ? f.Projects
                     : (f.Projects ? [f.Projects] : []),
    pais:           f.Country || null,
    study_abroad:   !!f.Study_Abroad,
    universidad:    f.University || null,
    study_area:     f["Study Area"] || null,
    year_graduated: f.yearGraduated || null,
    perfil_ai:      {}  // inicialmente vacío
  };
}

// 4) Inserta cada perfil mapeado en Supabase
async function insertProfiles() {
  console.log("➡️  Iniciando inserción en Supabase...");
  for (const raw of rawProfiles) {
    const profile = mapProfile(raw);
    const { data, error } = await supabase
      .from("ai_profiles")
      .insert([ profile ]);

    const uid = profile.firebase_uid;
    if (error) {
      console.error(`❌ Error insertando UID=${uid}:`, error.message);
    } else {
      console.log(`✅ Insertado UID=${uid}`);
    }
  }
  console.log("🎉 Todos los perfiles procesados!");
}

insertProfiles();
