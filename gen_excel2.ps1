[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# ── Leer menu del 20 de abril ──
$m = Get-Content 'C:\nm-training\menu_abril20.json' -Raw | ConvertFrom-Json
$items = $m.items.arrayValue.values

$menuRows = @()
foreach($it in $items){
    $f = $it.mapValue.fields
    $nombre  = if($f.nombre.stringValue){$f.nombre.stringValue}else{''}
    $comida  = if($f.comida.stringValue){$f.comida.stringValue}else{''}
    $cant    = if($f.cantidad.doubleValue){$f.cantidad.doubleValue}elseif($f.cantidad.integerValue){[double]$f.cantidad.integerValue}else{0}
    $cantU   = if($f.cantUnidades.doubleValue){$f.cantUnidades.doubleValue}elseif($f.cantUnidades.integerValue){[double]$f.cantUnidades.integerValue}else{''}
    $unitN   = if($f.unitNombre.stringValue){$f.unitNombre.stringValue}else{''}
    $cal  = if($f.cal.doubleValue){$f.cal.doubleValue}elseif($f.cal.integerValue){[double]$f.cal.integerValue}else{0}
    $prot = if($f.prot.doubleValue){$f.prot.doubleValue}elseif($f.prot.integerValue){[double]$f.prot.integerValue}else{0}
    $gras = if($f.gras.doubleValue){$f.gras.doubleValue}elseif($f.gras.integerValue){[double]$f.gras.integerValue}else{0}
    $carb = if($f.carb.doubleValue){$f.carb.doubleValue}elseif($f.carb.integerValue){[double]$f.carb.integerValue}else{0}
    $cons = if($f.consumido.booleanValue){'Si'}else{'No'}
    $menuRows += [pscustomobject]@{
        Comida=$comida; Nombre=$nombre; Cantidad_g=$cant; CantUnidades=$cantU; NombreUnidad=$unitN
        Kcal=$cal; Prot_g=$prot; Gras_g=$gras; Carb_g=$carb; Consumido=$cons
    }
}

# ── Crear Excel con COM ──
$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false
$xl.DisplayAlerts = $false
$wb = $xl.Workbooks.Add()

# ════ PESTAÑA 1: Alimentos ════
$ws1 = $wb.Worksheets.Item(1)
$ws1.Name = 'Alimentos'

$hdrs1 = @('ID','Nombre','Kcal/100g','Prot/100g','Gras/100g','Carb/100g','Unidad','Peso x unidad','Nombre unidad','Kcal x unidad','Prot x unidad','Gras x unidad','Carb x unidad','Verif prot*4+gras*9+carb*4','Nota')
for($c=0;$c -lt $hdrs1.Count;$c++){
    $ws1.Cells.Item(1,$c+1) = $hdrs1[$c]
    $ws1.Cells.Item(1,$c+1).Font.Bold = $true
    $ws1.Cells.Item(1,$c+1).Interior.Color = 0x4472C4
    $ws1.Cells.Item(1,$c+1).Font.Color = 0xFFFFFF
}

$foods = @(
  @('fd1','Yogurt Soprole Protein+',68,6.5,1.9,6.5,'g',155,'unidad',105,10.1,2.9,10.1,'Etiqueta: 155g = 105 kcal'),
  @('fd2','Postre Soprole Protein Snack',76,7.7,1.9,7.7,'g',130,'unidad',99,10,2.5,10,'Etiqueta: 130g = 99 kcal'),
  @('fd3','Leche semidescremada',47,3.4,1.7,5,'ml','','','','','','','1 vaso 200ml = 94 kcal'),
  @('fd4','Queso laminado (gouda/edam)',357,25,27,2,'g',20,'lamina',71,5,5.4,0.4,'1 lamina 20g = 71 kcal'),
  @('fd5','Mantequilla',717,0.9,81,0.1,'g','','','','','','','1 cdta 5g = 36 kcal'),
  @('fd6','Wild Protein Lemon Pie 14g',356,31,11,40,'g',45,'barra',160,14,5,18,'Por barra 45g = 160 kcal'),
  @('fd7','Wild Protein Pro Cookies&Cream 21g',387,35,12,37,'g',60,'barra',232,21,7.2,22.2,'Por barra 60g = 232 kcal'),
  @('fd8','Fajita Pancho Villa Integral XL',275,9,6.8,45,'g',44,'tortilla',121,4,3,19.8,'Por tortilla 44g = 121 kcal'),
  @('fd9','Pollo pechuga cocida (Ariztia)',165,31,3.6,0,'g','','','','','','','Cocida'),
  @('fd10','Pollo molido Ariztia',165,31,3.6,0,'g','','','','','','','Asumido igual a pechuga'),
  @('fd11','Carne vacuno magra cocida',250,35,12,0,'g','','','','','','','Cocida'),
  @('fd12','Salmon',208,20,13,0,'g','','','','','','','Crudo'),
  @('fd13','Huevo entero',155,13,11,1,'g',50,'huevo',78,6.5,5.5,0.5,'1 huevo 50g'),
  @('fd14','Clara de huevo',52,11,0.2,0.7,'g','','','','','','',''),
  @('fd15','Arroz crudo',360,7,0.9,78,'g','','','','','','','Crudo; cocido ~130kcal/100g'),
  @('fd16','Arroz cocido',130,2.7,0.3,28,'g','','','','','','','Cocido'),
  @('fd17','Fideos cocidos',160,5.8,0.9,31,'g','','','','','','','Cocidos'),
  @('fd18','Fideos crudos',350,12,1.5,71,'g','','','','','','','Crudos'),
  @('fd19','Pan integral',260,8,3,46,'g',85,'Pan integral','','','','','1 marraqueta 85g'),
  @('fd20','Avena',380,13,7,67,'g','','','','','','','Cruda'),
  @('fd21','Platano / Banana',89,1.1,0.3,23,'g',120,'platano',107,1.3,0.4,27.6,'1 platano mediano 120g'),
  @('fd22','Manzana',52,0.3,0.2,14,'g',150,'manzana',78,0.5,0.3,21,'1 manzana 150g'),
  @('fd23','Naranja',47,0.9,0.1,12,'g','','','','','','',''),
  @('fd24','Brocoli cocido',35,2.4,0.4,7,'g','','','','','','',''),
  @('fd25','Palta / Aguacate',160,2,15,9,'g',75,'media palta',120,1.5,11.25,6.75,'media palta 75g'),
  @('fd26','Tomate',18,0.9,0.2,3.9,'g','','','','','','',''),
  @('fd27','Lechuga',15,1.4,0.2,2.9,'g','','','','','','',''),
  @('fd28','Zanahoria',41,0.9,0.2,10,'g','','','','','','',''),
  @('fd29','Aceite de oliva',884,0,100,0,'ml',10,'cda',88,0,10,0,'1 cda = 10ml'),
  @('fd30','Mermelada sin azucar',120,0.5,0.1,29,'g','','','','','','',''),
  @('fd31','Mani tostado sin sal',567,26,49,16,'g',30,'punado',170,7.8,14.7,4.8,'30g = 170 kcal'),
  @('fd32','Barra mani 15g',387,15,22,31,'g',45,'barra',174,6.75,9.9,13.95,'1 barra 45g'),
  @('fd33','Proteina whey (generica)',400,80,5,8,'g',30,'scoop',120,24,1.5,2.4,'1 scoop 30g'),
  @('fd34','Leche de avena',45,1,1.5,6.5,'ml','','','','','','',''),
  @('fd35','Kefir natural',60,4,3.5,4,'ml','','','','','','',''),
  @('fd36','Granola sin azucar',450,12,18,58,'g','','','','','','',''),
  @('fd37','Cottage cheese',98,11,4.5,3,'g','','','','','','',''),
  @('fd38','Atun en agua',116,26,1,0,'g',170,'lata',197,44.2,1.7,0,'1 lata 170g escurrido'),
  @('fd39','Pastel de choclo (casero)',140,6.2,5.1,13.5,'g',250,'porcion',350,15.5,12.8,33.8,'porcion 250g = 350 kcal'),
  @('fd40','Quinoa cocida',120,4.4,1.9,21,'g','','','','','','','Cocida'),
  @('fd41','Camote / Batata cocida',86,1.6,0.1,20,'g','','','','','','',''),
  @('fd42','Legumbres cocidas (garbanzos)',164,8.9,2.6,27,'g','','','','','','','Cocidas'),
  @('fd43','Pechuga pavo cocida',135,29,1.5,0,'g','','','','','','',''),
  @('fd44','Nueces',654,15,65,14,'g',30,'punado',196,4.5,19.5,4.2,'30g = 196 kcal'),
  @('fd45','Whey protein (generico)',400,80,5,8,'g',30,'scoop',120,24,1.5,2.4,'1 scoop 30g = 120 kcal')
)

$r = 2
foreach($fd in $foods){
    $prot = [double]$fd[3]; $gras = [double]$fd[4]; $carb = [double]$fd[5]
    $verif = [math]::Round($prot*4 + $gras*9 + $carb*4)
    for($c=0;$c -lt 13;$c++){
        $ws1.Cells.Item($r,$c+1) = $fd[$c]
    }
    $ws1.Cells.Item($r,14) = $verif
    $ws1.Cells.Item($r,15) = $fd[13]
    $r++
}
$ws1.Columns.AutoFit() | Out-Null

# ════ PESTAÑA 2: Menu 20 Abril ════
$ws2 = $wb.Worksheets.Add()
$ws2.Name = 'Menu 20 Abril'

$hdrs2 = @('Comida','Nombre','Cantidad (g/ml)','Cant. Unidades','Nombre Unidad','Kcal','Prot (g)','Gras (g)','Carb (g)','Consumido')
for($c=0;$c -lt $hdrs2.Count;$c++){
    $ws2.Cells.Item(1,$c+1) = $hdrs2[$c]
    $ws2.Cells.Item(1,$c+1).Font.Bold = $true
    $ws2.Cells.Item(1,$c+1).Interior.Color = 0x70AD47
    $ws2.Cells.Item(1,$c+1).Font.Color = 0xFFFFFF
}

$r2 = 2
foreach($row in $menuRows){
    $ws2.Cells.Item($r2,1)  = $row.Comida
    $ws2.Cells.Item($r2,2)  = $row.Nombre
    $ws2.Cells.Item($r2,3)  = $row.Cantidad_g
    $ws2.Cells.Item($r2,4)  = $row.CantUnidades
    $ws2.Cells.Item($r2,5)  = $row.NombreUnidad
    $ws2.Cells.Item($r2,6)  = $row.Kcal
    $ws2.Cells.Item($r2,7)  = $row.Prot_g
    $ws2.Cells.Item($r2,8)  = $row.Gras_g
    $ws2.Cells.Item($r2,9)  = $row.Carb_g
    $ws2.Cells.Item($r2,10) = $row.Consumido
    $r2++
}

# Fila de totales
$totalRow = $r2
$ws2.Cells.Item($totalRow,1) = 'TOTAL'
$ws2.Cells.Item($totalRow,1).Font.Bold = $true
$letras = @{6='F';7='G';8='H';9='I'}
foreach($kv in $letras.GetEnumerator()){
    $col = $kv.Key; $letra = $kv.Value
    $ws2.Cells.Item($totalRow,$col).Formula = "=SUM(${letra}2:${letra}$($totalRow-1))"
    $ws2.Cells.Item($totalRow,$col).Font.Bold = $true
    $ws2.Cells.Item($totalRow,$col).Interior.Color = 0xFFF2CC
}
$ws2.Columns.AutoFit() | Out-Null

# Guardar como .xlsx
$outPath = 'C:\nm-training\alimentos_verificacion.xlsx'
$wb.SaveAs($outPath, 51)
$wb.Close($false)
$xl.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($xl) | Out-Null

Write-Host "Excel generado: $outPath"
