import { useState, useMemo, useEffect } from "react";
 
const STUDIES_RAW = [
{"n":"Gen MTHFR","p":4000,"te":"14 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PCR Mutación 677 C T en el gen de la MTHFR, PCR Gen MTHFR, MTHFR","cat":"Ginecologia","co":1339.8,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"KOH","p":350,"te":"1 (dias)","ay":0,"ind":"Sin tratamientos, sin lavarse manos, pies, piel, cabellos, que sean partes afectadas, sin antimicoticos de aplicación local","sin":"Búsqueda de estructuras fúngicas","cat":"Infectologia","co":62.64,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Levetiracetam (KEPPRA)","p":3300,"te":"8 (dias)","ay":8,"ind":"Realizar la toma 1 hora antes de la siguiente dosis","sin":"Levetiracetam, Keppra","cat":"Neurologia","co":2229.52,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Lipasa en Sangre","p":250,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Lipasa","cat":"Gastroenterologia","co":163.56,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Dihidrotestosterona (DHT)","p":1400,"te":"2 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"DHT, 5α-DHT","cat":"Ginecologia","co":372.36,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Cobre Serico","p":600,"te":"4 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Cobre en Suero","cat":"Nutricion","co":488.36,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Vitamina A (Retinol)","p":1500,"te":"10 (dias)","ay":8,"ind":"No ingerir multivitaminicos antes de la toma de muestra","sin":"Vit. A, Retinol","cat":"Ginecologia","co":1953.44,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Hormona del Crecimiento (HGH)","p":300,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"HGH","cat":"Endocrinologia","co":310.88,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Globulina Fijadora de Hormona Sexual (SHBG)","p":1200,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"SHBG","cat":"Endocrinologia","co":573.04,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Serotonina en suero","p":1050,"te":"4 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Serotonina","cat":"Endocrinologia","co":756.32,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Estrona","p":850,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"E1, Estrona en Suero","cat":"Ginecologia","co":283.04,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Tiroglobulina","p":600,"te":"2 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Tiroglobulina Sérica","cat":"Endocrinologia","co":251.72,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Hormona Paratohormona (PTH)","p":850,"te":"2 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PTH, Paratohormona","cat":"Endocrinologia","co":458.2,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"T3 Libre","p":250,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"FT3, T3 libre, Free T3","cat":"Endocrinologia","co":110.2,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Hormona Adrenocorticotrofica (ACTH)","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"ACTH","cat":"Endocrinologia","co":325.96,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"17-Hidroxi Progesterona","p":400,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"17 Alfa Hidroxi Progesterona","cat":"Ginecologia","co":271.44,"ch":904.75,"mo":718,"sw":447.97,"ts":423.77},
{"n":"Acido Folico","p":600,"te":"1 (dias)","ay":8,"ind":"No ingerir multivitaminicos antes de la toma de muestra","sin":"Vitamina B9, Vit B9","cat":"Ginecologia","co":428.04,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Acido Urico","p":100,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Urato","cat":"Ginecologia","co":34.8,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Albumina","p":100,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Albumina Serica","cat":"Ginecologia","co":46.4,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"AlfaFetoProteina","p":700,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"AFP","cat":"Ginecologia","co":215.76,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Amilasa en sangre","p":300,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Amilasa","cat":"Gastroenterologia","co":100.92,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Androstenediona","p":500,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Androstenediona","cat":"Ginecologia","co":286.52,"ch":587.95,"mo":706.9,"sw":655,"ts":622.1},
{"n":"Anticuerpos Anti Tiroideos (TPO/TG)","p":1300,"te":"3 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Ac. Anti Tiroides TPO,TG","cat":"Ginecologia","co":483.72,"ch":1357.4,"mo":3380,"sw":null,"ts":2505.29},
{"n":"Anticuerpos Antiperoxidasa (TPO)","p":1000,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Ac. Anti Peroxidasa, TPO","cat":"Ginecologia","co":337.56,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Antigeno CA-125","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"CA 125","cat":"Ginecologia","co":290,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Antigeno Carcino Embrionario","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"CEA","cat":"Ginecologia","co":180.96,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Antigeno de Helicobacter Pylori en Heces","p":1900,"te":"3 (dias)","ay":0,"ind":"Recolectar una muestra de materia fecal del tamaño de una nuez en un recipiente estéril.","sin":"Helicobacter pylori en heces","cat":"Gastroenterologia","co":1325.88,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Creatinfosfoquinasa (CPK)","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"CPK","cat":"Cardiologia","co":120.64,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Antigeno Prostatico Especifico","p":600,"te":"1 (dias)","ay":8,"ind":"No bicicleta, montar a caballo o examen digital 24 hrs antes","sin":"PSA","cat":"Urologia","co":119.48,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Biometria Hematica Completa","p":300,"te":"1 (dias)","ay":4,"ind":"No requiere indicación especial","sin":"BHC, BH, Biometria, bh","cat":"Ginecologia","co":59.16,"ch":154,"mo":315,"sw":237,"ts":332},
{"n":"Colesterol Total","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Colesterol","cat":"Ginecologia","co":46.4,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Coombs Indirecto","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Cooind","cat":"Ginecologia","co":128.76,"ch":308,"mo":630,"sw":522,"ts":1422.22},
{"n":"Cortisol en Sangre","p":600,"te":"1 (dias)","ay":8,"ind":"Se toma preferentemente antes de las 08:30am","sin":"Cortisol en Suero","cat":"Ginecologia","co":139.2,"ch":943.25,"mo":717,"sw":873,"ts":1393.91},
{"n":"Curva de Tolerancia a la Glucosa de 2 horas","p":1200,"te":"1 (dias)","ay":8,"ind":"Importante contar con receta para indicaciones de tiempos y carga de glucosa","sin":"Curva de tolerancia a la glucosa (2 horas)","cat":"Ginecologia","co":185.6,"ch":411.41,"mo":756,"sw":570,"ts":1284},
{"n":"Dehidroepiandrosterona (DHEA)","p":500,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"DHEA","cat":"Ginecologia","co":232,"ch":961.41,"mo":1028.7,"sw":990,"ts":459.82},
{"n":"Dehidroepiandrosterona Sulfato (SDHEA)","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"SDHEA, dehidro","cat":"Ginecologia","co":216.92,"ch":891,"mo":936.8,"sw":873,"ts":1112.65},
{"n":"Determinacion de Vitamina D (25-hidroxi)","p":700,"te":"2 (dias)","ay":8,"ind":"Suspender ingesta de alcohol y vitamínicos 24 hrs antes de la toma.","sin":"Vitamina D, Vit D25","cat":"Ginecologia","co":417.6,"ch":730.41,"mo":1345,"sw":895,"ts":1712},
{"n":"Dimero D","p":1200,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Cardiologia","co":425.72,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Electrolitos Sericos (Sodio Potasio y Cloro)","p":500,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Electrolitos Sericos 3","cat":"Gastroenterologia","co":111.36,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Estradiol","p":450,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Estradiol","cat":"Endocrinologia","co":163.56,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Examen General de Orina","p":200,"te":"1 (dias)","ay":0,"ind":"Primera orina de la mañana, desechar el primer chorro y recolectar en un recipiente estéril.","sin":"EGO, General de orina, Uroanalisis","cat":"Ginecologia","co":41.76,"ch":101.74,"mo":195,"sw":142,"ts":150},
{"n":"Factor Reumatoide","p":300,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"FR","cat":"Reumatologia","co":103.24,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Ferritina","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Ferritina Serica","cat":"Ginecologia","co":267.96,"ch":327.25,"mo":855,"sw":797,"ts":1964.68},
{"n":"Fraccion Beta Cuantitativa (HGC/HCG)","p":700,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"HGC Beta, prueba embarazo cuantitativa","cat":"Ginecologia","co":208.8,"ch":770,"mo":820,"sw":940,"ts":1380.62},
{"n":"GGT - Gamaglutamil Transpeptidasa","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"GGT","cat":"Ginecologia","co":59.16,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Glucosa en Sangre","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Glucosa","cat":"Ginecologia","co":41.76,"ch":57.76,"mo":110,"sw":119,"ts":231.26},
{"n":"Grupo Sanguineo y Factor RH","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Gpo y RH","cat":"Ginecologia","co":46.4,"ch":115,"mo":220,"sw":170,"ts":696.14},
{"n":"Hemoglobina Glicosilada A1C","p":350,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"HbA1c, Hemoglobina glucosilada","cat":"Ginecologia","co":142.68,"ch":217.26,"mo":390,"sw":444,"ts":635.47},
{"n":"Hierro Serico","p":300,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Hierro","cat":"Ginecologia","co":104.4,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"HOMA","p":450,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Resistencia a la insulina, Indice Homa","cat":"Ginecologia","co":214.6,"ch":398.75,"mo":415,"sw":474,"ts":1188},
{"n":"Hormona Antimulleriana","p":2700,"te":"5 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"AMH/MIS, Hormona anti muleriana","cat":"Ginecologia","co":1431.44,"ch":3027.75,"mo":3395,"sw":3182,"ts":4390.52},
{"n":"Hormona Foliculo Estimulante (FSH)","p":350,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"FSH","cat":"Endocrinologia","co":127.6,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Hormona Luteinizante (LH)","p":450,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"HL, LH","cat":"Endocrinologia","co":122.96,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Insulina Serica","p":450,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Insulina","cat":"Ginecologia","co":161.24,"ch":279.94,"mo":275,"sw":351,"ts":831.34},
{"n":"Magnesio Serico","p":200,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Magnesio, Mg","cat":"Ginecologia","co":125.28,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Bioquimico 18 Elementos","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PB18, QS18","cat":"Ginecologia","co":395.56,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Bioquimico 24 Elementos","p":900,"te":"6 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PB24, QS24","cat":"Ginecologia","co":345.68,"ch":706,"mo":1035,"sw":921,"ts":787},
{"n":"Perfil Bioquimico 44 Elementos","p":1600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PB44, QS44","cat":"Ginecologia","co":607.84,"ch":734.25,"mo":null,"sw":null,"ts":2247.2},
{"n":"Perfil de Hierro","p":1000,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Perfil de Hierro III","cat":"Endocrinologia","co":481.4,"ch":2248.95,"mo":1415,"sw":1163,"ts":3054.65},
{"n":"Perfil de Lipidos","p":800,"te":"2 (dias)","ay":12,"ind":"No requiere indicación especial","sin":"Perfil de Lípidos completos","cat":"Ginecologia","co":541.72,"ch":360.25,"mo":945,"sw":713,"ts":1155.41},
{"n":"Perfil Hormonal Femenino Completo","p":1100,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PHF, Hormonal Femenino","cat":"Ginecologia","co":428.04,"ch":2706,"mo":1995,"sw":2335,"ts":3985.81},
{"n":"Perfil Hormonal Masculino","p":1400,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Urologia","co":880.44,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Tiroideo con TSH","p":700,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Perfil Tiroideo","cat":"Ginecologia","co":379.32,"ch":605,"mo":1025,"sw":759,"ts":1040},
{"n":"Perfil Tiroideo con Anti Tiroideos","p":1800,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Ginecologia","co":481.4,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Prolactina","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Prolactina Serica","cat":"Ginecologia","co":147.32,"ch":483.45,"mo":520,"sw":702,"ts":1027.37},
{"n":"Proteina C Reactiva","p":250,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PCR","cat":"Ginecologia","co":149.64,"ch":176,"mo":356,"sw":370,"ts":null},
{"n":"Perfil Testosterona (Total + Libre)","p":1000,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Testosterona Libre y Total","cat":"Urologia","co":328.28,"ch":1520.75,"mo":1315,"sw":null,"ts":2317.55},
{"n":"Testosterona Total","p":600,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Ginecologia","co":161.24,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"TSH (Hormona Estimulante Tiroides)","p":300,"te":"10 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"TSH","cat":"Ginecologia","co":128.76,"ch":423.49,"mo":568,"sw":512,"ts":751.32},
{"n":"Urocultivo","p":450,"te":"4 (dias)","ay":0,"ind":"Recolectar el 2do chorro de orina matutina con previo aseo en recipiente estéril.","sin":"Cultivo de orina","cat":"Ginecologia","co":179.8,"ch":229.9,"mo":585,"sw":339.44,"ts":520},
{"n":"VDRL","p":200,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Ginecologia","co":69.6,"ch":147.4,"mo":255,"sw":208,"ts":303.38},
{"n":"VIH 1 y 2 Cualitativo (Anticuerpos)","p":500,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"HIV 1 y 2","cat":"Ginecologia","co":192.56,"ch":592.9,"mo":795,"sw":730,"ts":1280.79},
{"n":"Vitamina B12","p":1000,"te":"1 (dias)","ay":8,"ind":"No ingerir multivitaminicos antes de la toma de muestra","sin":"Vit B12","cat":"Gastroenterologia","co":387.44,"ch":1012.01,"mo":1295,"sw":1158,"ts":963.18},
{"n":"Zinc En Sangre","p":900,"te":"4 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Zinc","cat":"Toxicologia","co":473.28,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Quimica Sanguinea 3 elementos","p":350,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"QS3","cat":"Ginecologia","co":89.32,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Quimica Sanguinea 5 Elementos","p":400,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"QS5","cat":"Ginecologia","co":143.84,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Quimica Sanguinea 6 Elementos (Con Colesterol)","p":400,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"QS6","cat":"Ginecologia","co":112.52,"ch":321.75,"mo":510,"sw":384,"ts":604.77},
{"n":"Quimica Sanguinea 12 Elementos","p":850,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"QS12, PB12","cat":"Ginecologia","co":277.24,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Bioquimico 35 Elementos","p":1300,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PB35, QS35","cat":"Ginecologia","co":502.28,"ch":723.25,"mo":null,"sw":964,"ts":null},
{"n":"Quimica sanguinea 38 elementos","p":1700,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"QS38","cat":"Ginecologia","co":582.32,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Prueba de Embarazo","p":400,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"PIE","cat":"Ginecologia","co":56.84,"ch":235.96,"mo":253,"sw":511,"ts":878.33},
{"n":"Perfil de transmision sexual (ITS) por PCR","p":4900,"te":"3 (dias)","ay":0,"ind":"No orinar al menos 2 hrs antes de la toma","sin":"Perfil sexual, STI, ITS","cat":"Ginecologia","co":2630.88,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Helicobacter pylori, prueba de aliento","p":4800,"te":"2 (dias)","ay":6,"ind":"No consumir antibióticos ni bismuto al menos durante un mes previo a la prueba.","sin":"Ureasa, carbono 14","cat":"Gastroenterologia","co":1671.56,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Calprotectina fecal","p":1200,"te":"3 (dias)","ay":0,"ind":"Recolectar muestra de materia fecal","sin":"Calpro","cat":"Gastroenterologia","co":619.44,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Tiempo de Protombina (TP)","p":250,"te":"1 (dias)","ay":4,"ind":"No requiere indicación especial","sin":"TP","cat":"Ginecologia","co":91.64,"ch":140.26,"mo":325,"sw":265,"ts":306.85},
{"n":"Velocidad de Sedimentacion Globular (VSG)","p":200,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"VSG","cat":"Ginecologia","co":64.96,"ch":104.49,"mo":120,"sw":170,"ts":298.81},
{"n":"T4 Libre","p":300,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"T4 free","cat":"Endocrinologia","co":155.44,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Creatinina","p":150,"te":"1 (dias)","ay":0,"ind":"Recolectar orina de 24 horas","sin":"Creatinina","cat":"Ginecologia","co":46.4,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Progesterona","p":500,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Ginecologia","co":127.6,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Calcio Serico","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Calcio","cat":"Ginecologia","co":47.56,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Urea Serica","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Urea","cat":"Gastroenterologia","co":35.96,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Trigliceridos","p":150,"te":"1 (dias)","ay":14,"ind":"No requiere indicación especial","sin":"tgl","cat":"Ginecologia","co":64.96,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Sodio Serico","p":200,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Sodio, Na","cat":"Ginecologia","co":48.72,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Bilirrubinas Totales","p":300,"te":"1 (dias)","ay":null,"ind":"","sin":"Bilirrubinas","cat":"","co":84.68,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Hepatico","p":800,"te":"4 (dias)","ay":8,"ind":"","sin":"","cat":"Ginecologia","co":251.72,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Antidoping 5 Elementos","p":800,"te":"1 (dias)","ay":0,"ind":"Recolectar orina en recipiente estéril, custodiado por personal de salud","sin":"Anti-doping V","cat":"Toxicologia","co":467.48,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Homocisteina","p":900,"te":"3 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Endocrinologia","co":419.92,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Coprocultivo","p":700,"te":"3 (dias)","ay":0,"ind":"Recolectar muestra en frasco seco, evitar contacto con inodoro","sin":"Cultivo de heces","cat":"Gastroenterologia","co":313.2,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Cultivo Faringeo","p":600,"te":"3 (dias)","ay":4,"ind":"No realizar aseo bucal, no antibióticos 5 días antes","sin":"Cultivo faríngeo","cat":"Infectologia","co":141.52,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Ginecologico II","p":1750,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Ginecologia","co":538.24,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Antigeno CA19-9","p":800,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"CA19-9","cat":"Ginecologia","co":288.84,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Antigeno CA 15-3","p":900,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"CA 15-3","cat":"Ginecologia","co":294.64,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Prostatico","p":1000,"te":"2 (dias)","ay":8,"ind":"No bicicleta, montar a caballo o examen digital 24hrs antes","sin":"Perfil Prostatico","cat":"Urologia","co":541.72,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"PCR COVID19","p":2000,"te":"1 (dias)","ay":0,"ind":"30 min antes no aseo bucal, no alimentos, no chicles, no fumar","sin":"PCR SARS-CoV-2","cat":"Respiratorio/Viral","co":1020.8,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Torch IgG / IgM","p":4000,"te":"2 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Perfil Torch","cat":"Infectologia","co":1641.4,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Interleucina 6","p":4200,"te":"10 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"IL6","cat":"Reumatologia","co":1132.16,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Quantiferon TB Gold Plus","p":4300,"te":"6 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Quantiferon","cat":"Infectologia","co":1532.36,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Depuracion de Creatinina de 24 horas","p":800,"te":"1 (dias)","ay":8,"ind":"Recolectar orina de 24 horas. Ayuno 8 hrs para sangre","sin":"Depuración de creatinina","cat":"Urologia","co":69.6,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Colesterol HDL","p":200,"te":"1 (dias)","ay":12,"ind":"No requiere indicación especial","sin":"HDL","cat":"Ginecologia","co":58,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Colesterol LDL","p":200,"te":"1 (dias)","ay":12,"ind":"No requiere indicación especial","sin":"LDL","cat":"Ginecologia","co":67.28,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Deshidroenasa Lactica (DHL)","p":250,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"DHL","cat":"Ginecologia","co":69.6,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Fibrinogeno","p":350,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"FB, Fib","cat":"Endocrinologia","co":185.6,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Nitrogeno de la Urea","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"BUN","cat":"Ginecologia","co":46.4,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Proteinas Totales sericas","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Proteínas totales","cat":"Ginecologia","co":45.24,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Fosforo Serico","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Fosforo","cat":"Ginecologia","co":52.2,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil ENA","p":1650,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Ac. Anti ENA IgG","cat":"Reumatologia","co":1266.72,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil Reumatoide","p":500,"te":"6 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Perfil Reumatico","cat":"Reumatologia","co":0,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Perfil de Insulina de 3 Tomas","p":1300,"te":"1 (dias)","ay":8,"ind":"Contar con receta para indicaciones","sin":"Curva de insulina 3 tomas","cat":"Ginecologia","co":472,"ch":417.45,"mo":675,"sw":1492,"ts":2191.16},
{"n":"Vitamina D 25 Hidroxicalciferol (Total-D2-D3)","p":1700,"te":"8 (dias)","ay":8,"ind":"No ingerir multivitaminicos antes de la toma de muestra","sin":"Vit D25, 25-OH-D","cat":"Ginecologia","co":1012.68,"ch":null,"mo":1290,"sw":1215,"ts":917.17},
{"n":"Anticuerpos anti receptor de TSH","p":2600,"te":"8 (dias)","ay":4,"ind":"No requiere indicación especial","sin":"Anti R-TSH","cat":"Endocrinologia","co":1380.4,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Hepatitis B - Antigeno de superficie","p":600,"te":"2 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Antígeno Superficie Hepatitis B","cat":"Ginecologia","co":345.68,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Hepatitis C - Cualitativa","p":500,"te":"2 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Anticuerpos Hepatitis C","cat":"Ginecologia","co":321.32,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Cultivo Vaginal","p":500,"te":"3 (dias)","ay":0,"ind":"Abstinencia sexual 3 días. Sin ducha vaginal.","sin":"Cultivo cervico vaginal","cat":"Ginecologia","co":203,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Testosterona Libre","p":450,"te":"3 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"","cat":"Ginecologia","co":301.6,"ch":862.95,"mo":null,"sw":678,"ts":null},
{"n":"Reticulocitos","p":200,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"Recuento de reticulocitos","cat":"Ginecologia","co":48.72,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"Quimica Sanguinea 50 elementos","p":2400,"te":"1 (dias)","ay":12,"ind":"No requiere indicación especial","sin":"QS50","cat":"Ginecologia","co":870,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"TGO- ASPARTATO AMINO TRANSFERASA","p":150,"te":"1 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"ALAT, TGO","cat":"Ginecologia","co":82.8,"ch":null,"mo":null,"sw":null,"ts":null},
{"n":"TGP - ALANINA AMINO TRANSFERASA","p":150,"te":"6 (dias)","ay":8,"ind":"No requiere indicación especial","sin":"ASAT, TGP","cat":"Ginecologia","co":82.8,"ch":null,"mo":null,"sw":null,"ts":null},
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
  // Consolidated indications: group studies that share the same indication text
  const consolidatedInd = useMemo(() => {
    const map = new Map();
    specInd.forEach(s => {
      const key = s.ind.trim();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(s.n);
    });
    return Array.from(map.entries()).map(([ind, names]) => ({ ind, names }));
  }, [specInd]);
  const maxAy = useMemo(() => { const a = selected.map(s => s.ay).filter(a => a > 0); return a.length ? Math.max(...a) : 0; }, [selected]);
 
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
 
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
 
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", maxWidth: 1400, margin: "0 auto", minHeight: isMobile ? "auto" : "calc(100vh - 50px)" }}>
        {/* Left */}
        <div style={{ flex: 1, padding: "14px 18px", overflowY: "auto", maxHeight: isMobile ? "50vh" : "calc(100vh - 50px)" }}>
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
        <div style={{ width: isMobile ? "100%" : 380, background: "#fff", borderLeft: isMobile ? "none" : "1px solid #e8e4ee", borderTop: isMobile ? "2px solid #e8e4ee" : "none", display: "flex", flexDirection: "column", maxHeight: isMobile ? "50vh" : "calc(100vh - 50px)", overflowY: "auto" }}>
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
 
      {/* ── QUOTE MODAL ── */}
      {showQuote && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", zIndex: 1000 }} onClick={() => { setShowQuote(false); setShowInd(false); }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: isMobile ? "20px 20px 0 0" : 20, width: isMobile ? "100%" : 540, maxHeight: isMobile ? "95vh" : "92vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleLight} 100%)`, padding: isMobile ? "24px 20px 18px" : "28px 32px 20px", borderRadius: isMobile ? "20px 20px 0 0" : "20px 20px 0 0" }}>
              <div><span style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>lab</span><span style={{ fontSize: 32, fontWeight: 800, color: C.orange }}>box</span></div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500, marginTop: 4 }}>Estudios de Laboratorio · 100% a Domicilio</div>
            </div>
 
            <div style={{ padding: isMobile ? "20px 20px" : "24px 32px" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.purple, marginBottom: 16 }}>Resumen de Estudios</div>
              {selected.map(s => (
                <div key={s.n} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f1f6", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: "#333", flex: 1, paddingRight: 12 }}>{s.n}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.purple, whiteSpace: "nowrap" }}>{fmt(s.p)}</span>
                </div>
              ))}
 
              {/* Socio discount */}
              {isSocio && (<>
                <div style={{ background: "#f7f5fa", borderRadius: 10, padding: "14px 18px", marginTop: 16, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, color: "#666", fontWeight: 500 }}>Subtotal:</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.purple }}>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 18px", color: "#0B8A2E", fontSize: 13, fontWeight: 700 }}>
                  <span>Descuento médico socio (15%):</span><span>-{fmt(discount)}</span>
                </div>
              </>)}
 
              {/* Total */}
              <div style={{ background: C.purple, borderRadius: 12, padding: "16px 18px", marginTop: isSocio ? 6 : 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: 600 }}>Total a pagar:</span>
                <span style={{ color: "#fff", fontSize: 24, fontWeight: 800 }}>{fmt(final)}</span>
              </div>
 
              {/* Competitor Comparison */}
              {hasComp && compTotal > final && (
                <div style={{ background: "#FFF9C4", borderRadius: 12, padding: "16px 18px", marginTop: 14, border: "1px solid #F9E547" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, color: "#333", fontWeight: 500 }}>En otros laboratorios pagarías:</span>
                    <span style={{ fontSize: 15, color: "#888", textDecoration: "line-through", fontWeight: 600 }}>{fmt(compTotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#0B8A2E" }}>Tu ahorro con Labbox:</span>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "#0B8A2E" }}>{fmt(compTotal - final)}</span>
                  </div>
                </div>
              )}
 
              {/* Compact summary line: ayuno + entrega (always visible, one line each) */}
              <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {maxAy > 0 && (
                  <div style={{ fontSize: 13, color: "#555", fontWeight: 600, background: "#fff3e0", padding: "6px 12px", borderRadius: 8 }}>
                    ⏰ Ayuno: {maxAy} hrs
                  </div>
                )}
                <div style={{ fontSize: 13, color: "#555", fontWeight: 600, background: "#f0f7ed", padding: "6px 12px", borderRadius: 8 }}>
                  🏠 Servicio a domicilio incluido
                </div>
              </div>
 
              {/* ── COLLAPSIBLE INDICATIONS ── */}
              <div style={{ marginTop: 14 }}>
                <div
                  onClick={() => setShowInd(!showInd)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#faf8fc", borderRadius: showInd ? "12px 12px 0 0" : 12, cursor: "pointer", transition: "all 0.2s", border: "1px solid #ece8f2" }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.purple }}>Indicaciones y preparación</span>
                  <span style={{ fontSize: 18, color: C.purpleLight, transform: showInd ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", lineHeight: 1 }}>▾</span>
                </div>
                {showInd && (
                  <div style={{ padding: "16px 18px", background: "#faf8fc", borderRadius: "0 0 12px 12px", borderTop: "none", border: "1px solid #ece8f2", borderTopWidth: 0 }}>
                    <div style={{ fontSize: 14, color: "#333", marginBottom: 10, lineHeight: 1.6 }}>📦 <strong>Tiempo de entrega:</strong> {delSummary}</div>
                    {maxAy > 0 && <div style={{ fontSize: 14, color: "#333", marginBottom: 10, lineHeight: 1.6 }}>⏰ <strong>Ayuno requerido:</strong> {maxAy} horas para algunos estudios</div>}
                    <div style={{ fontSize: 14, color: "#333", marginBottom: consolidatedInd.length > 0 ? 10 : 0, lineHeight: 1.6 }}>🏠 <strong>Servicio a domicilio incluido</strong> — Vamos a donde tú estés</div>
                    {consolidatedInd.map(({ ind, names }, i) => (
                      <div key={i} style={{ fontSize: 13, color: "#555", marginTop: 10, lineHeight: 1.6, paddingTop: 10, borderTop: "1px solid #ece8f2" }}>
                        📋 <strong>{names.join(", ")}:</strong> {ind}
                      </div>
                    ))}
                  </div>
                )}
              </div>
 
              <div style={{ marginTop: 12, textAlign: "center", fontSize: 11, color: "#bbb", padding: "10px 0", borderTop: "1px solid #f0eef4" }}>
                💳 Pagos a meses sin intereses · www.labbox.com.mx
              </div>
            </div>
            <button onClick={() => { setShowQuote(false); setShowInd(false); }} style={{ position: "sticky", bottom: 0, width: "100%", padding: "14px", background: "#f5f3f8", color: "#999", border: "none", borderRadius: isMobile ? 0 : "0 0 20px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: font }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
