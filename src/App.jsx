import { useState, useMemo } from "react";
 
const STUDIES_RAW = [
{"n": "14 Serotipos para Streptococcus pneumoniae", "p": 6850, "te": "15 (días)", "ay": 4, "ind": "No requiere indicación especial", "sin": "", "cat": "Infectologia", "co": 4814, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "17-Hidroxi Progesterona", "p": 400, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "17 Alfa Hidroxi Progesterona", "cat": "Ginecologia", "co": 271.44, "ch": 904.75, "mo": 718, "sw": 447.97, "ts": 423.77},
{"n": "Ac Anti Borrelia burgdorferi (Western Blot)", "p": 6500, "te": null, "ay": 4, "ind": "No requiere indicación especial", "sin": "Inmuno Blot para Lyme, Inmunoblot para Lyme, Western Blot para Lyme", "cat": "", "co": 3764.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Ac. Anti Borrelia burgdorferi (IgG e IgM enf. Lyme)", "p": 2200, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "Borrelia IgG IgM, Enfermedad de Lyme, Lyme", "cat": "Infectologia", "co": 924.52, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Acido Folico", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No ingerir multivitaminicos antes de la toma de muestra", "sin": "Vitamina B9, Vit B9", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 223.3, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Acido Lactico", "p": 650, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Endocrinologia,Nutricion,Cardiologia", "co": 418, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Acido Piruvico", "p": 2000, "te": "9 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Piruvato", "cat": "Ginecologia,Embarazo,Nutricion", "co": 1430, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Acido Urico", "p": 100, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Urato", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 34.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Acido Urico en Orina", "p": 150, "te": "8 (dias)", "ay": null, "ind": "Recolectar orina de 24 horas en un recipiente limpio, iniciar la recolección por la mañana eliminando la primera orina de la mañana y terminando al dia siguiente a la misma hora.", "sin": "Urato en Orina", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 47.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Acido urico en orina de 24 horas", "p": 200, "te": "1 (dias)", "ay": null, "ind": "Recolectar orina de 24 horas en un recipiente limpio, iniciar la recolección por la mañana eliminando la primera orina de la mañana y terminando al dia siguiente a la misma hora.", "sin": "", "cat": "Ginecologia,Embarazo,Nutricion", "co": 49.88, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Acidos Biliares Totales y Fraccionados", "p": 4200, "te": "10 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ácidos Biliares Totales en Suero, Ácidos Biliares Totales Sericos, Acidos Biliares", "cat": "Gastroenterologia", "co": 1100, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Albumina", "p": 100, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Albumina Serica, Albumina en Suero", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 41.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Aldolasa", "p": 500, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 168.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Aldosterona", "p": 500, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Aldosterona en Suero, Aldosterona Serica", "cat": "Ginecologia", "co": 242, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "AlfaFetoProteina", "p": 700, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "AFP", "cat": "Ginecologia,Endocrinologia", "co": 215.76, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Aluminio Serico", "p": 900, "te": "6 (dias)", "ay": 8, "ind": "No tomar antiácidos que contengan aluminio 3 días antes de la prueba.", "sin": "Aluminio en Sangre, Aluminio Sérico, Al en Sangre", "cat": "Toxicologia,Neurologia,Interna", "co": 465.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Amilasa en sangre", "p": 300, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Amilasa, Amilasa en Suero", "cat": "Gastroenterologia", "co": 100.92, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Aminoacidos (Cualitativo)", "p": 1500, "te": "13 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Aminoacidos cualitativos", "cat": "Ginecologia,Embarazo,Nutricion", "co": 662.36, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Amonio en Sangre", "p": 450, "te": "5 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Amonio, Amonio en Suero", "cat": "Toxicologia,Neurologia,Interna", "co": 176, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Androstenediona", "p": 500, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Androstenediona en Suero, Androstenediona Serica", "cat": "Ginecologia,Dermatologia", "co": 286.52, "ch": 587.95, "mo": 706.9, "sw": 655, "ts": 622.1},
{"n": "Angiotensina Enzima Convertidora", "p": 1600, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "Angiotensina, ACE", "cat": "Endocrinologia,Nutricion,Cardiologia", "co": 885.08, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anti Citoplasma de neutrofilos", "p": 2400, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "ANCA PANEL, C ANCA, PANCA, PR3, MPO", "cat": "Reumatologia", "co": 899, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anti Transglutaminasa Tisular Iga Serica", "p": 2000, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Anti Transglutaminasa Tisular Iga", "cat": "Ginecologia,Embarazo,Nutricion", "co": 770, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticoagulante Lupico", "p": 900, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Anticoagulante circulatorio lúpico, Anticoagulante Lúpico en Plasma", "cat": "Reumatologia", "co": 494.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpo Anti Insulina IgG", "p": 800, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Endocrinologia", "co": 424.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Beta 2 Glicoproteina IgA, IgG, IgM", "p": 2500, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Beta 2 glucoproteína IgA, IgG, IgM", "cat": "Reumatologia", "co": 1296.88, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Beta 2 Glicoproteina IgG, IgM", "p": 2200, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Beta 2 glucoproteína IgG, IgM", "cat": "Reumatologia", "co": 1137.96, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Cardiolipinas IgA, IgG, IgM", "p": 2000, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Cardiolipinas IgA IgG IgM", "cat": "Reumatologia", "co": 1151.7, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Cardiolipinas IgG, IgM", "p": 800, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Cardiolipina IgG, IgM", "cat": "Reumatologia", "co": 451, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Celulas Parietales", "p": 900, "te": "7 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Células parietales", "cat": "Gastroenterologia", "co": 642.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Citomegalovirus IgG", "p": 500, "te": "2 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Citomegalovirus IgG", "cat": "Infectologia", "co": 306.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Citomegalovirus IgM", "p": 550, "te": "2 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Citomegalovirus IgM", "cat": "Infectologia", "co": 319, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Coccidioides Imitis IgM", "p": 1350, "te": "5 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Coccidioides immitis IgM", "cat": "Infectologia", "co": 1081.3, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Dengue IgG, IgM + NS1", "p": 1200, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Dengue IgG IgM + NS1,", "cat": "Respiratorio/Viral", "co": 486.04, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti DNA (DNAds)", "p": 700, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Doble Cadena, Anti-DNA IgG, Ac. Anti-DNA IgG", "cat": "Reumatologia", "co": 377, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Factor Intrinseco", "p": 1400, "te": "7 (dias)", "ay": 12, "ind": "No requiere indicación especial", "sin": "Ac. Anti Factor intrínseco totales", "cat": "Reumatologia", "co": 741.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Factor Reumatoide (IgA, IgG, IgM)", "p": 1200, "te": "6 (dias)", "ay": 12, "ind": "No requiere indicación especial", "sin": "Ac. Anti Factor Reumatoide IgG IgA IgM", "cat": "Reumatologia", "co": 1015, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Gliadina IgA / IgG", "p": 800, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Gliadinas IgA IgG", "cat": "Gastroenterologia", "co": 622.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Helicobacter Pylori IgA", "p": 900, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Helicobacter Pylori IgA", "cat": "Gastroenterologia", "co": 349.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Helicobacter Pylori IgG", "p": 900, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Helicobacter Pylori IgG", "cat": "Gastroenterologia", "co": 385.12, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Helicobacter Pylori IgM", "p": 1300, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Helicobacter Pylori IgM", "cat": "Gastroenterologia", "co": 379.32, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Herpes Tipo 2 IgG", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Herpes II IgG", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 287.1, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Herpes Tipo 2 IgM", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Herpes II IgM", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 210.1, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Herpes Tipo I IgG", "p": 700, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "IgG Herpes Tipo I", "cat": "Infectologia", "co": 275, "ch": 409.75, "mo": 2816, "sw": 818, "ts": 2334.9},
{"n": "Anticuerpos Anti Herpes Tipo I IgM", "p": 700, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "IgM Herpes Tipo I", "cat": "Infectologia", "co": 242, "ch": 451, "mo": null, "sw": 446, "ts": 1943.53},
{"n": "Anticuerpos Anti Hu, Yo, Ri", "p": 9500, "te": null, "ay": 4, "ind": "No requiere indicación especial", "sin": "Anticuerpos anti neuronales, anti-neuronales", "cat": "Reumatologia", "co": 5221.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Jo1", "p": 550, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Jo1", "cat": "Reumatologia", "co": 324.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti LKM-1", "p": 1300, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 522, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Nucleares (HEP2)", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Anti - ANA (IgG)", "cat": "Reumatologia", "co": 297, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Nucleares Inmunofluorescencia (ANA IFI)", "p": 600, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Nucleares por inmunofluorescencia, ANA IFI", "cat": "Reumatologia", "co": 331.76, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Peptido Ciclico de la Citrulina", "p": 1000, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Péptido cíclico citrulinado IgG (CCP), CCP", "cat": "Reumatologia", "co": 605, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos anti receptor de TSH", "p": 2600, "te": null, "ay": 4, "ind": "No requiere indicación especial", "sin": "Anti R-TSH", "cat": "Endocrinologia", "co": 1380.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Rubeola IgG", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Rubeola IgG", "cat": "Infectologia", "co": 261.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Rubeola IgM", "p": 450, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Rubeola IgM", "cat": "Infectologia", "co": 316.68, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Scl 70", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Scl 70", "cat": "Reumatologia", "co": 330, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti SLA", "p": 8100, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 3215.52, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti SM (SMITH)", "p": 400, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac SMITH, SMITH, Ac. Anti Smith IgG (Sm)", "cat": "Reumatologia", "co": 330, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti SS-A (Anti RO)", "p": 1000, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti RO, Anti RO, Ac. Anti SSA (Ro)", "cat": "Reumatologia", "co": 403.68, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti SS-B (Anti LA)", "p": 500, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti LA, Anti LA, Ac. Anti SSB (La)", "cat": "Reumatologia", "co": 330, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Tiroideos (TPO/TG)", "p": 1300, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Tiroides TPO,TG", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 483.72, "ch": 1357.4, "mo": 3380, "sw": null, "ts": 2505.29},
{"n": "Anticuerpos Anti Toxoplasma IgG", "p": 450, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Toxoplasma Gondii IgG", "cat": "Infectologia", "co": 275, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Toxoplasma IgM", "p": 400, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Toxoplasma Gondii IgM", "cat": "Infectologia", "co": 300.44, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Transglutaminasa IgA / IgG", "p": 2200, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Transglutaminasa IgA IgG", "cat": "Gastroenterologia", "co": 770, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Varicela IgG", "p": 350, "te": "10 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac Anti- Varicela IgG, IgM", "cat": "Infectologia", "co": 280.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti-Coccidioides imitis IgG", "p": 1350, "te": "5 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Coccidioides immitis IgG", "cat": "Infectologia", "co": 1081.3, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Antiperoxidasa (TPO)", "p": 1000, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Microsomales totales, Ac. Anti Peroxidasa", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 337.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antiestreptolisinas", "p": 300, "te": null, "ay": 4, "ind": "No requiere indicación especial", "sin": "ASTO, ASO, Estreptolisinas", "cat": "Reumatologia", "co": 105.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno CA 15-3", "p": 900, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "CA 15-3", "cat": "Ginecologia", "co": 294.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno CA 72-4", "p": 800, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "CA 72-4", "cat": "Ginecologia", "co": 495, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno CA-125", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "CA 125", "cat": "Ginecologia", "co": 290, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno CA19-9", "p": 800, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "CA19-9", "cat": "Ginecologia", "co": 288.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno Carcino Embrionario", "p": 600, "te": "12 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "CEA", "cat": "Ginecologia", "co": 180.96, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno de Helicobacter Pylori en Heces", "p": 1900, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de materia fecal del tamaño de una nuez en un recipiente estéril. No muestra liquida", "sin": "Helicobacter pylori en heces", "cat": "Gastroenterologia", "co": 715, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno de Histocompatibilidad HLA-B27", "p": 1500, "te": "7 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Detección Antígeno HLA B-27", "cat": "Reumatologia", "co": 909.44, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno HE4", "p": 3200, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "HE4, Ag HE4", "cat": "Ginecologia", "co": 1817.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno Prostatico Especifico", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No andar en bicicleta, montar a caballo o examen digital al menos 24 horas antes del estudio,", "sin": "PSA", "cat": "Urologia", "co": 119.48, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno Prostatico Especifico Total + Libre", "p": 1000, "te": "1 (dias)", "ay": 8, "ind": "No andar en bicicleta, montar a caballo o examen digital al menos 24 horas antes del estudio,", "sin": "Antígeno prostático especifico total y libre", "cat": "Urologia", "co": 433.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Antigeno Prostatico Libre", "p": 450, "te": "3 (dias)", "ay": 8, "ind": "No andar en bicicleta, montar a caballo o examen digital al menos 24 horas antes del estudio,", "sin": "FPSA", "cat": "Urologia", "co": 226.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Aplicacion Prueba COVID", "p": 350, "te": "1 (dias)", "ay": null, "ind": "No requiere indicación especial", "sin": "", "cat": "Respiratorio/Viral", "co": 165, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Apolipoprotinas A-1", "p": 500, "te": "5 (dias)", "ay": 12, "ind": "Ultimo alimento ingerido libre de grasas", "sin": "Apolipoproteínas en Suero, Apolipoproteínas Sericas", "cat": "Ginecologia,Embarazo,Nutricion", "co": 320.1, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Bilirrubinas Totales", "p": 300, "te": null, "ay": null, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 84.68, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Biometria Hematica Completa", "p": 300, "te": "1 (dias)", "ay": 4, "ind": "No requiere indicación especial", "sin": "BHC, BH, Biometria, bh", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 59.16, "ch": 154, "mo": 315, "sw": 237, "ts": 332},
{"n": "Calcio en orina de 24 horas", "p": 250, "te": null, "ay": null, "ind": "Recolectar orina de 24 horas en un recipiente limpio, iniciar la recolección por la mañana eliminando la primera orina de la mañana y terminando al dia siguiente a la misma hora.", "sin": "", "cat": "Ginecologia,Embarazo,Nutricion", "co": 55.68, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Calcio Ionico", "p": 900, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "Calcio Ionico Serico", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 76.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Calcio Serico", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Calcio en Suero", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 47.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Calcitonina", "p": 900, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "Calcitonina Serica, Calcitonina en Sangre", "cat": "Ginecologia,Embarazo,Nutricion", "co": 370.04, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Calprotectina fecal", "p": 1200, "te": null, "ay": null, "ind": "Recolectar una muestra de materia fecal del tamaño de una nuez de diferentes días en un recipiente estéril.", "sin": "Calpro en heces", "cat": "Gastroenterologia", "co": 619.44, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Canabinoides", "p": 363, "te": "1 (dias)", "ay": 8, "ind": "Recolectar una muestra de orina en un recipiente estéril, necesita ser custodiado por personal de salud.", "sin": "Marihuana en orina", "cat": "Toxicologia", "co": 159.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Carbamazepina (Tegretol)", "p": 300, "te": "3 (dias)", "ay": 8, "ind": "Tomar muestra antes de la siguiente dosis.", "sin": "Tegretol, Carbamazepina", "cat": "Toxicologia", "co": 300.44, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cariotipo de Sangre Periferica", "p": 6000, "te": "17 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Cariotipo de sangre periferica", "cat": "Ginecologia", "co": 3224.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cariotipo de Sangre Periferica Alta Resolucion", "p": 10000, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "Cariotipo en sangre periférica alta resolución", "cat": "Ginecologia", "co": 5730.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Carnitina Total y Libre", "p": 5100, "te": "14 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo,Nutricion", "co": 3960, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Chlamydia Trachomatis - Anticuerpos IgG", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Chlamydia Trachomatis IgG", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 385, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Chlamydia Trachomatis - Anticuerpos IgG/IgA/IgM", "p": 2900, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Chlamydia Trachomatis IgG, IgA, IgM", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 1057.92, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Chlamydia Trachomatis - PCR", "p": 1802, "te": "14 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Chlamydia Trachomatis por PCR", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 1509.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cistatina C", "p": 1600, "te": null, "ay": null, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 658.88, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Citrato en orina de 24 horas", "p": 700, "te": null, "ay": null, "ind": "Recolectar orina de 24 horas en un recipiente limpio, iniciar la recolección por la mañana eliminando la primera orina de la mañana y terminando al dia siguiente a la misma hora.", "sin": "Acido citrico en orina de 24 oras", "cat": "Ginecologia,Embarazo,Nutricion", "co": 320.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Clostridium Difficile Toxinas A y B", "p": 650, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de materia fecal del tamaño de una nuez en un recipiente estéril.", "sin": "Clostridium difficile toxina", "cat": "Gastroenterologia", "co": 495, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cobre Serico", "p": 600, "te": "5 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Cobre en Suero, Cobre", "cat": "Nutricion", "co": 330, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cocaina", "p": 363, "te": "1 (dias)", "ay": 8, "ind": "Recolectar una muestra de orina en un recipiente estéril, necesita ser custodiado por personal de salud.", "sin": "Cocaina", "cat": "Toxicologia", "co": 159.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Colesterol HDL Alta Densidad", "p": 200, "te": "1 (dias)", "ay": 12, "ind": "No requiere indicación especial", "sin": "HDL", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 58, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Colesterol LDL Baja Densidad", "p": 200, "te": "1 (dias)", "ay": 12, "ind": "No requiere indicación especial", "sin": "LDL", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 67.28, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Colesterol Total", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Colesterol", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 46.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Complemento C3", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "C3", "cat": "Reumatologia", "co": 249.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Complemento C4", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "C4", "cat": "Reumatologia", "co": 317.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Complemento Hemolitico (CH 50)", "p": 350, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Complemento hemolítico 50%", "cat": "Reumatologia", "co": 289.3, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Coombs Directo", "p": 250, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Rh eritrocitarios", "cat": "Ginecologia,Embarazo", "co": 106.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Coombs Indirecto", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Cooind", "cat": "Ginecologia,Embarazo", "co": 128.76, "ch": 308, "mo": 630, "sw": 522, "ts": 1422.22},
{"n": "Coprocultivo", "p": 700, "te": "4 (dias)", "ay": null, "ind": "Recolectar muestra pequeña en un frasco seco, evitar el contacto con el inodoro o mezclar con orina", "sin": "Cultivo de heces", "cat": "Gastroenterologia", "co": 275, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Coprologico", "p": 600, "te": "4 (dias)", "ay": null, "ind": "Recolectar una muestra de materia fecal del tamaño de una nuez en un recipiente estéril.", "sin": "Fisico quimico en heces", "cat": "Infectologia", "co": 93.96, "ch": 180.95, "mo": 563, "sw": 274, "ts": 607.09},
{"n": "Coproparasitoscopico (CPS) 1 Muestra", "p": 600, "te": null, "ay": null, "ind": "Recolectar muestra pequeña en un frasco seco, evitar el contacto con el inodoro o mezclar con orina", "sin": "CPSU, Copro unico", "cat": "Gastroenterologia", "co": 56.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Coproparasitoscopico (CPS) 3 Muestras / Serie de 3", "p": 800, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de materia fecal del tamaño de una nuez de diferentes días en un recipiente estéril.", "sin": "Coproparasitoscópico 3 m, Coproparasitoscopico de 3 muestras", "cat": "Gastroenterologia", "co": 82.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cortisol en Orina 24 horas", "p": 603, "te": "3 (dias)", "ay": null, "ind": "Recolectar orina de 24 horas en un recipiente limpio, iniciar la recolección por la mañana eliminando la primera orina de la mañana y terminando al dia siguiente a la misma hora.", "sin": "Cortisol en orina de 24 hrs", "cat": "Endocrinologia", "co": 136.88, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cortisol en Sangre", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "Se toma preferentemente antes de las 08:30am", "sin": "Cortisol en Suero", "cat": "Ginecologia,Endocrinologia", "co": 139.2, "ch": 943.25, "mo": 717, "sw": 873, "ts": 1393.91},
{"n": "Creatinfosfoquinasa (CPK)", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "CPK", "cat": "Cardiologia", "co": 120.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Creatinfosfoquinasa CK-MB", "p": 450, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Troponina CPKMB, CK Fraccion MB,  Enzimas Cardiacas", "cat": "Cardiologia", "co": 215.76, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Creatinina", "p": 150, "te": "8 (dias)", "ay": null, "ind": "Recolectar orina de 24 horas en un recipiente limpio, iniciar la recolección por la mañana eliminando la primera orina de la mañana y terminando al dia siguiente a la misma hora.", "sin": "Creatinina Ureica", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 46.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cultivo de Expectoracion por Bacterias Aerobias y/o Hongos", "p": 350, "te": "4 (dias)", "ay": 4, "ind": "No realizar aseo bucal, no tomar antibióticos 5 días antes del estudio", "sin": "Cultivo de esputo", "cat": "Infectologia", "co": 197.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cultivo Faringeo", "p": 600, "te": "4 (dias)", "ay": 4, "ind": "No realizar aseo bucal, no tomar antibióticos 5 días antes del estudio", "sin": "Cultivo de exudado faríngeo", "cat": "Infectologia", "co": 141.52, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cultivo secrecion otica", "p": 450, "te": null, "ay": null, "ind": "No requiere indicación especial", "sin": "", "cat": "Infectologia", "co": 288.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Cultivo Vaginal", "p": 500, "te": "4 (dias)", "ay": null, "ind": "Abstinencia sexual 3 días. sin ducha vaginal.", "sin": "Cultivo de exudado cérvico vaginal", "cat": "Ginecologia,Embarazo", "co": 203, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Curva de Tolerancia a la Glucosa de 2 horas", "p": 1200, "te": "1 (dias)", "ay": 8, "ind": "Importante contar con receta para indicaciones de tiempos y carga de glucosa", "sin": "Curva de tolerancia a la glucosa (2 horas)", "cat": "Ginecologia,Embarazo,Nutricion", "co": 125.81, "ch": 411.41, "mo": 756, "sw": 570, "ts": 1284},
{"n": "Curva de Tolerancia a la Glucosa de 3 horas", "p": 2000, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Curva de tolerancia a la glucosa (3 horas)", "cat": "Ginecologia,Embarazo,Nutricion", "co": 204.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Dehidroepiandrosterona (DHEA)", "p": 500, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "DHEA", "cat": "Ginecologia,Dermatologia", "co": 232, "ch": 961.41, "mo": 1028.7, "sw": 990, "ts": 459.82},
{"n": "Dehidroepiandrosterona Sulfato (SDHEA)", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "SDHEA, sdhea Dehidroepiandro, dehidro", "cat": "Ginecologia,Dermatologia", "co": 216.92, "ch": 891, "mo": 936.8, "sw": 873, "ts": 1112.65},
{"n": "Depuracion de Creatinina de 24 horas", "p": 800, "te": "1 (dias)", "ay": 8, "ind": "Recolectar orina de 24 horas.. Para muestra de sangre, ayuno de 8 horas", "sin": "Depuración de creatinina", "cat": "Urologia", "co": 69.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Deshidroenasa Lactica (DHL)", "p": 250, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "DHL", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 69.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Deteccion de Herpes Tipo I y Tipo II por PCR", "p": 2850, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PCR Detección de herpes simple tipo I y II", "cat": "Infectologia", "co": 2209.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Determinacion de Vitamina D (25-hidroxi)", "p": 700, "te": "2 (dias)", "ay": 8, "ind": "Suspender ingesta de alcohol y vitamínicos 24 hrs antes de la toma.", "sin": "Vitamina D, Niveles de Vitamina D, Vit D25", "cat": "Ginecologia,Embarazo", "co": 399.3, "ch": 730.41, "mo": 1345, "sw": 895, "ts": 1712},
{"n": "Digoxina", "p": 400, "te": "3 (dias)", "ay": 8, "ind": "Tomar muestra antes de la siguiente dosis.", "sin": "Vidaxil, Valvulan", "cat": "Toxicologia", "co": 266.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Dihidrotestosterona (DHT)", "p": 1400, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Dihidrotestosterona, DHT, 5α-DHT, 5α-Dihidrotestosterona", "cat": "Ginecologia", "co": 372.36, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Dimero D", "p": 1200, "te": "2 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Cardiologia", "co": 425.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Electroforesis de Proteinas Sericas", "p": 850, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Electroforesis de Proteinas", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 285.36, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Electrolitos Sericos (Sodio Potasio y Cloro)", "p": 500, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Electrolitos Sericos 3", "cat": "Gastroenterologia", "co": 111.36, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Electrolitos Sericos 6", "p": 700, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 292.32, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Electrolitos Urinarios al Azar", "p": 400, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de orina en un recipiente estéril", "sin": "Electrolitos Urinarios 3", "cat": "Urologia", "co": 135.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Espermocultivo", "p": 600, "te": "4 (dias)", "ay": null, "ind": "Muestra de semen en recipiente estéril con previo aseo.", "sin": "Cultivo de Esperma", "cat": "Urologia", "co": 235.48, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Estradiol", "p": 450, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Endocrinologia", "co": 163.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Estrogenos", "p": 350, "te": null, "ay": 4, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia", "co": 161.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Estrona", "p": 850, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "E1, Estrona en Suero, Estrona Serica", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 283.04, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Examen General de Orina", "p": 200, "te": "1 (dias)", "ay": null, "ind": "Primera orina de la mañana, desechar el primer chorro y recolectar en un recipiente estéril.", "sin": "EGO, General de orina, Uroanalisis", "cat": "Ginecologia,Embarazo,Gastroenterologia", "co": 41.76, "ch": 101.74, "mo": 195, "sw": 142, "ts": 150},
{"n": "Exámen Prenupcial (VDRL - Gpo Sanguineo y Factor RH)", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Prenupciales", "cat": "Ginecologia,Embarazo", "co": 105.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Factor Reumatoide", "p": 300, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "FR", "cat": "Reumatologia", "co": 103.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Factor V Mutacion Leiden", "p": 2900, "te": null, "ay": null, "ind": "No requiere indicación especial", "sin": "Mutacion factor V de leiden", "cat": "Hematologia", "co": 1381.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Fenobarbital", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "Tomar muestra antes de la siguiente dosis.", "sin": "", "cat": "Toxicologia", "co": 242.44, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Ferritina", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ferritina Serica", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 267.96, "ch": 327.25, "mo": 855, "sw": 797, "ts": 1964.68},
{"n": "Fibrinogeno", "p": 350, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "FB, Fib", "cat": "Endocrinologia", "co": 185.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Filtrado Glomerular", "p": 200, "te": "1 (dias)", "ay": 8, "ind": "Indicar edad, peso, estatura y sexo del paciente", "sin": "TEFG", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 145, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Fosforo Serico", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Fosforo en Suero, Fosforo en Sangre", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 52.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Fraccion Beta Cuantitativa (HGC/HCG)", "p": 700, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Hormona gonadotropina coriónica humana fracción beta, HGC Beta", "cat": "Ginecologia,Embarazo", "co": 208.8, "ch": 770, "mo": 820, "sw": 940, "ts": 1380.62},
{"n": "Frotis De Sangre Periferica", "p": 700, "te": "1 (dias)", "ay": 4, "ind": "No requiere indicación especial", "sin": "FSP, Tincion de Sangre", "cat": "Ginecologia,Embarazo,Cirugia", "co": 108.9, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Fructosamina", "p": 1000, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Fructosamina Serica, Fructosamina en Suero", "cat": "Nutricion", "co": 642.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Gen MTHFR", "p": 4000, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "PCR Mutación 677 C T en el gen de la MTHFR, , PCR Gen MTHFR, MTHFR", "cat": "Ginecologia", "co": 1339.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "GGT - Gamaglutamil Transpeptidasa", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Gammaglutamil Transferasa, GGT", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 59.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Globulina", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 84.7, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Globulina Fijadora de Hormona Sexual (SHBG)", "p": 1200, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Globulina Fijadora de Hormona Sexual, SHBG", "cat": "Endocrinologia", "co": 573.04, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Glucosa en Sangre", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Glucosa", "cat": "Ginecologia,Nutricion", "co": 41.76, "ch": 57.76, "mo": 110, "sw": 119, "ts": 231.26},
{"n": "Glucosa Postprandial", "p": 200, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Glucosa posprandial", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 47.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Grupo Sanguineo y Factor RH", "p": 150, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Gpo y RH, Grupo Sanguíneo y RH", "cat": "Ginecologia,Embarazo", "co": 46.4, "ch": 115, "mo": 220, "sw": 170, "ts": 696.14},
{"n": "Helicobacter pylori, prueba de aliento", "p": 4800, "te": null, "ay": 6, "ind": "No consumir antibióticos ni bismuto (p.ej. Pepto-Bismol®) al menos durante un mes previo a la prueba. • No consumir medicamentos inhibidores de la bomba de protones como Lanzoprazol, Omeprazol, Esomeprazol, Pantoprazol al menos 7 días antes de la prueba. • No consumir medicamentos bloqueadores H2 como Ranitidina, Tagamet, Zantac, Pepcid, entre otros, al menos 24 hrs previo a la prueba.", "sin": "Ureasa, carbono 14", "cat": "Gastroenterologia", "co": 1671.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hemoglobina Glicosilada A1C", "p": 350, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "HbA1c, Hemoglobina glucosilada", "cat": "Ginecologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 142.68, "ch": 217.26, "mo": 390, "sw": 444, "ts": 635.47},
{"n": "Hepatitis A - IgG", "p": 800, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Anticuerpos Hepatitis A IgG", "cat": "Ginecologia,Embarazo,Cirugia", "co": 330, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hepatitis B - Anticuerpos Anti Ag E Hepatitis B", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ag E Hepatitis B", "cat": "Ginecologia,Embarazo,Cirugia", "co": 298.12, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hepatitis B - Anticuerpos Anti Ag S Hepatitis B", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ag S Hepatitis B", "cat": "Ginecologia,Embarazo,Cirugia", "co": 341, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hepatitis B - Antigeno de superficie de Virus", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Antígeno de Superficie de la Hepatitis B", "cat": "Ginecologia,Embarazo,Cirugia", "co": 319, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "HEPATITIS B Y C MARCADORES", "p": 2500, "te": "4 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Hepatitis B y C marcadores", "cat": "Ginecologia,Embarazo,Cirugia", "co": 1409.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hepatitis C - Cualitativa del Virus", "p": 500, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Anticuerpos Hepatitis C", "cat": "Ginecologia,Embarazo,Cirugia", "co": 255.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hierro Serico", "p": 300, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Hierro", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 104.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Histoplasma IgG IgM", "p": 1350, "te": "9 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Histoplasma Capsulatum IgM", "cat": "Infectologia", "co": 872.32, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "HOMA", "p": 450, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Resistencia a la insulina por índice HOMA, Indice Homa", "cat": "Ginecologia,Dermatologia,Endocrinologia", "co": 214.6, "ch": 398.75, "mo": 415, "sw": 474, "ts": 1188},
{"n": "Homocisteina", "p": 900, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Endocrinología", "cat": "Endocrinologia", "co": 419.92, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hormona Adrenocorticotrofica (ACTH)", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "ACTH, Hormona Adrenocorticotrófica, Adrenocorticotrófica en Plasma", "cat": "Endocrinologia", "co": 325.96, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hormona Antimulleriana", "p": 2700, "te": "5 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Hormona anti muleriana AMH/MIS", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 1431.44, "ch": 3027.75, "mo": 3395, "sw": 3182, "ts": 4390.52},
{"n": "Hormona del Crecimiento (HGH)", "p": 300, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Human growth hormone, Hormona del Crecimiento, HGH", "cat": "Endocrinologia", "co": 181.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hormona Foliculo Estimulante (FSH)", "p": 350, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "FSH", "cat": "Endocrinologia", "co": 127.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hormona Luteinizante (LH)", "p": 450, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "HL, LH", "cat": "Endocrinologia", "co": 122.96, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Hormona Paratohormona (PTH)", "p": 850, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PTH, Paratohormona", "cat": "Endocrinologia", "co": 458.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "IgF BP-3", "p": 1200, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "IgF BP3", "cat": "Endocrinologia", "co": 660, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Indice de Saturacion de Transferrina %", "p": 200, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "% de Saturación de Transferrina", "cat": "Endocrinologia", "co": 165, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "INMUNOGLOBULINA G", "p": 2500, "te": "4 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Inmunoglobulina G", "cat": "Infectologia", "co": 2002, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Inmunoglobulina IgE (IgE Serica)", "p": 350, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Inmunoglobulina E", "cat": "Infectologia", "co": 247.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Inmunoglobulina IgG", "p": 2500, "te": "4 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Inmunoglobulina G", "cat": "Infectologia", "co": 2002, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Inmunoglobulinas A Subclase IgA", "p": 2000, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "IgA Subclase", "cat": "Infectologia", "co": 997.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "INR (Indice Inter Normalizacion)", "p": 300, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "INR", "cat": "Endocrinologia,Nutricion,Cardiologia", "co": 236.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Insulina basal y posprandial", "p": 700, "te": "8 (dias)", "ay": 8, "ind": "Importante contar con receta para indicaciones de tiempos y carga de glucosa", "sin": "Insulina basal y post-prandial", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 259.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Insulina Serica", "p": 450, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Insulina, Insulina en Suero", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 161.24, "ch": 279.94, "mo": 275, "sw": 351, "ts": 831.34},
{"n": "Interleucina 6", "p": 4200, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "IL6", "cat": "Reumatologia", "co": 1132.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "KOH", "p": 350, "te": "1 (dias)", "ay": null, "ind": "Sin tratamientos, sin lavarse manos, pies, piel, cabellos, que sean partes afectadas, sin antimicoticos de aplicación local", "sin": "Búsqueda de estructuras fúngicas", "cat": "Infectologia", "co": 9.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Levetiracetam (KEPPRA)", "p": 3300, "te": "10 (dias)", "ay": 8, "ind": "Realizar la toma 1 hora antes de la siguiente dosis", "sin": "Levetiracetam, Keppra, Prospecto Keppra", "cat": "Neurologia", "co": 1881, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Lipasa en Sangre", "p": 250, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Lipasa, Lipasa Sérica, Lipasa en Suero", "cat": "Gastroenterologia", "co": 121, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Litio", "p": 700, "te": null, "ay": 8, "ind": "Indicar fecha y hora de última dosis", "sin": "", "cat": "", "co": 264.48, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Magnesio Serico", "p": 200, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Magnesio, Mg", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 82.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Mercurio en Sangre", "p": 1000, "te": "9 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Mercurio, Hg en Sangre", "cat": "Toxicologia,Neurologia,Interna", "co": 450.08, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Metanfetaminas", "p": 363, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de orina en un recipiente estéril, necesita ser custodiado por personal de salud.", "sin": "Metanfetaminas en Orina", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 138.04, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Microalbumina en orinal ocasional", "p": 400, "te": null, "ay": null, "ind": "No requiere indicación especial", "sin": "Albumina en orina, albuminuria", "cat": "Ginecologia,Urologia", "co": 206.48, "ch": 266.75, "mo": 594, "sw": 281, "ts": 918.75},
{"n": "Mioglobina", "p": 1300, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Mioglobina en Sangre, Mioglobina Sérica, Mioglobina en Suero", "cat": "Cardiologia", "co": 519.68, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Mutacion G20210A Factor II", "p": 5600, "te": null, "ay": null, "ind": "No requiere indicación especial", "sin": "Gen de protombina", "cat": "Hematologia", "co": 2723.68, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Nitrogeno de la Urea", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Nitrógeno Ureico Serico, BUN", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 46.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Opiaceos", "p": 363, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de orina en un recipiente estéril, necesita ser custodiado por personal de salud.", "sin": "", "cat": "Toxicologia", "co": 62.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Osmolaridad Serica", "p": 250, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Osmolaridad en Suero", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 55.68, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Osmolaridad Urinaria", "p": 250, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de orina en un recipiente estéril", "sin": "Osmolaridad en Orina", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 127.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Oxalato en orina de 24 horas", "p": 1700, "te": null, "ay": null, "ind": "Recolectar orina de 24 horas.", "sin": "Acido oxalico en orina de 24 horas", "cat": "Ginecologia,Embarazo,Nutricion", "co": 827.08, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Panel Respiratorio 16 Virus PCR", "p": 6000, "te": "NA", "ay": null, "ind": "Importante 30 minutos antes no realizar aseo bucal, no ingerir alimentos, liquidos, mascar chicles, fumar o algun tipo de spray bucal o cremas labiales", "sin": "PCR Panel viral respiratorio (16 virus)", "cat": "Respiratorio/Viral", "co": 3700.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Panel Respiratorio Molecular 1 - PCR", "p": 13000, "te": "NA", "ay": null, "ind": "Importante 30 minutos antes no realizar aseo bucal, no ingerir alimentos, liquidos, mascar chicles, fumar o algun tipo de spray bucal o cremas labiales", "sin": "FilmArray Panel Respiratorio", "cat": "Respiratorio/Viral", "co": 8505.12, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Panel Viral Respitario - Triple Viral (COVID19 / Virus Sincitial / Antigeno de Influenza A y B)", "p": 2600, "te": "6 (dias)", "ay": null, "ind": "No requiere indicación especial", "sin": "Panel Viral Respiratorio Triple Viral", "cat": "Respiratorio/Viral", "co": 1980, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Parathormona Intacta", "p": 1000, "te": "10 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Parathormona, PTH rP", "cat": "Endocrinologia", "co": 470.96, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "PCR COVID19", "p": 2000, "te": "1 (dias)", "ay": null, "ind": "Importante 30 minutos antes no realizar aseo bucal, no ingerir alimentos, liquidos, mascar chicles, fumar o algun tipo de spray bucal o cremas labiales", "sin": "PCR SARS-CoV-2, COVID 19 PCR", "cat": "Respiratorio/Viral", "co": 638, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "PCR GeneXpert® Mycobacterium tuberculosis/Resistencia a Rifampicina", "p": 9500, "te": null, "ay": null, "ind": "La muestra no requiere ayuno, es una muestra de saliva vía expectoración, y se requiere un volumen de 5 ML de saliva para recolectar. Te comparto además indicaciones adicionales:   1. El estudio está indicado para pacientes que no hayan recibido tratamiento antituberculosis o que hayan recibido menos de 3 días de tratamiento en los últimos 6 meses. 2. Los pacientes deben toser profundamente para expectorar el esputo directamente en el contenedor. 3. Enjuagar la boca con agua (no cepillar) previo a la toma.", "sin": "GeneXpert MTB/RIF", "cat": "Respiratorio/Viral", "co": 4760.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "PCR Influenza Estacionaria A & B", "p": 2100, "te": "2 (dias)", "ay": null, "ind": "Importante 30 minutos antes no realizar aseo bucal, no ingerir alimentos, liquidos, mascar chicles, fumar o algun tipo de spray bucal o cremas labiales", "sin": "PCR detección de Influenza (A/B)", "cat": "Infectologia", "co": 1503.36, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "PCR Panel Respiratorio Completo (viral y bacteriano)", "p": 6500, "te": null, "ay": null, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 3312.96, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "PCR Panel viral respiratorio (16 virus)", "p": 6000, "te": null, "ay": null, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 3884.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "PCR Virus de Papiloma Humano en Orina", "p": 2000, "te": "2 (dias)", "ay": null, "ind": "Recolectar una muestra de orina en un recipiente estéril, abstinencia sexual de 2 días.", "sin": "PCR Virus del Papiloma Humano alto riesgo, VPH-RT", "cat": "Ginecologia,Urologia", "co": 1161.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Peptido C", "p": 700, "te": null, "ay": 4, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo,Nutricion", "co": 313.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Antidoping 5 Elementos", "p": 800, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de orina en un recipiente estéril, necesita ser custodiado por personal de salud.", "sin": "Anti-doping V", "cat": "Toxicologia", "co": 467.48, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Bioquimico 18 Elementos", "p": 600, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PB18, QS18, Química Sanguínea 18", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 395.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Bioquimico 24 Elementos", "p": 900, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PB24, Perfil Bioquimico 24, QS 24", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 345.68, "ch": 706, "mo": 1035, "sw": 921, "ts": 787},
{"n": "Perfil Bioquimico 35 Elementos", "p": 1300, "te": "12 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PB35, QS35, Química Sanguínea 35", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 502.28, "ch": 723.25, "mo": null, "sw": 964, "ts": null},
{"n": "Perfil Bioquimico 44 Elementos", "p": 1600, "te": "2 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PB44, QS44, Química Sanguínea 44", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 607.84, "ch": 734.25, "mo": null, "sw": null, "ts": 2247.2},
{"n": "Perfil Coprológico", "p": 550, "te": "8 (dias)", "ay": null, "ind": "No requiere indicación especial", "sin": "", "cat": "Gastroenterologia", "co": 165, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Core IgG, IgM", "p": 1100, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 616, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil de Hierro", "p": 1000, "te": "2 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Perfil de Hierro III", "cat": "Endocrinologia", "co": 481.4, "ch": 2248.95, "mo": 1415, "sw": 1163, "ts": 3054.65},
{"n": "Perfil de Insulina 4 Tomas (0-30-60-120 min)", "p": 1500, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Curva de insulina 4 tomas", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 629.88, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil de Insulina 5 Tomas (0-30-60-120-180 min)", "p": 2500, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Curva de insulina 5 tomas", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 1375, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil de Insulina de 2 Tomas (0-60 min)", "p": 800, "te": "8 (dias)", "ay": 8, "ind": "Importante contar con receta para indicaciones de tiempos y carga de glucosa", "sin": "Curva de insulina 2 tomas", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 259.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil de Insulina de 3 Tomas (0-60-120 min)", "p": 1300, "te": "8 (dias)", "ay": 8, "ind": "Importante contar con receta para indicaciones de tiempos y carga de glucosa", "sin": "Curva de insulina 3 tomas", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 472, "ch": 417.45, "mo": 675, "sw": 1492, "ts": 2191.16},
{"n": "Perfil de Insulina Postprandial", "p": 600, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Insulina basal y post-prandial", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 234.32, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil de Lipidos", "p": 800, "te": "1 (dias)", "ay": 12, "ind": "No requiere indicación especial", "sin": "Perfil de Lípidos completos", "cat": "Ginecologia,Dermatologia,Nutricion,Endocrinologia", "co": 273.83, "ch": 360.25, "mo": 945, "sw": 713, "ts": 1155.41},
{"n": "Perfil de transmision sexual (ITS) por PCR", "p": 4900, "te": null, "ay": null, "ind": "No orinar al menos 2 hrs antes de la toma; de preferencia enviar la primera micción de la mañana", "sin": "Perfil sexual, Perfil infeccioso ITS, STI", "cat": "Ginecologia,Urologia", "co": 2630.88, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil ENA (Anti RNP / Anti Smith / Anti SS-A (Anti Ro) / Anti SS-B (Anti La))", "p": 1650, "te": "4 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti ENA IgG", "cat": "Reumatologia", "co": 1210, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Ginecologico II", "p": 1750, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 538.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Hepatico", "p": 800, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Dermatologia,Endocrinologia", "co": 251.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Hormonal Femenino Completo", "p": 1100, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PHF, Hormonal Femenino", "cat": "Ginecologia,Embarazo,Dermatologia,Endocrinologia", "co": 428.04, "ch": 2706, "mo": 1995, "sw": 2335, "ts": 3985.81},
{"n": "Perfil Hormonal Masculino", "p": 1400, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Urologia", "co": 880.44, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Inmunoglobulinas IgA/IgE/IgG/IgM", "p": 900, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Perfil de Inmunoglobulinas", "cat": "Infectologia", "co": 557.96, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Prostatico (PSA, AP Libre, Fraccion Prostatica, Fosfatasa Acida Total)", "p": 1000, "te": "2 (dias)", "ay": 8, "ind": "No andar en bicicleta, montar a caballo o examen digital al menos 24 horas antes del estudio,", "sin": "Perfil Prostatico", "cat": "Urologia", "co": 541.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Reumatoide", "p": 500, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Perfil Reumatico", "cat": "Reumatologia", "co": 385, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Subpoblacion de Linfocitos CD19/CD8/CD4/CD3", "p": 4950, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "linfocitos T B y NK subpoblacion", "cat": "", "co": 2847.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Testosterona (Total + Libre)", "p": 1000, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "Testosterona Libre y Total", "cat": "Urologia", "co": 328.28, "ch": 1520.75, "mo": 1315, "sw": null, "ts": 2317.55},
{"n": "Perfil Tiroideo con Anti Tiroideos", "p": 1800, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 481.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Perfil Tiroideo con TSH", "p": 800, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Perfil Tiroideo", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 379.32, "ch": 605, "mo": 1025, "sw": 759, "ts": 1040},
{"n": "Perfil Torch IgG / IgM", "p": 4000, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "Perfil Torch IgG, IgM", "cat": "Infectologia", "co": 1641.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Plomo en sangre", "p": 800, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "Plomo, Plomo en Suero", "cat": "Toxicologia", "co": 451.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Potasio en Orina de 4 horas", "p": 200, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de orina en un recipiente estéril", "sin": "Potasio Urinario", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 40.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prealbumina", "p": 800, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "PAB", "cat": "Cardiologia", "co": 555.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Pro BNP", "p": 2500, "te": "6 (dias)", "ay": 4, "ind": "No requiere indicación especial", "sin": "NT-pro BNP", "cat": "Cardiologia", "co": 1358.36, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Procalcitonina", "p": 1100, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Proca, Procalcitonina", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 418, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Progesterona", "p": 500, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo", "co": 127.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prolactina", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Prolactina Serica", "cat": "Ginecologia,Endocrinologia", "co": 147.32, "ch": 483.45, "mo": 520, "sw": 702, "ts": 1027.37},
{"n": "Prolactina Basal", "p": 450, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo", "co": 135.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prolactina Post", "p": 450, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo", "co": 132.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Proteina C Reactiva", "p": 250, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PCR", "cat": "Ginecologia,Gastroenterologia,Endocrinologia", "co": 125.81, "ch": 176, "mo": 356, "sw": 370, "ts": null},
{"n": "Proteina C Reactiva Ultra Sensibilidad", "p": 700, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "PCR Ultra sensible", "cat": "Ginecologia,Gastroenterologia,Endocrinologia", "co": 314.36, "ch": 554.96, "mo": 1197, "sw": 370, "ts": 1517.71},
{"n": "Proteinas Totales en Orina de 24 Hrs", "p": 450, "te": "1 (dias)", "ay": null, "ind": "Recolectar orina de 24 horas en un recipiente limpio, iniciar la recolección por la mañana eliminando la primera orina de la mañana y terminando al dia siguiente a la misma hora.", "sin": "Proteínas Totales Urinarias", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 58, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Proteinas Totales sericas", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Proteínas totales séricas, Proteínas Totales en Suero", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 45.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba de Anticuerpos Espícula-1 / Nucleocápside (Post Vacuna)", "p": 850, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. Anti Nucleosoma", "cat": "Respiratorio/Viral", "co": 446.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba de Embarazo", "p": 400, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Prueba inmunológica de embarazo, PIE", "cat": "Ginecologia,Embarazo", "co": 56.84, "ch": 235.96, "mo": 253, "sw": 511, "ts": 878.33},
{"n": "Prueba de Embarazo (Confirmacion y Tiempo de Embarazo)", "p": 450, "te": "8 (dias)", "ay": 4, "ind": "No requiere indicación especial", "sin": "Prueba inmunológica de embarazo, PIE", "cat": "Ginecologia,Embarazo", "co": 62.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba O'Sullivan", "p": 900, "te": "2 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Curva de Tolerancia a la glucosa 1 Hora", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Gastroenterologia,Endocrinologia", "co": 170, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba PCR Saliva COVID 19", "p": 450, "te": null, "ay": 0.5, "ind": "Importante 30 minutos antes no realizar aseo bucal, no ingerir alimentos, liquidos, mascar chicles, fumar o algun tipo de spray bucal o cremas labiales", "sin": "PCR COVID en saliva", "cat": "Respiratorio/Viral", "co": 350.32, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba Rapida Antigeno Estreptococo Beta Hemolitico Grupo A", "p": 750, "te": "1 (dias)", "ay": null, "ind": "No requiere indicación especial", "sin": "Prueba Rapida Estreptococo Beta Hemolitico Grupo A, Antigeno Estreptococo Beta Hemolitico Grupo A, Estreptococo Beta Hemolitico Grupo A", "cat": "Respiratorio/Viral", "co": 300, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba Rapida de Anticuerpos COVID19 IgG/IgM", "p": 650, "te": "1 (dias)", "ay": null, "ind": "No requiere indicación especial", "sin": "Anticuerpos COVID 19, Prueba rápida de anticuerpos COVID 19", "cat": "Respiratorio/Viral", "co": 440, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba Rapida de Antigeno COVID19", "p": 900, "te": "4 (dias)", "ay": null, "ind": "No requiere indicación especial", "sin": "Prueba rapida de COVID 19, Antigeno para COVID 19, Antigeno Covid", "cat": "Respiratorio/Viral", "co": 464, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba Rapida de Antigeno del Virus Sincitial Respiratorio", "p": 2200, "te": "NA", "ay": null, "ind": "No requiere indicación especial", "sin": "Antigeno del Virus Sincitial, Prueba Rapida Virus Sincitial", "cat": "Infectologia", "co": 863.04, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Prueba Rapida Para Influenza A & B (Estacional)", "p": 800, "te": "4 (dias)", "ay": null, "ind": "No requiere indicación especial", "sin": "Prueba Rapida Influenza, INFA Prueba rapida, Antigeno Influenza A y B", "cat": "Infectologia", "co": 522, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Péptido Natriurético B (BNP)", "p": 1100, "te": "12 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "BNP", "cat": "Cardiologia", "co": 631.04, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Quantiferon TB Gold Plus", "p": 4300, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Quantiferon", "cat": "Infectologia", "co": 1532.36, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Quimica Sanguinea 12 Elementos", "p": 850, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "QS12, PB12, Perfil Bioquímico 12", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 277.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Quimica Sanguinea 3 elementos", "p": 350, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "QS3", "cat": "Ginecologia,Embarazo,Gastroenterologia", "co": 89.32, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Quimica sanguinea 38 elementos", "p": 1700, "te": null, "ay": 8, "ind": "No requiere indicación especial", "sin": "PB28, QS38, Perfil Bioquímico 38", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 582.32, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Quimica Sanguinea 5 Elementos", "p": 400, "te": "NA", "ay": 8, "ind": "No requiere indicación especial", "sin": "QS5, Quimica sanguinea 5", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 143.84, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Quimica Sanguinea 50 elementos", "p": 2400, "te": null, "ay": 12, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Nutricion,Endocrinologia", "co": 870, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Quimica Sanguinea 6 Elementos (Con Colesterol)", "p": 400, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "QS6, Quimica sanguinea 6", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 112.52, "ch": 321.75, "mo": 510, "sw": 384, "ts": 604.77},
{"n": "Rast de Alergenos Alimenticios 36", "p": 4000, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Rast de alergenos 36 alimentos, Perfil de alergias 36 alimentos", "cat": "Nutricion", "co": 3630, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Rast de Alergenos Inhalatorios 36", "p": 3700, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Rast de alergenos 36 inhalatorio, Perfil de alergias inhalatorio 36", "cat": "Nutricion", "co": 2942.5, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Reacciones Febriles", "p": 350, "te": "1 (dias)", "ay": 4, "ind": "No requiere indicación especial", "sin": "Rx feb", "cat": "Infectologia", "co": 108.46, "ch": 198, "mo": 297, "sw": 284, "ts": 407.08},
{"n": "Reticulocitos", "p": 200, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Recuento de reticulocitos, conteo de reticulocitos", "cat": "Ginecologia,Embarazo,Cirugia", "co": 48.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Sangre Oculta en Heces", "p": 250, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de materia fecal del tamaño de una nuez en un recipiente estéril.", "sin": "Guayaco", "cat": "Gastroenterologia", "co": 99.76, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Sangre Oculta en Heces (FIT)", "p": 500, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de materia fecal del tamaño de una nuez en un recipiente estéril. No recolectar en los siguientes casos: Tiene hemorroides, sangre en orina, esta en su periodo o lo tuvo en sus ultimos 3 dias o lo esta esperando o si tiene cortes en las manos que estan sangrando.", "sin": "FIT", "cat": "Gastroenterologia", "co": 149.64, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Serotonina en suero", "p": 1050, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Serotonina, Serotonina Sérica", "cat": "Endocrinologia", "co": 756.32, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Skin Care", "p": 2950, "te": "10 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": null, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Sodio en Orina al Azar", "p": 150, "te": "1 (dias)", "ay": null, "ind": "Recolectar una muestra de orina en un recipiente estéril", "sin": "Sodio Urinario, Sodio en orina, Na Urinario", "cat": "Ginecologia,Urologia", "co": 88, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Sodio Serico", "p": 200, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Sodio, Sodio en Sangre, Sodio en Suero, Na Serico", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 48.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Somatomedina C (IGF-I)", "p": 700, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "IGF-I, Somatomedina C", "cat": "Endocrinologia", "co": 401.36, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Subclases IgG", "p": 3000, "te": null, "ay": 4, "ind": "No requiere indicación especial", "sin": "", "cat": "Infectologia", "co": 1603.12, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "T3 Captacion", "p": 2000, "te": "9 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Piruvato", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 1430, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "T3 Libre", "p": 250, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Triyodotironina libre, FT3, T3 libre, Free T3", "cat": "Endocrinologia", "co": 110.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "T3 Reversa", "p": 2200, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Triyodotironina reversa", "cat": "Endocrinologia", "co": 1441.88, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "T4 Libre", "p": 300, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "T4 free", "cat": "Endocrinologia", "co": 155.44, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "T4 Total", "p": 300, "te": null, "ay": 4, "ind": "No requiere indicación especial", "sin": "", "cat": "", "co": 129.92, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Tamizaje Primer Trimestre Embarazo (Alfafetoproteinas, Fraccion Beta Libre, Estriol)", "p": 750, "te": "9 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Tamiz embarazo primer trimestre", "cat": "Ginecologia,Embarazo", "co": 561, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Testosterona Biodisponible", "p": 900, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Testosterona Biodisponoble", "cat": "Urologia", "co": 464.2, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Testosterona Libre", "p": 450, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Dermatologia,Endocrinologia", "co": 275, "ch": 862.95, "mo": null, "sw": 678, "ts": null},
{"n": "Testosterona Total", "p": 600, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Dermatologia,Endocrinologia", "co": 161.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "TGO- ASPARTATO AMINO TRANSFERASA", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "ALAT, Transaminasa Glutamico Piruvica", "cat": "Ginecologia,Embarazo,Nutricion", "co": 82.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "TGP - ALANINA AMINO TRANSFERASA", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "ASAT, Transaminasa Glutamico Oxalacetica", "cat": "Ginecologia,Embarazo,Nutricion", "co": 82.8, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Tiempo de Coagulacion", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "TC, tc", "cat": "Hematologia", "co": 57.42, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Tiempo de Protombina (TP)", "p": 250, "te": "8 (dias)", "ay": 4, "ind": "No requiere indicación especial", "sin": "TP, tp", "cat": "Ginecologia", "co": 91.64, "ch": 140.26, "mo": 325, "sw": 265, "ts": 306.85},
{"n": "Tiempo de Sangrado y Coagulación", "p": 300, "te": "1 (dias)", "ay": null, "ind": "No requiere indicación especial", "sin": "TS y TC, tiempos de sangrado y tiempo de coagulacion", "cat": "Hematologia", "co": 127.6, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Tiempo de Trombina (TT)", "p": 250, "te": "3 (dias)", "ay": 4, "ind": "No requiere indicación especial", "sin": "TT, tt", "cat": "Ginecologia,Embarazo,Cirugia", "co": 88.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Tiempo de Tromboplastina Parcial (TTP)", "p": 350, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "INR", "cat": "Cardiologia", "co": 97.44, "ch": 140.26, "mo": 325, "sw": 195, "ts": 659.1},
{"n": "Tiroglobulina", "p": 600, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Tiroglobulina Sérica, Tiroglobulina en Suero", "cat": "Endocrinologia", "co": 251.72, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "TRANSFERRINA", "p": 400, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 154.28, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Trigliceridos", "p": 150, "te": "1 (dias)", "ay": 14, "ind": "No requiere indicación especial", "sin": "tgl", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 57.42, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Troponina I Ultrasensible", "p": 900, "te": "3 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Cardiologia", "co": 550, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Troponina T", "p": 1200, "te": "7 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Cardiologia", "co": 880, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "TSH (Hormona Estimulante Tiroides)", "p": 300, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "TSH", "cat": "Ginecologia", "co": 128.76, "ch": 423.49, "mo": 568, "sw": 512, "ts": 751.32},
{"n": "Urea Serica", "p": 150, "te": "1 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Urea en suero", "cat": "Gastroenterologia", "co": 35.96, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Urocultivo", "p": 450, "te": "4 (dias)", "ay": null, "ind": "Recolectar el 2do chorro de orina matutina con previo aseo en recipiente estéril.", "sin": "Cultivo de orina", "cat": "Ginecologia,Embarazo", "co": 179.8, "ch": 229.9, "mo": 585, "sw": 339.44, "ts": 520},
{"n": "VDRL", "p": 200, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "", "cat": "Ginecologia,Embarazo", "co": 69.6, "ch": 147.4, "mo": 255, "sw": 208, "ts": 303.38},
{"n": "Velocidad de Sedimentacion Globular (VSG)", "p": 200, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "VSG", "cat": "Ginecologia", "co": 64.96, "ch": 104.49, "mo": 120, "sw": 170, "ts": 298.81},
{"n": "VIH 1 Cuantitativa por PCR", "p": 5200, "te": "10 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "HIV I por PCR, HIV 1 Por PCR, HIV cuantitativo", "cat": "Infectologia", "co": 2272.44, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "VIH 1 y 2 Cualitativo (Anticuerpos)", "p": 500, "te": "6 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Ac. HIV 1 y 2, Anticuerpos de HIV 1 y 2, HIV 1 y 2 cualitativo", "cat": "Ginecologia,Embarazo", "co": 174, "ch": 592.9, "mo": 795, "sw": 730, "ts": 1280.79},
{"n": "Vitamina A (Retinol)", "p": 1500, "te": "10 (dias)", "ay": 8, "ind": "No ingerir multivitaminicos antes de la toma de muestra", "sin": "Vit. A, Retinol, Vitamina A", "cat": "Ginecologia,Embarazo,Nutricion", "co": 1078, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Vitamina B1", "p": 1300, "te": "NA", "ay": 8, "ind": "No ingerir multivitaminicos antes de la toma de muestra", "sin": "Vit B1, Tiamina", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 2309.56, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Vitamina B12", "p": 1000, "te": "3 (dias)", "ay": 8, "ind": "No ingerir multivitaminicos antes de la toma de muestra", "sin": "Vit B12, Vitamina B-12", "cat": "Gastroenterologia", "co": 242, "ch": 1012.01, "mo": 1295, "sw": 1158, "ts": 963.18},
{"n": "Vitamina B6", "p": 2800, "te": "12 (dias)", "ay": 8, "ind": "No ingerir multivitaminicos antes de la toma de muestra", "sin": "Vit B6, Piridoxina", "cat": "Ginecologia,Embarazo,Dermatologia,Nutricion,Endocrinologia", "co": 1944.16, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Vitamina C (Ácido ascórbico)", "p": 2600, "te": "17 (dias)", "ay": 8, "ind": "No ingerir multivitaminicos antes de la toma de muestra", "sin": "Vit. C, Acido Ascórbico", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 1243, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Vitamina D 25 Hidroxicalciferol (Total-D2-D3)", "p": 1700, "te": "10 (dias)", "ay": 8, "ind": "No ingerir multivitaminicos antes de la toma de muestra", "sin": "Vit D25,  25-OH-D, 25-hidroxi vitamina D", "cat": "Ginecologia,Dermatologia,Nutricion,Endocrinologia", "co": 950, "ch": null, "mo": 1290, "sw": 1215, "ts": 917.17},
{"n": "Vitamina E (Alfa tocoferol)", "p": 1300, "te": "17 (dias)", "ay": 8, "ind": "No ingerir multivitaminicos antes de la toma de muestra", "sin": "Vit. E, Alfa Tocoferol, Tocoferol", "cat": "Ginecologia,Embarazo,Nutricion,Gastroenterologia,Dermatologia,Endocrinologia", "co": 857.24, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Zinc En Sangre", "p": 900, "te": "8 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Zinc", "cat": "Toxicologia", "co": 473.28, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Sarampion IgG", "p": 1000, "te": "2 (dias)", "ay": 8, "ind": "No requiere indicación especial", "sin": "Sarampion", "cat": null, "co": 360.76, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Anticuerpos Anti Fosfolipidos IgG, IgM", "p": 1700, "te": "1 (dias)", "ay": 8, "ind": "Proceso los miércoles y sábado", "sin": "Fosfolipidos", "cat": null, "co": 684.4, "ch": null, "mo": null, "sw": null, "ts": null},
{"n": "Quantose RI", "p": 3700, "te": "15 (dias)", "ay": 8, "ind": "Se requiere peso y talla de paciente", "sin": "", "cat": "", "co": 1787.56, "ch": null, "mo": null, "sw": null, "ts": null} 
];

const STUDIES = []; const seen = new Set();
for (const s of STUDIES_RAW) { if (!seen.has(s.n)) { seen.add(s.n); STUDIES.push(s); } }
 
function parseTe(te) { if (!te) return null; const m = te.match(/(\d+)/); return m ? parseInt(m[1]) : null; }
function roundTo50(v) { return Math.round(v / 50) * 50; }
function fmt(n) { return "$" + Number(n).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
 
const C = { purple: "#280C4C", purpleLight: "#7535CA", orange: "#FC7A1D", teal: "#00EBD5", orangeDark: "#954003" };
const font = "'Montserrat', sans-serif";
 
export default function App() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [isSocio, setIsSocio] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showInd, setShowInd] = useState(false);
  const [catFilter, setCatFilter] = useState("Todas");
 
  const categories = useMemo(() => {
    const cats = new Set();
    STUDIES.forEach(s => { if (s.cat) s.cat.split(",").forEach(c => cats.add(c.trim())); });
    return ["Todas", ...Array.from(cats).filter(Boolean).sort()];
  }, []);
 
  const filtered = useMemo(() => {
    const q = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return STUDIES.filter(s => {
      const cm = catFilter === "Todas" || (s.cat && s.cat.includes(catFilter));
      if (!cm) return false;
      if (!q) return true;
      const n = (s.n || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const sy = (s.sin || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return n.includes(q) || sy.includes(q);
    });
  }, [search, catFilter]);
 
  const add = (s) => { if (!selected.find(x => x.n === s.n)) setSelected([...selected, s]); };
  const rem = (n) => setSelected(selected.filter(s => s.n !== n));
 
  const subtotal = selected.reduce((s, x) => s + x.p, 0);
  const totalCost = selected.reduce((s, x) => s + (x.co || 0), 0);
  const compTotal = selected.reduce((s, x) => {
    const pp = [x.ch, x.mo, x.sw, x.ts].filter(p => p && p > 0);
    return pp.length === 0 ? s : s + pp.reduce((a, b) => a + b, 0) / pp.length;
  }, 0);
  const hasComp = selected.some(s => [s.ch, s.mo, s.sw, s.ts].some(p => p && p > 0));
  const totalDisc = roundTo50(subtotal * 0.85);
  const discount = subtotal - totalDisc;
  const final = isSocio ? totalDisc : subtotal;
  const margin = final > 0 ? ((final - totalCost) / final * 100) : 0;
  const profit = final - totalCost;
 
  const delSummary = useMemo(() => {
    if (!selected.length) return "";
    const tt = selected.map(s => ({ n: s.n, d: parseTe(s.te) })).filter(t => t.d !== null);
    if (!tt.length) return "Consultar";
    if (tt.every(t => t.d === tt[0].d)) return `${tt[0].d} día${tt[0].d !== 1 ? "s" : ""} para todos los estudios`;
    const mn = Math.min(...tt.map(t => t.d));
    const exc = tt.filter(t => t.d !== mn);
    if (exc.length <= 3) return `${mn} día${mn !== 1 ? "s" : ""} para la mayoría, excepto ${exc.map(e => `${e.n}: ${e.d} días`).join(", ")}`;
    return `Entre ${mn} y ${Math.max(...tt.map(t => t.d))} días`;
  }, [selected]);
 
  const specInd = useMemo(() => selected.filter(s => s.ind && !s.ind.includes("No requiere") && s.ind.trim()), [selected]);
  const maxAy = useMemo(() => { const a = selected.map(s => s.ay).filter(a => a > 0); return a.length ? Math.max(...a) : 0; }, [selected]);
 
  return (
    <div style={{ fontFamily: font, background: "#f7f5fa", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
 
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleLight} 100%)`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>lab</span>
        <span style={{ fontSize: 24, fontWeight: 800, color: C.orange, letterSpacing: -0.5, marginLeft: -8 }}>box</span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 500, marginLeft: 4 }}>Cotizador Interno</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ color: "#fff", fontSize: 12, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontWeight: 500 }}>
            <div onClick={() => setIsSocio(!isSocio)} style={{ width: 40, height: 22, borderRadius: 11, background: isSocio ? C.orange : "rgba(255,255,255,0.2)", position: "relative", transition: "all 0.2s", cursor: "pointer" }}>
              <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", position: "absolute", top: 3, left: isSocio ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </div>
            Médico Socio (-15%)
          </label>
        </div>
      </div>
 
      <div style={{ display: "flex", maxWidth: 1400, margin: "0 auto", minHeight: "calc(100vh - 50px)" }}>
        {/* Left */}
        <div style={{ flex: 1, padding: "14px 18px", overflowY: "auto", maxHeight: "calc(100vh - 50px)" }}>
          <input type="text" placeholder="Buscar estudios por nombre o sinónimo..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "2px solid #e0dce6", borderRadius: 8, fontSize: 13, background: "#fff", outline: "none", boxSizing: "border-box", fontFamily: font }}
            onFocus={e => e.target.style.borderColor = C.purpleLight} onBlur={e => e.target.style.borderColor = "#e0dce6"} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8, marginBottom: 10 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{ padding: "3px 10px", borderRadius: 12, border: "none", fontSize: 10, fontWeight: 600, cursor: "pointer", background: catFilter === c ? C.purple : "#ece8f2", color: catFilter === c ? "#fff" : C.purple, fontFamily: font }}>{c}</button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#aaa", marginBottom: 4 }}>{filtered.length} estudios</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {filtered.slice(0, 60).map(s => {
              const sel = selected.some(x => x.n === s.n);
              return (
                <div key={s.n} onClick={() => !sel && add(s)} style={{ padding: "8px 10px", background: sel ? "#f3eef9" : "#fff", borderRadius: 6, border: sel ? `1px solid ${C.purpleLight}` : "1px solid #eee", cursor: sel ? "default" : "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", opacity: sel ? 0.45 : 1, transition: "all 0.12s" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.purple }}>{s.n}</div>
                    <div style={{ fontSize: 9, color: "#aaa", marginTop: 1 }}>
                      {s.ay > 0 && <span style={{ background: "#fff3e0", color: C.orangeDark, padding: "1px 4px", borderRadius: 4, marginRight: 4, fontSize: 8, fontWeight: 700 }}>Ayuno {s.ay}h</span>}
                      {s.te || "Consultar"}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.purple }}>{fmt(s.p)}</div>
                </div>
              );
            })}
          </div>
        </div>
 
        {/* Right */}
        <div style={{ width: 380, background: "#fff", borderLeft: "1px solid #e8e4ee", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 50px)", overflowY: "auto" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee", background: "#faf8fc" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.purple }}>Estudios Seleccionados ({selected.length})</div>
          </div>
          {!selected.length ? <div style={{ padding: 32, textAlign: "center", color: "#ccc", fontSize: 12 }}>Selecciona estudios de la lista</div> : (
            <>
              <div style={{ padding: "4px 16px", flex: 1 }}>
                {selected.map(s => (
                  <div key={s.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #f5f3f8" }}>
                    <div style={{ flex: 1, fontSize: 11, color: "#444", paddingRight: 4 }}>{s.n}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.purple, whiteSpace: "nowrap" }}>{fmt(s.p)}</div>
                    <button onClick={() => rem(s.n)} style={{ marginLeft: 4, background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 14, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 16px", borderTop: `2px solid ${C.purple}` }}>
                {isSocio && (<>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888", marginBottom: 3 }}><span>Subtotal:</span><span>{fmt(subtotal)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.orange, fontWeight: 600, marginBottom: 3 }}><span>Desc. médico socio (15%):</span><span>-{fmt(discount)}</span></div>
                </>)}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, color: C.purple, paddingTop: isSocio ? 4 : 0, borderTop: isSocio ? "1px solid #eee" : "none" }}><span>Total:</span><span>{fmt(final)}</span></div>
                {hasComp && compTotal > final && (
                  <div style={{ background: "#f0faf3", borderRadius: 6, padding: "6px 8px", marginTop: 6, border: "1px solid #d5f0dd" }}>
                    <div style={{ fontSize: 10, color: "#666" }}>Competencia: <span style={{ textDecoration: "line-through" }}>{fmt(compTotal)}</span></div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1b7a3a" }}>Ahorro: {fmt(compTotal - final)}</div>
                  </div>
                )}
                <div style={{ marginTop: 8, fontSize: 10, color: "#666" }}><strong>Entrega:</strong> {delSummary}</div>
                {maxAy > 0 && <div style={{ marginTop: 2, fontSize: 10, color: C.orangeDark, fontWeight: 600 }}>Ayuno: {maxAy} horas</div>}
                <button onClick={() => setShowQuote(true)} style={{ width: "100%", padding: "10px", background: `linear-gradient(135deg, ${C.orangeDark}, ${C.orange})`, color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 12, fontFamily: font }}>Ver Cotización para Paciente</button>
              </div>
              {/* Internal */}
              <div style={{ padding: "8px 16px", background: "#faf8fc", borderTop: "1px dashed #e0dce6" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Análisis Interno</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[{ l: "Costo", v: fmt(totalCost), c: "#c62828" }, { l: "Ganancia", v: fmt(profit), c: profit >= 0 ? "#1b7a3a" : "#c62828" }, { l: "Margen", v: margin.toFixed(1) + "%", c: margin >= 40 ? "#1b7a3a" : margin >= 25 ? "#e65100" : "#c62828" }].map(({ l, v, c }) => (
                    <div key={l} style={{ flex: 1, background: "#fff", borderRadius: 5, padding: "5px 6px", textAlign: "center", border: "1px solid #eee" }}>
                      <div style={{ fontSize: 8, color: "#999" }}>{l}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 4, fontSize: 8, color: "#ccc" }}>
                  {selected.map(s => { const sp = isSocio ? s.p * 0.85 : s.p; const m = sp > 0 ? ((sp - s.co) / sp * 100) : 0; return (
                    <div key={s.n} style={{ display: "flex", justifyContent: "space-between", padding: "1px 0" }}>
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.n}</span>
                      <span style={{ color: m >= 40 ? "#1b7a3a" : m >= 25 ? "#e65100" : "#c62828", fontWeight: 700, marginLeft: 4 }}>{m.toFixed(0)}%</span>
                    </div>
                  ); })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
 
      {/* ── QUOTE MODAL — Compact for screenshot + collapsible indications ── */}
      {showQuote && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => { setShowQuote(false); setShowInd(false); }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: 440, maxHeight: "92vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(40,12,76,0.3)" }}>
            {/* Header — compact */}
            <div style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleLight} 100%)`, padding: "18px 24px 14px", borderRadius: "16px 16px 0 0" }}>
              <div><span style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>lab</span><span style={{ fontSize: 26, fontWeight: 800, color: C.orange }}>box</span></div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 500, marginTop: 1 }}>Estudios de Laboratorio · 100% a Domicilio</div>
            </div>
 
            <div style={{ padding: "12px 24px 8px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.purple, marginBottom: 8 }}>Resumen de Estudios</div>
              {selected.map(s => (
                <div key={s.n} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f3f1f6" }}>
                  <span style={{ fontSize: 11, color: "#444", flex: 1 }}>{s.n}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.purple }}>{fmt(s.p)}</span>
                </div>
              ))}
 
              {/* Subtotal + discount (only if socio) */}
              {isSocio && (<>
                <div style={{ background: "#f7f5fa", borderRadius: 8, padding: "8px 12px", marginTop: 10, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "#666", fontWeight: 500 }}>Subtotal:</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.purple }}>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 12px", color: "#0B8A2E", fontSize: 10, fontWeight: 700 }}>
                  <span>Descuento médico socio (15%):</span><span>-{fmt(discount)}</span>
                </div>
              </>)}
 
              {/* Total */}
              <div style={{ background: C.purple, borderRadius: 10, padding: "10px 14px", marginTop: isSocio ? 4 : 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600 }}>Total a pagar:</span>
                <span style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>{fmt(final)}</span>
              </div>
 
              {/* Competitor comparison */}
              {hasComp && compTotal > final && (
                <div style={{ background: "#FFF9C4", borderRadius: 10, padding: "10px 14px", marginTop: 8, border: "1px solid #F9E547" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#333", fontWeight: 500 }}>En otros laboratorios pagarías:</span>
                    <span style={{ fontSize: 13, color: "#666", textDecoration: "line-through", fontWeight: 600 }}>{fmt(compTotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#0B8A2E" }}>Tu ahorro con Labbox:</span>
                    <span style={{ fontSize: 17, fontWeight: 800, color: "#0B8A2E" }}>{fmt(compTotal - final)}</span>
                  </div>
                </div>
              )}
 
              {/* Compact badges — fits in screenshot */}
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                {maxAy > 0 && <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff3e0", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600, color: C.orangeDark }}>⏰ Ayuno: {maxAy} hrs</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#e8f5e9", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600, color: "#2e7d32" }}>🏠 Domicilio incluido</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#e3f2fd", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600, color: "#1565c0" }}>📦 {(() => { const tt = selected.map(s => parseTe(s.te)).filter(d => d); return tt.length ? `${Math.min(...tt)}-${Math.max(...tt)} días` : "Consultar"; })()}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#f3e5f5", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600, color: "#7b1fa2" }}>💳 MSI disponibles</div>
              </div>
 
              {/* ── COLLAPSIBLE INDICATIONS ── */}
              {specInd.length > 0 && (
                <div style={{ marginTop: 10, borderTop: "1px solid #f0eef4" }}>
                  <div onClick={() => setShowInd(!showInd)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0 4px", cursor: "pointer" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.purple }}>📋 Indicaciones y preparación ({specInd.length})</span>
                    <span style={{ fontSize: 16, color: C.purpleLight, transition: "transform 0.2s", transform: showInd ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                  </div>
                  {showInd && (
                    <div style={{ background: "#faf8fc", borderRadius: 8, padding: "10px 12px", marginBottom: 4 }}>
                      {specInd.map(s => (
                        <div key={s.n} style={{ fontSize: 11, color: "#555", marginBottom: 6, lineHeight: 1.4 }}>
                          <strong style={{ color: C.purple }}>{s.n}:</strong> {s.ind}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
 
              <div style={{ marginTop: 6, textAlign: "center", fontSize: 9, color: "#ccc", padding: "4px 0" }}>
                www.labbox.com.mx
              </div>
            </div>
            <button onClick={() => { setShowQuote(false); setShowInd(false); }} style={{ position: "sticky", bottom: 0, width: "100%", padding: "10px", background: "#f5f3f8", color: "#999", border: "none", borderRadius: "0 0 16px 16px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: font }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
 
