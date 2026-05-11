$foods = @(
  [pscustomobject]@{ID='fd1';  Nombre='Yogurt Soprole Protein+';            Kcal=68;  Prot=6.5;  Gras=1.9;  Carb=6.5;  Unidad='g';  PesoU=155; NombreU='unidad';   KcalU=105; ProtU=10.1; GrasU=2.9;  CarbU=10.1; Nota='Etiqueta: 155g = 105 kcal 10g prot'},
  [pscustomobject]@{ID='fd2';  Nombre='Postre Soprole Protein Snack';       Kcal=76;  Prot=7.7;  Gras=1.9;  Carb=7.7;  Unidad='g';  PesoU=130; NombreU='unidad';   KcalU=99;  ProtU=10.0; GrasU=2.5;  CarbU=10.0; Nota='Etiqueta: 130g = 99 kcal 10g prot'},
  [pscustomobject]@{ID='fd3';  Nombre='Leche semidescremada';               Kcal=47;  Prot=3.4;  Gras=1.7;  Carb=5;    Unidad='ml'; PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='1 vaso 200ml = 94 kcal'},
  [pscustomobject]@{ID='fd4';  Nombre='Queso laminado (gouda/edam)';        Kcal=357; Prot=25;   Gras=27;   Carb=2;    Unidad='g';  PesoU=20;  NombreU='lamina';   KcalU=71;  ProtU=5.0;  GrasU=5.4;  CarbU=0.4;  Nota='1 lamina 20g = 71 kcal'},
  [pscustomobject]@{ID='fd5';  Nombre='Mantequilla';                        Kcal=717; Prot=0.9;  Gras=81;   Carb=0.1;  Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='1 cdta 5g = 36 kcal'},
  [pscustomobject]@{ID='fd6';  Nombre='Wild Protein Lemon Pie 14g';         Kcal=356; Prot=31;   Gras=11;   Carb=40;   Unidad='g';  PesoU=45;  NombreU='barra';    KcalU=160; ProtU=14.0; GrasU=5.0;  CarbU=18.0; Nota='Por barra 45g = 160 kcal 14g prot'},
  [pscustomobject]@{ID='fd7';  Nombre='Wild Protein Pro Cookies&Cream 21g'; Kcal=387; Prot=35;   Gras=12;   Carb=37;   Unidad='g';  PesoU=60;  NombreU='barra';    KcalU=232; ProtU=21.0; GrasU=7.2;  CarbU=22.2; Nota='Por barra 60g = 232 kcal 21g prot'},
  [pscustomobject]@{ID='fd8';  Nombre='Fajita Pancho Villa Integral XL';    Kcal=275; Prot=9;    Gras=6.8;  Carb=45;   Unidad='g';  PesoU=44;  NombreU='tortilla'; KcalU=121; ProtU=4.0;  GrasU=3.0;  CarbU=19.8; Nota='Por tortilla 44g = 121 kcal'},
  [pscustomobject]@{ID='fd9';  Nombre='Pollo pechuga cocida (Ariztia)';     Kcal=165; Prot=31;   Gras=3.6;  Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocida'},
  [pscustomobject]@{ID='fd10'; Nombre='Pollo molido Ariztia';               Kcal=113; Prot=23;   Gras=2;    Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocido'},
  [pscustomobject]@{ID='fd11'; Nombre='Pechuga de pavo cocida';             Kcal=165; Prot=30;   Gras=4;    Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocida'},
  [pscustomobject]@{ID='fd12'; Nombre='Molida pechuga de pavo Ariztia';     Kcal=105; Prot=22;   Gras=1.8;  Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocida'},
  [pscustomobject]@{ID='fd13'; Nombre='Carne molida 7% grasa';              Kcal=152; Prot=19;   Gras=8;    Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cruda'},
  [pscustomobject]@{ID='fd14'; Nombre='Carne molida 4% grasa';              Kcal=115; Prot=21;   Gras=4;    Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cruda'},
  [pscustomobject]@{ID='fd15'; Nombre='Asado de vacuno';                    Kcal=250; Prot=26;   Gras=16;   Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Crudo'},
  [pscustomobject]@{ID='fd16'; Nombre='Bife / filete de vacuno';            Kcal=200; Prot=28;   Gras=10;   Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Crudo'},
  [pscustomobject]@{ID='fd17'; Nombre='Atun en tarro al agua (escurrido)';  Kcal=110; Prot=25;   Gras=1;    Carb=0;    Unidad='g';  PesoU=80;  NombreU='tarro';    KcalU=88;  ProtU=20.0; GrasU=0.8;  CarbU=0.0;  Nota='Tarro 150g escurrido = 80g neto'},
  [pscustomobject]@{ID='fd18'; Nombre='Jurel en tarro (escurrido)';         Kcal=130; Prot=18;   Gras=6;    Carb=0;    Unidad='g';  PesoU=100; NombreU='tarro';    KcalU=130; ProtU=18.0; GrasU=6.0;  CarbU=0.0;  Nota='Tarro 190g escurrido = 100g neto'},
  [pscustomobject]@{ID='fd19'; Nombre='Jurel fresco';                       Kcal=150; Prot=21;   Gras=7;    Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Crudo'},
  [pscustomobject]@{ID='fd20'; Nombre='Reineta';                            Kcal=105; Prot=18;   Gras=3.5;  Carb=0;    Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cruda'},
  [pscustomobject]@{ID='fd21'; Nombre='Huevo entero';                       Kcal=155; Prot=13;   Gras=11;   Carb=1.1;  Unidad='g';  PesoU=60;  NombreU='huevo';    KcalU=93;  ProtU=7.8;  GrasU=6.6;  CarbU=0.7;  Nota='1 huevo grande 60g = 93 kcal'},
  [pscustomobject]@{ID='fd22'; Nombre='Clara de huevo';                     Kcal=52;  Prot=11;   Gras=0.2;  Carb=0.7;  Unidad='g';  PesoU=35;  NombreU='clara';    KcalU=18;  ProtU=3.9;  GrasU=0.1;  CarbU=0.2;  Nota='1 clara 35g = 18 kcal'},
  [pscustomobject]@{ID='fd23'; Nombre='Huevos revueltos (2 h. + aceite)';   Kcal=184; Prot=12.5; Gras=14.6; Carb=1;    Unidad='g';  PesoU=125; NombreU='porcion';  KcalU=230; ProtU=15.6; GrasU=18.3; CarbU=1.3;  Nota='Porcion tipica 125g = 230 kcal'},
  [pscustomobject]@{ID='fd24'; Nombre='Pan integral (rebanada)';            Kcal=233; Prot=10;   Gras=3.5;  Carb=42;   Unidad='g';  PesoU=30;  NombreU='rebanada'; KcalU=70;  ProtU=3.0;  GrasU=1.1;  CarbU=12.6; Nota='1 rebanada 30g = 70 kcal'},
  [pscustomobject]@{ID='fd25'; Nombre='Pan integral con palta';             Kcal=193; Prot=5.6;  Gras=9.6;  Carb=24.3; Unidad='g';  PesoU=135; NombreU='porcion';  KcalU=261; ProtU=7.6;  GrasU=13.0; CarbU=32.8; Nota='2 rebanadas + media palta'},
  [pscustomobject]@{ID='fd26'; Nombre='Pan integral con 2 huevos';          Kcal=164; Prot=10.7; Gras=7;    Carb=14.8; Unidad='g';  PesoU=180; NombreU='porcion';  KcalU=295; ProtU=19.3; GrasU=12.6; CarbU=26.6; Nota='2 rebanadas + 2 huevos'},
  [pscustomobject]@{ID='fd27'; Nombre='Arroz cocido';                       Kcal=130; Prot=2.7;  Gras=0.3;  Carb=28.2; Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocido'},
  [pscustomobject]@{ID='fd28'; Nombre='Fideos cocidos';                     Kcal=158; Prot=5.8;  Gras=0.9;  Carb=31;   Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocidos'},
  [pscustomobject]@{ID='fd29'; Nombre='Avena';                              Kcal=389; Prot=16.9; Gras=6.9;  Carb=66;   Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cruda/seca'},
  [pscustomobject]@{ID='fd30'; Nombre='Lenteja cocida';                     Kcal=116; Prot=9;    Gras=0.4;  Carb=20;   Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocida'},
  [pscustomobject]@{ID='fd31'; Nombre='Tomate';                             Kcal=18;  Prot=0.9;  Gras=0.2;  Carb=3.9;  Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota=''},
  [pscustomobject]@{ID='fd32'; Nombre='Palta (aguacate)';                   Kcal=160; Prot=2;    Gras=15;   Carb=9;    Unidad='g';  PesoU=150; NombreU='palta';    KcalU=240; ProtU=3.0;  GrasU=22.5; CarbU=13.5; Nota='1 palta mediana 150g = 240 kcal'},
  [pscustomobject]@{ID='fd33'; Nombre='Media palta';                        Kcal=107; Prot=1.3;  Gras=10;   Carb=6;    Unidad='g';  PesoU=75;  NombreU='porcion';  KcalU=80;  ProtU=1.0;  GrasU=7.5;  CarbU=4.5;  Nota='75g = 80 kcal'},
  [pscustomobject]@{ID='fd34'; Nombre='Choclo (maiz tierno cocido)';        Kcal=96;  Prot=3.3;  Gras=1.3;  Carb=21;   Unidad='g';  PesoU=200; NombreU='choclo';   KcalU=192; ProtU=6.6;  GrasU=2.6;  CarbU=42.0; Nota='1 choclo entero 200g'},
  [pscustomobject]@{ID='fd35'; Nombre='Lechuga';                            Kcal=15;  Prot=1.4;  Gras=0.2;  Carb=2.9;  Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota=''},
  [pscustomobject]@{ID='fd36'; Nombre='Zanahoria';                          Kcal=41;  Prot=0.9;  Gras=0.2;  Carb=10;   Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota=''},
  [pscustomobject]@{ID='fd37'; Nombre='Pepino';                             Kcal=16;  Prot=0.7;  Gras=0.1;  Carb=3.6;  Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota=''},
  [pscustomobject]@{ID='fd38'; Nombre='Espinaca';                           Kcal=23;  Prot=2.9;  Gras=0.4;  Carb=3.6;  Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota=''},
  [pscustomobject]@{ID='fd39'; Nombre='Papa cocida';                        Kcal=86;  Prot=2;    Gras=0.1;  Carb=20;   Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocida'},
  [pscustomobject]@{ID='fd40'; Nombre='Camote (zapallo camote) cocido';     Kcal=86;  Prot=1.6;  Gras=0.1;  Carb=20;   Unidad='g';  PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='Cocido'},
  [pscustomobject]@{ID='fd41'; Nombre='Platano / Banana';                   Kcal=89;  Prot=1.1;  Gras=0.3;  Carb=23;   Unidad='g';  PesoU=120; NombreU='platano';  KcalU=107; ProtU=1.3;  GrasU=0.4;  CarbU=27.6; Nota='1 platano mediano 120g'},
  [pscustomobject]@{ID='fd42'; Nombre='Manzana';                            Kcal=52;  Prot=0.3;  Gras=0.2;  Carb=14;   Unidad='g';  PesoU=150; NombreU='manzana';  KcalU=78;  ProtU=0.5;  GrasU=0.3;  CarbU=21.0; Nota='1 manzana mediana 150g'},
  [pscustomobject]@{ID='fd43'; Nombre='Naranja';                            Kcal=47;  Prot=0.9;  Gras=0.1;  Carb=12;   Unidad='g';  PesoU=180; NombreU='naranja';  KcalU=85;  ProtU=1.6;  GrasU=0.2;  CarbU=21.6; Nota='1 naranja mediana 180g'},
  [pscustomobject]@{ID='fd44'; Nombre='Aceite de oliva';                    Kcal=884; Prot=0;    Gras=100;  Carb=0;    Unidad='ml'; PesoU='';  NombreU='';         KcalU='';  ProtU='';   GrasU='';   CarbU='';   Nota='1 cda 10ml = 88 kcal'},
  [pscustomobject]@{ID='fd45'; Nombre='Whey protein (generico)';            Kcal=400; Prot=80;   Gras=5;    Carb=8;    Unidad='g';  PesoU=30;  NombreU='scoop';    KcalU=120; ProtU=24.0; GrasU=1.5;  CarbU=2.4;  Nota='1 scoop 30g = 120 kcal 24g prot'}
)

$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add("ID;Nombre;Kcal/100g;Prot/100g;Gras/100g;Carb/100g;Unidad;Peso x unidad;Nombre unidad;Kcal x unidad;Prot x unidad;Gras x unidad;Carb x unidad;Verificacion prot*4+gras*9+carb*4;Nota")

foreach ($f in $foods) {
    $check = ""
    if ($f.Prot -ne '' -and $f.Gras -ne '' -and $f.Carb -ne '') {
        $calc = [math]::Round([double]$f.Prot*4 + [double]$f.Gras*9 + [double]$f.Carb*4)
        $check = $calc
    }
    $line = """$($f.ID)"";""$($f.Nombre)"";$($f.Kcal);$($f.Prot);$($f.Gras);$($f.Carb);$($f.Unidad);$($f.PesoU);$($f.NombreU);$($f.KcalU);$($f.ProtU);$($f.GrasU);$($f.CarbU);$check;""$($f.Nota)"""
    $lines.Add($line)
}

$utf8bom = [System.Text.UTF8Encoding]::new($true)
[System.IO.File]::WriteAllLines("C:\nm-training\alimentos_verificacion.csv", $lines, $utf8bom)
Write-Host "Generado: C:\nm-training\alimentos_verificacion.csv ($($foods.Count) alimentos)"
