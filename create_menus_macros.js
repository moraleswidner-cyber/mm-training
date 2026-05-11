// create_menus_macros.js — generates menus_macros.xlsx using exceljs
const ExcelJS = require('exceljs');
const path = require('path');

const OUTPUT = path.join('C:\\nm-training', 'menus_macros.xlsx');

const BLUE_HEADER   = 'BDD7EE';
const ALT_ROW       = 'F2F2F2';
const SUBTOTAL_BG   = 'E2EFDA';
const TAB_BLUE      = '4472C4';
const TAB_GREEN     = '70AD47';

const thinBorder = {
  top:    { style: 'thin' },
  left:   { style: 'thin' },
  bottom: { style: 'thin' },
  right:  { style: 'thin' },
};

function headerFill() {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + BLUE_HEADER } };
}
function altFill() {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + ALT_ROW } };
}
function subtotalFill() {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + SUBTOTAL_BG } };
}
function headerFont() {
  return { name: 'Arial', size: 10, bold: true };
}
function regularFont() {
  return { name: 'Arial', size: 10, bold: false };
}
function boldFont() {
  return { name: 'Arial', size: 10, bold: true };
}

async function main() {
  const wb = new ExcelJS.Workbook();

  // ─── RESUMEN ────────────────────────────────────────────────────────────
  const wsr = wb.addWorksheet('Resumen', { properties: { tabColor: { argb: 'FF' + TAB_BLUE } } });

  const resumenHeaders = ['Menú', 'kcal Total', 'Proteína (g)', 'Grasas (g)', 'Carbos (g)'];
  const resumenData = [
    ['🏋️ Gym 19h — Déficit', 2086, 164, 65, 206],
    ['🏋️ Gym 21h — Déficit', 1977, 151, 53, 218],
    ['⚽ Futbolito Jue 21h',  1898, 144, 37, 238],
    ['⚽ Fútbol Sáb 9:30h',   2086, 165, 36, 267],
    ['🏋️ Gym Dom 12h',        2046, 166, 65, 189],
    ['😴 Descanso Mié',       1851, 141, 60, 183],
    ['🍝 Viernes Carga Carbos', 2156, 164, 24, 317],
  ];

  // Header row
  const hRow = wsr.getRow(1);
  resumenHeaders.forEach((h, i) => {
    const cell = hRow.getCell(i + 1);
    cell.value = h;
    cell.font = headerFont();
    cell.fill = headerFill();
    cell.border = thinBorder;
    cell.alignment = { horizontal: i === 0 ? 'left' : 'center' };
  });
  hRow.commit();

  // Data rows
  resumenData.forEach((row, ri) => {
    const excelRow = wsr.getRow(ri + 2);
    const isEven = ((ri + 2) % 2 === 0);
    row.forEach((val, ci) => {
      const cell = excelRow.getCell(ci + 1);
      cell.value = val;
      cell.font = regularFont();
      cell.fill = isEven ? altFill() : { type: 'pattern', pattern: 'none' };
      cell.border = thinBorder;
      cell.alignment = { horizontal: ci === 0 ? 'left' : 'right' };
    });
    excelRow.commit();
  });

  // Column widths
  wsr.getColumn(1).width = 32;
  for (let c = 2; c <= 5; c++) wsr.getColumn(c).width = 14;

  // Freeze row 1
  wsr.views = [{ state: 'frozen', ySplit: 1 }];

  // ─── DETALLE ────────────────────────────────────────────────────────────
  const wsd = wb.addWorksheet('Detalle', { properties: { tabColor: { argb: 'FF' + TAB_GREEN } } });

  const detaleHeaders = ['Menú', 'Comida', 'Alimento', 'Cantidad (g)', 'kcal', 'Prot (g)', 'Gras (g)', 'Carb (g)'];

  const dhRow = wsd.getRow(1);
  detaleHeaders.forEach((h, i) => {
    const cell = dhRow.getCell(i + 1);
    cell.value = h;
    cell.font = headerFont();
    cell.fill = headerFill();
    cell.border = thinBorder;
    cell.alignment = { horizontal: i >= 3 ? 'right' : 'left' };
  });
  dhRow.commit();

  // Detalle rows: [rowNum, isSubtotal, [8 values]]
  const detalleRows = [
    // Gym 19h
    [2,  false, ['🏋️ Gym 19h', 'desayuno',  'Huevos revueltos ×3',    180, 279, 23, 19, 2]],
    [3,  false, ['🏋️ Gym 19h', 'desayuno',  'Pan integral ×2 taj',     60, 140,  6,  2, 25]],
    [4,  false, ['🏋️ Gym 19h', 'desayuno',  'Café solo',              200,   5,  0,  0,  1]],
    [5,  false, ['🏋️ Gym 19h', 'colacion1', 'Manzana',                150,  78,  0,  0, 21]],
    [6,  false, ['🏋️ Gym 19h', 'colacion1', 'Almendras 30g',           30, 174,  6, 15,  5]],
    [7,  false, ['🏋️ Gym 19h', 'almuerzo',  'Pechuga de pollo 150g',  150, 248, 47,  5,  0]],
    [8,  false, ['🏋️ Gym 19h', 'almuerzo',  'Arroz cocido 180g',      180, 234,  5,  1, 51]],
    [9,  false, ['🏋️ Gym 19h', 'almuerzo',  'Ensalada verde',         100,  25,  1,  0,  4]],
    [10, false, ['🏋️ Gym 19h', 'colacion2', 'Plátano pre-gym',        120, 107,  1,  0, 27]],
    [11, false, ['🏋️ Gym 19h', 'colacion2', 'Avena 40g pre-gym',       40, 156,  7,  3, 27]],
    [12, false, ['🏋️ Gym 19h', 'cena',      'Scop Nico 30g (PW)',      30, 114, 22,  1,  3]],
    [13, false, ['🏋️ Gym 19h', 'cena',      'Yogur Nestlé ×3 (PW)',   300, 340, 30,  6, 39]],
    [14, false, ['🏋️ Gym 19h', 'cena',      'Huevos ×2 cena',         120, 186, 16, 13,  1]],
    [15, true,  ['SUBTOTAL Gym 19h', '', '', null, 2086, 164, 65, 206]],
    // Gym 21h
    [16, false, ['🏋️ Gym 21h', 'desayuno',  'Huevos revueltos ×3',    180, 279, 23, 19, 2]],
    [17, false, ['🏋️ Gym 21h', 'desayuno',  'Pan integral ×2 taj',     60, 140,  6,  2, 25]],
    [18, false, ['🏋️ Gym 21h', 'desayuno',  'Café solo',              200,   5,  0,  0,  1]],
    [19, false, ['🏋️ Gym 21h', 'colacion1', 'Manzana',                150,  78,  0,  0, 21]],
    [20, false, ['🏋️ Gym 21h', 'colacion1', 'Almendras 30g',           30, 174,  6, 15,  5]],
    [21, false, ['🏋️ Gym 21h', 'almuerzo',  'Pechuga de pollo 150g',  150, 248, 47,  5,  0]],
    [22, false, ['🏋️ Gym 21h', 'almuerzo',  'Arroz cocido 180g',      180, 234,  5,  1, 51]],
    [23, false, ['🏋️ Gym 21h', 'almuerzo',  'Ensalada verde',         100,  25,  1,  0,  4]],
    [24, false, ['🏋️ Gym 21h', 'colacion2', 'Avena 60g merienda',      60, 233, 10,  4, 40]],
    [25, false, ['🏋️ Gym 21h', 'colacion2', 'Plátano pre-gym 19:30',  120, 107,  1,  0, 27]],
    [26, false, ['🏋️ Gym 21h', 'cena',      'Scop Nico 30g (PW)',      30, 114, 22,  1,  3]],
    [27, false, ['🏋️ Gym 21h', 'cena',      'Yogur Nestlé ×3 (PW)',   300, 340, 30,  6, 39]],
    [28, true,  ['SUBTOTAL Gym 21h', '', '', null, 1977, 151, 53, 218]],
    // Futbolito Jue
    [29, false, ['⚽ Futbolito Jue', 'desayuno',  'Huevos revueltos ×3',   180, 279, 23, 19, 2]],
    [30, false, ['⚽ Futbolito Jue', 'desayuno',  'Pan integral ×2 taj',    60, 140,  6,  2, 25]],
    [31, false, ['⚽ Futbolito Jue', 'desayuno',  'Café solo',             200,   5,  0,  0,  1]],
    [32, false, ['⚽ Futbolito Jue', 'colacion1', 'Manzana',               150,  78,  0,  0, 21]],
    [33, false, ['⚽ Futbolito Jue', 'almuerzo',  'Pechuga de pollo 150g', 150, 248, 47,  5,  0]],
    [34, false, ['⚽ Futbolito Jue', 'almuerzo',  'Arroz cocido 200g',     200, 260,  5,  1, 56]],
    [35, false, ['⚽ Futbolito Jue', 'almuerzo',  'Ensalada verde',        100,  25,  1,  0,  4]],
    [36, false, ['⚽ Futbolito Jue', 'colacion2', 'Avena 50g + Plátano',   170, 302,  9,  3, 60]],
    [37, false, ['⚽ Futbolito Jue', 'cena',      'Plátano pre-juego',     120, 107,  1,  0, 27]],
    [38, false, ['⚽ Futbolito Jue', 'cena',      'Scop Nico 30g (PW)',     30, 114, 22,  1,  3]],
    [39, false, ['⚽ Futbolito Jue', 'cena',      'Yogur Nestlé ×3 (PW)',  300, 340, 30,  6, 39]],
    [40, true,  ['SUBTOTAL Futbolito Jue', '', '', null, 1898, 144, 37, 238]],
    // Fútbol Sáb
    [41, false, ['⚽ Fútbol Sáb', 'desayuno',  'Plátano ×2 pre-partido', 240, 214,  3,  1, 54]],
    [42, false, ['⚽ Fútbol Sáb', 'desayuno',  'Pan integral ×3 taj',     90, 210,  9,  3, 38]],
    [43, false, ['⚽ Fútbol Sáb', 'desayuno',  'Café solo',              200,   5,  0,  0,  1]],
    [44, false, ['⚽ Fútbol Sáb', 'colacion1', 'Scop Nico 30g (PW)',      30, 114, 22,  1,  3]],
    [45, false, ['⚽ Fútbol Sáb', 'colacion1', 'Yogur Nestlé ×3 (PW)',   300, 340, 30,  6, 39]],
    [46, false, ['⚽ Fútbol Sáb', 'almuerzo',  'Pechuga de pollo 150g',  150, 248, 47,  5,  0]],
    [47, false, ['⚽ Fútbol Sáb', 'almuerzo',  'Arroz cocido 200g',      200, 260,  5,  1, 56]],
    [48, false, ['⚽ Fútbol Sáb', 'almuerzo',  'Ensalada verde',         100,  25,  1,  0,  4]],
    [49, false, ['⚽ Fútbol Sáb', 'colacion2', 'Manzana + Almendras',    180, 252,  6, 15, 26]],
    [50, false, ['⚽ Fútbol Sáb', 'cena',      'Pechuga de pollo 120g',  120, 198, 37,  4,  0]],
    [51, false, ['⚽ Fútbol Sáb', 'cena',      'Arroz cocido 150g',      150, 195,  4,  0, 42]],
    [52, false, ['⚽ Fútbol Sáb', 'cena',      'Ensalada verde cena',    100,  25,  1,  0,  4]],
    [53, true,  ['SUBTOTAL Fútbol Sáb', '', '', null, 2086, 165, 36, 267]],
    // Gym Dom
    [54, false, ['🏋️ Gym Dom', 'desayuno',  'Huevos revueltos ×3',   180, 279, 23, 19, 2]],
    [55, false, ['🏋️ Gym Dom', 'desayuno',  'Pan integral ×2 taj',    60, 140,  6,  2, 25]],
    [56, false, ['🏋️ Gym Dom', 'desayuno',  'Café solo',             200,   5,  0,  0,  1]],
    [57, false, ['🏋️ Gym Dom', 'colacion1', 'Avena 60g + Plátano',   180, 340, 11,  4, 67]],
    [58, false, ['🏋️ Gym Dom', 'colacion1', 'Almendras 30g',          30, 174,  6, 15,  5]],
    [59, false, ['🏋️ Gym Dom', 'almuerzo',  'Scop Nico 30g (PW)',     30, 114, 22,  1,  3]],
    [60, false, ['🏋️ Gym Dom', 'almuerzo',  'Yogur Nestlé ×3 (PW)', 300, 340, 30,  6, 39]],
    [61, false, ['🏋️ Gym Dom', 'colacion2', 'Pechuga de pollo 150g', 150, 248, 47,  5,  0]],
    [62, false, ['🏋️ Gym Dom', 'colacion2', 'Arroz cocido 150g',     150, 195,  4,  0, 42]],
    [63, false, ['🏋️ Gym Dom', 'cena',      'Ensalada + Huevos ×2',  220, 211, 17, 13,  5]],
    [64, true,  ['SUBTOTAL Gym Dom', '', '', null, 2046, 166, 65, 189]],
    // Descanso Mié
    [65, false, ['😴 Descanso Mié', 'desayuno',  'Huevos revueltos ×3',   180, 279, 23, 19, 2]],
    [66, false, ['😴 Descanso Mié', 'desayuno',  'Pan integral ×2 taj',    60, 140,  6,  2, 25]],
    [67, false, ['😴 Descanso Mié', 'desayuno',  'Café solo',             200,   5,  0,  0,  1]],
    [68, false, ['😴 Descanso Mié', 'colacion1', 'Manzana',               150,  78,  0,  0, 21]],
    [69, false, ['😴 Descanso Mié', 'colacion1', 'Almendras 30g',          30, 174,  6, 15,  5]],
    [70, false, ['😴 Descanso Mié', 'almuerzo',  'Pechuga de pollo 150g', 150, 248, 47,  5,  0]],
    [71, false, ['😴 Descanso Mié', 'almuerzo',  'Arroz cocido 180g',     180, 234,  5,  1, 51]],
    [72, false, ['😴 Descanso Mié', 'almuerzo',  'Ensalada verde',        100,  25,  1,  0,  4]],
    [73, false, ['😴 Descanso Mié', 'colacion2', 'Avena 50g + Plátano',   170, 302,  9,  3, 60]],
    [74, false, ['😴 Descanso Mié', 'cena',      'Atún al agua 100g',     100, 110, 25,  1,  0]],
    [75, false, ['😴 Descanso Mié', 'cena',      'Huevos ×2',             120, 186, 16, 13,  1]],
    [76, false, ['😴 Descanso Mié', 'cena',      'Pan integral ×1 taj',    30,  70,  3,  1, 13]],
    [77, true,  ['SUBTOTAL Descanso Mié', '', '', null, 1851, 141, 60, 183]],
    // Viernes Carbos
    [78, false, ['🍝 Viernes Carbos', 'desayuno',  'Avena 70g + Plátano',    190, 379, 13,  5, 73]],
    [79, false, ['🍝 Viernes Carbos', 'desayuno',  'Café solo',              200,   5,  0,  0,  1]],
    [80, false, ['🍝 Viernes Carbos', 'colacion1', 'Pan ×2 + Fruta',         210, 218,  6,  2, 46]],
    [81, false, ['🍝 Viernes Carbos', 'almuerzo',  'Pechuga de pollo 150g',  150, 248, 47,  5,  0]],
    [82, false, ['🍝 Viernes Carbos', 'almuerzo',  'Fideos cocidos 200g',    200, 316, 12,  2, 62]],
    [83, false, ['🍝 Viernes Carbos', 'almuerzo',  'Ensalada verde',         100,  25,  1,  0,  4]],
    [84, false, ['🍝 Viernes Carbos', 'colacion2', 'Plátano pre-gym',        120, 107,  1,  0, 27]],
    [85, false, ['🍝 Viernes Carbos', 'cena',      'Scop Nico 30g (PW)',      30, 114, 22,  1,  3]],
    [86, false, ['🍝 Viernes Carbos', 'cena',      'Yogur Nestlé ×3 (PW)',   300, 340, 30,  6, 39]],
    [87, false, ['🍝 Viernes Carbos', 'cena',      'Fideos con atún',         280, 404, 32,  3, 62]],
    [88, true,  ['SUBTOTAL Viernes Carbos', '', '', null, 2156, 164, 24, 317]],
  ];

  for (const [rowNum, isSubtotal, values] of detalleRows) {
    const excelRow = wsd.getRow(rowNum);
    const isOdd = (rowNum % 2 !== 0);

    if (isSubtotal) {
      // Subtotal: bold, green bg, right-align cols 4+
      values.forEach((val, ci) => {
        const cell = excelRow.getCell(ci + 1);
        cell.value = (val === '') ? null : val;
        cell.font = boldFont();
        cell.fill = subtotalFill();
        cell.border = thinBorder;
        cell.alignment = { horizontal: ci >= 3 ? 'right' : 'left' };
      });
    } else {
      // Regular row: alternate shading on odd rows
      const fill = isOdd ? altFill() : { type: 'pattern', pattern: 'none' };
      values.forEach((val, ci) => {
        const cell = excelRow.getCell(ci + 1);
        cell.value = val;
        cell.font = regularFont();
        cell.fill = fill;
        cell.border = thinBorder;
        cell.alignment = { horizontal: ci >= 3 ? 'right' : 'left' };
      });
    }
    excelRow.commit();
  }

  // Column widths Detalle: A=28, B=16, C=30, D=14, E-H=10
  const dWidths = [28, 16, 30, 14, 10, 10, 10, 10];
  dWidths.forEach((w, i) => { wsd.getColumn(i + 1).width = w; });

  // Freeze row 1
  wsd.views = [{ state: 'frozen', ySplit: 1 }];

  await wb.xlsx.writeFile(OUTPUT);
  console.log('Saved:', OUTPUT);

  const fs = require('fs');
  const stat = fs.statSync(OUTPUT);
  console.log('File exists:', fs.existsSync(OUTPUT));
  console.log('File size:', stat.size, 'bytes');
}

main().catch(err => { console.error(err); process.exit(1); });
