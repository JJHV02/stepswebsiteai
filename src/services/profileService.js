// src/services/profileService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Convierte un string CSV en array, descartando "NA" o vacíos.
 */
function parseCsvField(field) {
  if (typeof field !== "string") return [];
  return field
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && s.toUpperCase() !== "NA");
}

/**
 * Reglas básicas para generar sugerencias de rutas.
 */
function analyzeOneProfile(data) {
  const suggestions = [];

  const certs = parseCsvField(data.Certifications);
  const projects = parseCsvField(data.Projects);
  const clubs = parseCsvField(data["Student_Groups/Clubs"]);
  const studyArea = (data["Study Area"] || "").toLowerCase();
  const career = (data.Career || "").toLowerCase();

  // 1) Cloud Engineer
  if (
    certs.some((c) => c.toLowerCase().includes("azure")) ||
    certs.some((c) => c.toLowerCase().includes("cloud")) ||
    studyArea.includes("cloud")
  ) {
    suggestions.push({
      title: "Cloud Engineer",
      description:
        "Basado en tus certificaciones de Azure/Cloud y tu área de estudio.",
    });
  }

  // 2) Data Scientist
  if (
    certs.some((c) => c.toLowerCase().includes("data")) ||
    projects.some((p) => p.toLowerCase().includes("datathon")) ||
    studyArea.includes("data")
  ) {
    suggestions.push({
      title: "Data Scientist",
      description:
        "Tu experiencia en Data Science y participación en Datathons te califica.",
    });
  }

  // 3) Project Manager
  if (
    clubs.some((club) => club.toLowerCase().includes("presidencia")) ||
    career.includes("transformación digital") ||
    career.includes("itd")
  ) {
    suggestions.push({
      title: "Project Manager",
      description:
        "Tienes experiencia en grupos estudiantiles/proyectos, ideal para gestión.",
    });
  }

  // Si no hay coincidencias, sugerencia genérica
  if (suggestions.length === 0) {
    suggestions.push({
      title: "Explora más opciones",
      description:
        "No se encontraron coincidencias fuertes; podrías indagar áreas nuevas.",
    });
  }

  return suggestions;
}

/**
 * Lee todos los perfiles de la colección `users`,
 * les aplica `analyzeOneProfile` y devuelve un array de resultados.
 */
export async function fetchAndAnalyzeProfiles() {
  const snap = await getDocs(collection(db, "users"));
  console.log(`🔍 perfiles encontrados: ${snap.size}`);
  const results = snap.docs.map((doc) => {
    const data = doc.data();
    return {
      nombre: data.userName || data.Nombre || "Usuario",
      yearGraduated: data.yearGraduated || data.anioEgreso || "N/A",
      career: data.Career || "N/A",
      suggestions: analyzeOneProfile(data),
    };
  });
  console.log("🔍 resultados procesados:", results);
  return results;
}