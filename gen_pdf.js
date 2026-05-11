'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join('C:\\nm-training', 'calendario_nutricional.pdf');

// ─── Color Schemes ───────────────────────────────────────────────────────────
const COLORS = {
  gym:      { header: '#1a5276', accent: '#2980b9' },
  futbol:   { header: '#145a32', accent: '#27ae60' },
  descanso: { header: '#4a235a', accent: '#8e44ad' },
  viernes:  { header: '#784212', accent: '#d35400' },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const days = [
  {
    colorKey: 'gym',
    title: 'LUNES / MARTES - GYM 19h | Deficit',
    tag: '[GYM]',
    total: { kcal: 2086, prot: 164, grasas: 65, carbos: 206 },
    meals: [
      {
        name: 'DESAYUNO',
        subtotal: { kcal: 424, prot: 29, grasas: 21, carbos: 28 },
        items: [
          ['Huevos revueltos x3',       '180g',  279, 23, 19, 2],
          ['Pan integral x2 rebanadas', '60g',   140,  6,  2, 25],
          ['Cafe solo',                 '200ml',   5,  0,  0,  1],
        ],
      },
      {
        name: 'COLACION ~11h',
        subtotal: { kcal: 252, prot: 6, grasas: 15, carbos: 26 },
        items: [
          ['Manzana',   '150g', 78,  0,  0, 21],
          ['Almendras', '30g', 174,  6, 15,  5],
        ],
      },
      {
        name: 'ALMUERZO',
        subtotal: { kcal: 507, prot: 53, grasas: 6, carbos: 55 },
        items: [
          ['Pechuga de pollo (cocida)', '150g', 248, 47, 5,  0],
          ['Arroz cocido',              '180g', 234,  5, 1, 51],
          ['Ensalada verde',            '100g',  25,  1, 0,  4],
        ],
      },
      {
        name: 'COLACION TARDE - Pre-gym',
        subtotal: { kcal: 263, prot: 8, grasas: 3, carbos: 54 },
        items: [
          ['Platano',       '120g', 107, 1, 0, 27],
          ['Avena (seca)',  '40g',  156, 7, 3, 27],
        ],
      },
      {
        name: 'CENA - Post-workout',
        subtotal: { kcal: 640, prot: 68, grasas: 20, carbos: 43 },
        items: [
          ['Scop proteina Nico',      '30g',  114, 22,  1,  3],
          ['Yogur Nestle Protein x3', '300g', 340, 30,  6, 39],
          ['Huevos x2',               '120g', 186, 16, 13,  1],
        ],
      },
    ],
  },
  {
    colorKey: 'gym',
    title: 'LUNES / MARTES - GYM 21h | Deficit',
    tag: '[GYM]',
    total: { kcal: 1977, prot: 151, grasas: 53, carbos: 218 },
    meals: [
      {
        name: 'DESAYUNO',
        subtotal: { kcal: 424, prot: 29, grasas: 21, carbos: 28 },
        items: [
          ['Huevos revueltos x3',       '180g',  279, 23, 19, 2],
          ['Pan integral x2 rebanadas', '60g',   140,  6,  2, 25],
          ['Cafe solo',                 '200ml',   5,  0,  0,  1],
        ],
      },
      {
        name: 'COLACION ~11h',
        subtotal: { kcal: 252, prot: 6, grasas: 15, carbos: 26 },
        items: [
          ['Manzana',   '150g',  78, 0, 0, 21],
          ['Almendras', '30g',  174, 6, 15, 5],
        ],
      },
      {
        name: 'ALMUERZO',
        subtotal: { kcal: 507, prot: 53, grasas: 6, carbos: 55 },
        items: [
          ['Pechuga de pollo (cocida)', '150g', 248, 47, 5,  0],
          ['Arroz cocido',              '180g', 234,  5, 1, 51],
          ['Ensalada verde',            '100g',  25,  1, 0,  4],
        ],
      },
      {
        name: 'COLACION TARDE - Merienda pre-gym 21h',
        subtotal: { kcal: 340, prot: 11, grasas: 4, carbos: 67 },
        items: [
          ['Avena (seca)', '60g',  233, 10, 4, 40],
          ['Platano',      '120g', 107,  1, 0, 27],
        ],
      },
      {
        name: 'CENA - Post-workout',
        subtotal: { kcal: 454, prot: 52, grasas: 7, carbos: 42 },
        items: [
          ['Scop proteina Nico',      '30g',  114, 22, 1,  3],
          ['Yogur Nestle Protein x3', '300g', 340, 30, 6, 39],
        ],
      },
    ],
  },
  {
    colorKey: 'futbol',
    title: 'JUEVES - FUTBOLITO 21h | Deficit',
    tag: '[FUTBOL]',
    total: { kcal: 1898, prot: 144, grasas: 37, carbos: 238 },
    meals: [
      {
        name: 'DESAYUNO',
        subtotal: { kcal: 424, prot: 29, grasas: 21, carbos: 28 },
        items: [
          ['Huevos revueltos x3',       '180g',  279, 23, 19, 2],
          ['Pan integral x2 rebanadas', '60g',   140,  6,  2, 25],
          ['Cafe solo',                 '200ml',   5,  0,  0,  1],
        ],
      },
      {
        name: 'COLACION ~11h',
        subtotal: { kcal: 78, prot: 0, grasas: 0, carbos: 21 },
        items: [
          ['Manzana', '150g', 78, 0, 0, 21],
        ],
      },
      {
        name: 'ALMUERZO',
        subtotal: { kcal: 533, prot: 53, grasas: 6, carbos: 60 },
        items: [
          ['Pechuga de pollo (cocida)', '150g', 248, 47, 5,  0],
          ['Arroz cocido',              '200g', 260,  5, 1, 56],
          ['Ensalada verde',            '100g',  25,  1, 0,  4],
        ],
      },
      {
        name: 'COLACION TARDE - Pre-futbolito',
        subtotal: { kcal: 302, prot: 9, grasas: 3, carbos: 60 },
        items: [
          ['Avena (seca) + Platano [50g avena + 120g platano]', '170g', 302, 9, 3, 60],
        ],
      },
      {
        name: 'CENA',
        subtotal: { kcal: 561, prot: 53, grasas: 7, carbos: 69 },
        items: [
          ['Platano pre-juego',          '120g', 107,  1, 0, 27],
          ['Scop proteina Nico (PW)',     '30g',  114, 22, 1,  3],
          ['Yogur Nestle Protein x3 (PW)','300g', 340, 30, 6, 39],
        ],
      },
    ],
  },
  {
    colorKey: 'futbol',
    title: 'SABADO - PARTIDO 9:30h | Carga de Carbos',
    tag: '[FUTBOL]',
    total: { kcal: 2086, prot: 165, grasas: 36, carbos: 267 },
    meals: [
      {
        name: 'DESAYUNO - Pre-partido',
        subtotal: { kcal: 429, prot: 12, grasas: 4, carbos: 93 },
        items: [
          ['Platano x2',               '240g', 214, 3, 1, 54],
          ['Pan integral x3 rebanadas', '90g', 210, 9, 3, 38],
          ['Cafe solo',                '200ml',  5, 0, 0,  1],
        ],
      },
      {
        name: 'COLACION - Post-partido PW',
        subtotal: { kcal: 454, prot: 52, grasas: 7, carbos: 42 },
        items: [
          ['Scop proteina Nico',      '30g',  114, 22, 1,  3],
          ['Yogur Nestle Protein x3', '300g', 340, 30, 6, 39],
        ],
      },
      {
        name: 'ALMUERZO',
        subtotal: { kcal: 533, prot: 53, grasas: 6, carbos: 60 },
        items: [
          ['Pechuga de pollo (cocida)', '150g', 248, 47, 5,  0],
          ['Arroz cocido',              '200g', 260,  5, 1, 56],
          ['Ensalada verde',            '100g',  25,  1, 0,  4],
        ],
      },
      {
        name: 'COLACION TARDE',
        subtotal: { kcal: 252, prot: 6, grasas: 15, carbos: 26 },
        items: [
          ['Manzana + Almendras [150g + 30g]', '180g', 252, 6, 15, 26],
        ],
      },
      {
        name: 'CENA',
        subtotal: { kcal: 418, prot: 42, grasas: 4, carbos: 46 },
        items: [
          ['Pechuga de pollo (cocida)', '120g', 198, 37, 4,  0],
          ['Arroz cocido',              '150g', 195,  4, 0, 42],
          ['Ensalada verde',            '100g',  25,  1, 0,  4],
        ],
      },
    ],
  },
  {
    colorKey: 'gym',
    title: 'DOMINGO - GYM 12h | Deficit',
    tag: '[GYM]',
    total: { kcal: 2046, prot: 166, grasas: 65, carbos: 189 },
    meals: [
      {
        name: 'DESAYUNO',
        subtotal: { kcal: 424, prot: 29, grasas: 21, carbos: 28 },
        items: [
          ['Huevos revueltos x3',       '180g',  279, 23, 19, 2],
          ['Pan integral x2 rebanadas', '60g',   140,  6,  2, 25],
          ['Cafe solo',                 '200ml',   5,  0,  0,  1],
        ],
      },
      {
        name: 'COLACION - Pre-gym ~10:30h',
        subtotal: { kcal: 514, prot: 17, grasas: 19, carbos: 72 },
        items: [
          ['Avena (seca) + Platano [60g + 120g]', '180g', 340, 11, 4, 67],
          ['Almendras',                            '30g',  174,  6, 15, 5],
        ],
      },
      {
        name: 'ALMUERZO - Post-gym PW ~13:30h',
        subtotal: { kcal: 454, prot: 52, grasas: 7, carbos: 42 },
        items: [
          ['Scop proteina Nico',      '30g',  114, 22, 1,  3],
          ['Yogur Nestle Protein x3', '300g', 340, 30, 6, 39],
        ],
      },
      {
        name: 'COLACION TARDE ~16:30h',
        subtotal: { kcal: 443, prot: 51, grasas: 5, carbos: 42 },
        items: [
          ['Pechuga de pollo (cocida)', '150g', 248, 47, 5,  0],
          ['Arroz cocido',              '150g', 195,  4, 0, 42],
        ],
      },
      {
        name: 'CENA',
        subtotal: { kcal: 211, prot: 17, grasas: 13, carbos: 5 },
        items: [
          ['Ensalada verde + Huevos x2 [100g + 120g]', '220g', 211, 17, 13, 5],
        ],
      },
    ],
  },
  {
    colorKey: 'descanso',
    title: 'MIERCOLES - DESCANSO | Deficit',
    tag: '[DESCANSO]',
    total: { kcal: 1851, prot: 141, grasas: 60, carbos: 183 },
    meals: [
      {
        name: 'DESAYUNO',
        subtotal: { kcal: 424, prot: 29, grasas: 21, carbos: 28 },
        items: [
          ['Huevos revueltos x3',       '180g',  279, 23, 19, 2],
          ['Pan integral x2 rebanadas', '60g',   140,  6,  2, 25],
          ['Cafe solo',                 '200ml',   5,  0,  0,  1],
        ],
      },
      {
        name: 'COLACION ~11h',
        subtotal: { kcal: 252, prot: 6, grasas: 15, carbos: 26 },
        items: [
          ['Manzana',   '150g',  78, 0,  0, 21],
          ['Almendras', '30g',  174, 6, 15,  5],
        ],
      },
      {
        name: 'ALMUERZO',
        subtotal: { kcal: 507, prot: 53, grasas: 6, carbos: 55 },
        items: [
          ['Pechuga de pollo (cocida)', '150g', 248, 47, 5,  0],
          ['Arroz cocido',              '180g', 234,  5, 1, 51],
          ['Ensalada verde',            '100g',  25,  1, 0,  4],
        ],
      },
      {
        name: 'COLACION TARDE',
        subtotal: { kcal: 302, prot: 9, grasas: 3, carbos: 60 },
        items: [
          ['Avena (seca) + Platano [50g + 120g]', '170g', 302, 9, 3, 60],
        ],
      },
      {
        name: 'CENA',
        subtotal: { kcal: 366, prot: 44, grasas: 15, carbos: 14 },
        items: [
          ['Atun al agua',          '100g',  110, 25,  1,  0],
          ['Huevos x2',             '120g',  186, 16, 13,  1],
          ['Pan integral x1 rebanada', '30g',  70,  3,  1, 13],
        ],
      },
    ],
  },
  {
    colorKey: 'viernes',
    title: 'VIERNES - CARGA CARBOS (pre-Sabado)',
    tag: '[CARBOS]',
    total: { kcal: 2156, prot: 164, grasas: 24, carbos: 317 },
    meals: [
      {
        name: 'DESAYUNO',
        subtotal: { kcal: 384, prot: 13, grasas: 5, carbos: 74 },
        items: [
          ['Avena (seca) + Platano [70g + 120g]', '190g', 379, 13, 5, 73],
          ['Cafe solo',                           '200ml',  5,  0, 0,  1],
        ],
      },
      {
        name: 'COLACION ~11h',
        subtotal: { kcal: 218, prot: 6, grasas: 2, carbos: 46 },
        items: [
          ['Pan x2 rebanadas + Manzana [60g + 150g]', '210g', 218, 6, 2, 46],
        ],
      },
      {
        name: 'ALMUERZO',
        subtotal: { kcal: 589, prot: 60, grasas: 7, carbos: 66 },
        items: [
          ['Pechuga de pollo (cocida)', '150g', 248, 47, 5,  0],
          ['Fideos cocidos',            '200g', 316, 12, 2, 62],
          ['Ensalada verde',            '100g',  25,  1, 0,  4],
        ],
      },
      {
        name: 'COLACION TARDE - Pre-gym',
        subtotal: { kcal: 107, prot: 1, grasas: 0, carbos: 27 },
        items: [
          ['Platano', '120g', 107, 1, 0, 27],
        ],
      },
      {
        name: 'CENA - Post-workout + Carbos',
        subtotal: { kcal: 858, prot: 84, grasas: 10, carbos: 104 },
        items: [
          ['Scop proteina Nico',                   '30g',  114, 22, 1,  3],
          ['Yogur Nestle Protein x3',              '300g', 340, 30, 6, 39],
          ['Fideos con atun [200g fideos + 80g atun]', '280g', 404, 32, 3, 62],
        ],
      },
    ],
  },
];

const summaryData = [
  { dia: 'Gym 19h - Lun/Mar', kcal: 2086, prot: 164, grasas: 65, carbos: 206 },
  { dia: 'Gym 21h - Lun/Mar', kcal: 1977, prot: 151, grasas: 53, carbos: 218 },
  { dia: 'Futbolito Jue 21h', kcal: 1898, prot: 144, grasas: 37, carbos: 238 },
  { dia: 'Futbol Sab 9:30h',  kcal: 2086, prot: 165, grasas: 36, carbos: 267 },
  { dia: 'Gym Dom 12h',       kcal: 2046, prot: 166, grasas: 65, carbos: 189 },
  { dia: 'Descanso Mie',      kcal: 1851, prot: 141, grasas: 60, carbos: 183 },
  { dia: 'Viernes Carbos',    kcal: 2156, prot: 164, grasas: 24, carbos: 317 },
];

// ─── PDF helpers ─────────────────────────────────────────────────────────────

// Parse hex color to 0..1 RGB for pdfkit
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function setFill(doc, hex) {
  const [r, g, b] = hexToRgb(hex);
  doc.fillColor([r * 255, g * 255, b * 255].map(Math.round));
}

// Draws a filled rectangle with hex color
function fillRect(doc, x, y, w, h, hex) {
  doc.save().rect(x, y, w, h).fill(hex).restore();
}

// Draw text centered in a box
function centeredText(doc, text, x, y, w, opts = {}) {
  doc.text(text, x, y, { width: w, align: 'center', ...opts });
}

// ─── Page layout constants ────────────────────────────────────────────────────
const PAGE_W = 595.28;  // A4 points
const PAGE_H = 841.89;
const MARGIN = 30;
const CONTENT_W = PAGE_W - MARGIN * 2;

const HEADER_H = 70;
const FOOTER_H = 25;
const FOOTER_Y = PAGE_H - FOOTER_H - 10;

// Table column widths (total = CONTENT_W)
// Alimento | g/ml | kcal | Prot | Grasas | Carbos
const COL_WIDTHS = [220, 55, 60, 55, 60, 65];  // sum = 515 = CONTENT_W at 30pt margin

function drawHeader(doc, day, pageNum) {
  const colors = COLORS[day.colorKey];
  // Background bar
  fillRect(doc, 0, 0, PAGE_W, HEADER_H, colors.header);

  // Tag pill
  const tagW = 70;
  fillRect(doc, MARGIN, 12, tagW, 20, colors.accent);
  doc.font('Helvetica-Bold').fontSize(8).fillColor('white');
  centeredText(doc, day.tag, MARGIN, 18, tagW);

  // Title
  doc.font('Helvetica-Bold').fontSize(16).fillColor('white');
  doc.text(day.title, MARGIN + tagW + 8, 16, { width: CONTENT_W - tagW - 8 });

  // Legend line
  doc.font('Helvetica').fontSize(7).fillColor('white');
  doc.text('Pollo/Arroz/Fideos = peso COCIDO  |  Avena = peso SECO', MARGIN, 50, { width: CONTENT_W });
}

function drawFooter(doc, pageNum) {
  fillRect(doc, 0, PAGE_H - 30, PAGE_W, 30, '#1c1c1c');
  doc.font('Helvetica').fontSize(8).fillColor('white');
  doc.text('NM Training  |  Plan Deficit Alta Proteina  |  2026', MARGIN, PAGE_H - 20, { width: CONTENT_W - 60 });
  doc.text(`Pag. ${pageNum}`, PAGE_W - MARGIN - 60, PAGE_H - 20, { width: 60, align: 'right' });
}

function drawTotalsBox(doc, total, accentColor, y) {
  const boxH = 36;
  fillRect(doc, MARGIN, y, CONTENT_W, boxH, accentColor);

  const colW = CONTENT_W / 4;
  const labels = ['TOTAL KCAL', 'PROTEINA', 'GRASAS', 'CARBOS'];
  const vals   = [`${total.kcal} kcal`, `${total.prot} g`, `${total.grasas} g`, `${total.carbos} g`];

  for (let i = 0; i < 4; i++) {
    const cx = MARGIN + colW * i;
    doc.font('Helvetica').fontSize(7).fillColor('white');
    centeredText(doc, labels[i], cx, y + 5, colW);
    doc.font('Helvetica-Bold').fontSize(14).fillColor('white');
    centeredText(doc, vals[i], cx, y + 14, colW);
  }

  return y + boxH + 8;
}

function drawTableHeader(doc, x, y, accentColor) {
  const headers = ['Alimento', 'g / ml', 'kcal', 'Prot (g)', 'Grasas (g)', 'Carbos (g)'];
  const rowH = 16;
  fillRect(doc, x, y, CONTENT_W, rowH, '#333333');

  let cx = x;
  for (let i = 0; i < headers.length; i++) {
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('white');
    const align = i === 0 ? 'left' : 'center';
    const xOff = i === 0 ? 4 : 0;
    doc.text(headers[i], cx + xOff, y + 4, { width: COL_WIDTHS[i], align });
    cx += COL_WIDTHS[i];
  }
  return y + rowH;
}

function drawTableRow(doc, x, y, rowData, isEven, isSubtotal = false) {
  const rowH = isSubtotal ? 14 : 14;
  const bg = isSubtotal ? '#d5d8dc' : (isEven ? '#eaf4fb' : '#ffffff');
  fillRect(doc, x, y, CONTENT_W, rowH, bg);

  // thin border
  doc.save().rect(x, y, CONTENT_W, rowH).stroke('#cccccc').restore();

  const font = isSubtotal ? 'Helvetica-Bold' : 'Helvetica';
  const fontSize = 7.5;

  let cx = x;
  doc.font(font).fontSize(fontSize).fillColor('#1a1a1a');

  // Alimento (col 0) — left aligned, allow wrap
  doc.text(rowData[0], cx + 3, y + 2, { width: COL_WIDTHS[0] - 4, lineBreak: false, ellipsis: true });
  cx += COL_WIDTHS[0];

  for (let i = 1; i < rowData.length; i++) {
    doc.text(String(rowData[i]), cx, y + 2, { width: COL_WIDTHS[i], align: 'center', lineBreak: false });
    cx += COL_WIDTHS[i];
  }

  return y + rowH;
}

function drawMeal(doc, meal, accentColor, x, y) {
  const mealHeaderH = 18;

  // Meal name subheader
  fillRect(doc, x, y, CONTENT_W, mealHeaderH, accentColor);
  doc.font('Helvetica-Bold').fontSize(9).fillColor('white');
  const subtotalStr = `${meal.subtotal.kcal} kcal  |  P:${meal.subtotal.prot}g  G:${meal.subtotal.grasas}g  C:${meal.subtotal.carbos}g`;
  doc.text(meal.name.toUpperCase(), x + 6, y + 4, { width: CONTENT_W * 0.55 });
  doc.font('Helvetica').fontSize(8).fillColor('white');
  doc.text(subtotalStr, x + CONTENT_W * 0.57, y + 5, { width: CONTENT_W * 0.41, align: 'right' });

  y += mealHeaderH;
  y = drawTableHeader(doc, x, y, accentColor);

  let rowIdx = 0;
  for (const item of meal.items) {
    y = drawTableRow(doc, x, y, item, rowIdx % 2 === 1);
    rowIdx++;
  }

  // Subtotal row
  const subtotalRow = [
    'SUBTOTAL',
    '',
    meal.subtotal.kcal,
    meal.subtotal.prot,
    meal.subtotal.grasas,
    meal.subtotal.carbos,
  ];
  y = drawTableRow(doc, x, y, subtotalRow, false, true);

  return y + 6;  // gap after meal
}

// ─── Main PDF generation ──────────────────────────────────────────────────────

const doc = new PDFDocument({
  size: 'A4',
  margin: 0,
  info: {
    Title: 'Calendario Nutricional Semanal',
    Author: 'NM Training',
    Subject: 'Plan Deficit Alta Proteina 2026',
  },
});

const stream = fs.createWriteStream(OUTPUT_PATH);
doc.pipe(stream);

// ─── Day pages ───────────────────────────────────────────────────────────────
days.forEach((day, idx) => {
  if (idx > 0) doc.addPage({ size: 'A4', margin: 0 });

  const pageNum = idx + 1;
  const colors = COLORS[day.colorKey];

  drawHeader(doc, day, pageNum);
  drawFooter(doc, pageNum);

  let y = HEADER_H + 10;

  y = drawTotalsBox(doc, day.total, colors.accent, y);

  for (const meal of day.meals) {
    // Check if we have space (rough estimate: 14px per item + 50 overhead)
    const mealH = 18 + 16 + meal.items.length * 14 + 14 + 6;
    if (y + mealH > FOOTER_Y - 10) {
      // Overflow protection — shouldn't happen with this data but just in case
      break;
    }
    y = drawMeal(doc, meal, colors.accent, MARGIN, y);
  }
});

// ─── Summary page ─────────────────────────────────────────────────────────────
doc.addPage({ size: 'A4', margin: 0 });

// Summary header
fillRect(doc, 0, 0, PAGE_W, HEADER_H, '#1c2833');
doc.font('Helvetica-Bold').fontSize(22).fillColor('white');
centeredText(doc, 'RESUMEN SEMANAL', 0, 20, PAGE_W);
doc.font('Helvetica').fontSize(10).fillColor('#aab7b8');
centeredText(doc, 'NM Training  |  Plan Deficit Alta Proteina  |  2026', 0, 46, PAGE_W);

drawFooter(doc, 8);

let y = HEADER_H + 20;

// Summary table header
const SUM_COL_W = [195, 80, 85, 80, 80];  // Dia | kcal | Prot | Grasas | Carbos
const sumX = MARGIN + (CONTENT_W - SUM_COL_W.reduce((a, b) => a + b, 0)) / 2;
const sumHeaders = ['DIA', 'KCAL', 'PROTEINA (g)', 'GRASAS (g)', 'CARBOS (g)'];

// Table header row
fillRect(doc, sumX, y, SUM_COL_W.reduce((a, b) => a + b, 0), 22, '#1c2833');
let cx = sumX;
for (let i = 0; i < sumHeaders.length; i++) {
  doc.font('Helvetica-Bold').fontSize(9).fillColor('white');
  doc.text(sumHeaders[i], cx + 4, y + 6, { width: SUM_COL_W[i] - 4, align: i === 0 ? 'left' : 'center' });
  cx += SUM_COL_W[i];
}
y += 22;

// Day color mapping for summary
const dayColors = ['gym', 'gym', 'futbol', 'futbol', 'gym', 'descanso', 'viernes'];

summaryData.forEach((row, i) => {
  const rowH = 28;
  const bg = i % 2 === 0 ? '#f2f3f4' : '#ffffff';
  fillRect(doc, sumX, y, SUM_COL_W.reduce((a, b) => a + b, 0), rowH, bg);

  // Left accent stripe
  fillRect(doc, sumX, y, 5, rowH, COLORS[dayColors[i]].accent);

  cx = sumX;
  // Dia
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#1c2833');
  doc.text(row.dia, cx + 10, y + 8, { width: SUM_COL_W[0] - 10 });
  cx += SUM_COL_W[0];

  const vals = [row.kcal, row.prot, row.grasas, row.carbos];
  const valColors = ['#1a5276', '#145a32', '#784212', '#4a235a'];
  for (let j = 0; j < vals.length; j++) {
    doc.font('Helvetica-Bold').fontSize(13).fillColor(valColors[j]);
    doc.text(String(vals[j]), cx, y + 6, { width: SUM_COL_W[j + 1], align: 'center' });
    cx += SUM_COL_W[j + 1];
  }

  // border
  const totalSumW = SUM_COL_W.reduce((a, b) => a + b, 0);
  doc.save().rect(sumX, y, totalSumW, rowH).stroke('#dddddd').restore();

  y += rowH;
});

// Averages row
y += 4;
const totalSumW = SUM_COL_W.reduce((a, b) => a + b, 0);
const avgKcal = Math.round(summaryData.reduce((a, r) => a + r.kcal, 0) / 7);
const avgProt = Math.round(summaryData.reduce((a, r) => a + r.prot, 0) / 7);
const avgGrasas = Math.round(summaryData.reduce((a, r) => a + r.grasas, 0) / 7);
const avgCarbos = Math.round(summaryData.reduce((a, r) => a + r.carbos, 0) / 7);

fillRect(doc, sumX, y, totalSumW, 26, '#2c3e50');
cx = sumX;
doc.font('Helvetica-Bold').fontSize(9).fillColor('white');
doc.text('PROMEDIO SEMANAL', cx + 10, y + 7, { width: SUM_COL_W[0] - 10 });
cx += SUM_COL_W[0];
const avgVals = [avgKcal, avgProt, avgGrasas, avgCarbos];
for (let j = 0; j < avgVals.length; j++) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#f39c12');
  doc.text(String(avgVals[j]), cx, y + 7, { width: SUM_COL_W[j + 1], align: 'center' });
  cx += SUM_COL_W[j + 1];
}
y += 26;

// ─── Note box ─────────────────────────────────────────────────────────────────
y += 20;
const noteBoxH = 80;
fillRect(doc, MARGIN, y, CONTENT_W, noteBoxH, '#fef9e7');
doc.save().rect(MARGIN, y, CONTENT_W, noteBoxH).stroke('#f39c12').restore();
// Left border accent
fillRect(doc, MARGIN, y, 5, noteBoxH, '#f39c12');

doc.font('Helvetica-Bold').fontSize(9).fillColor('#784212');
doc.text('ESTADOS DE LOS ALIMENTOS', MARGIN + 12, y + 8, { width: CONTENT_W - 20 });

doc.font('Helvetica').fontSize(8).fillColor('#333333');
const noteText = [
  'Pollo = peso COCIDO (165 kcal/100g)',
  'Arroz = peso COCIDO (130 kcal/100g)',
  'Fideos = peso COCIDO (158 kcal/100g)',
  'Avena = peso SECO (389 kcal/100g)',
  'Huevo = 93 kcal por unidad (60g)',
  'Pan integral = 70 kcal por rebanada (30g)',
];

// Two columns of notes
const mid = Math.ceil(noteText.length / 2);
const col1 = noteText.slice(0, mid);
const col2 = noteText.slice(mid);
const noteColW = (CONTENT_W - 20) / 2;

col1.forEach((line, i) => {
  doc.text('• ' + line, MARGIN + 12, y + 22 + i * 13, { width: noteColW });
});
col2.forEach((line, i) => {
  doc.text('• ' + line, MARGIN + 12 + noteColW, y + 22 + i * 13, { width: noteColW });
});

// ─── Color legend ─────────────────────────────────────────────────────────────
y += noteBoxH + 16;
doc.font('Helvetica-Bold').fontSize(9).fillColor('#1c2833');
doc.text('LEYENDA DE COLORES:', MARGIN, y);
y += 14;

const legends = [
  { label: 'Dia de Gym', color: COLORS.gym.header },
  { label: 'Futbol / Futbolito', color: COLORS.futbol.header },
  { label: 'Dia de Descanso', color: COLORS.descanso.header },
  { label: 'Viernes Carbos', color: COLORS.viernes.header },
];
const legColW = CONTENT_W / legends.length;
legends.forEach((leg, i) => {
  const lx = MARGIN + i * legColW;
  fillRect(doc, lx, y, legColW - 8, 20, leg.color);
  doc.font('Helvetica').fontSize(8).fillColor('white');
  centeredText(doc, leg.label, lx, y + 5, legColW - 8);
});

doc.end();

stream.on('finish', () => {
  const stats = fs.statSync(OUTPUT_PATH);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log(`PDF generated successfully!`);
  console.log(`Path: ${OUTPUT_PATH}`);
  console.log(`Size: ${sizeKB} KB (${stats.size} bytes)`);
});

stream.on('error', (err) => {
  console.error('Error writing PDF:', err);
  process.exit(1);
});
