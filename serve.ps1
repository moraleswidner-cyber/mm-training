$port = 3456
$dir  = "C:\nm-training"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Servidor corriendo en http://localhost:$port/" -ForegroundColor Green
Write-Host "Presiona Ctrl+C para detener." -ForegroundColor Yellow

while ($listener.IsListening) {
    $ctx  = $listener.GetContext()
    $req  = $ctx.Request
    $resp = $ctx.Response

    $rawPath = $req.Url.LocalPath.TrimStart('/')
    if ($rawPath -eq '' -or $rawPath -eq '/') { $rawPath = 'index.html' }
    $filePath = Join-Path $dir $rawPath

    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mime = switch ($ext) {
            '.html' { 'text/html; charset=utf-8' }
            '.js'   { 'application/javascript' }
            '.css'  { 'text/css' }
            '.json' { 'application/json' }
            '.png'  { 'image/png' }
            '.jpg'  { 'image/jpeg' }
            default { 'application/octet-stream' }
        }
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $resp.ContentType   = $mime
        $resp.ContentLength64 = $bytes.Length
        # No cache headers so browser always fetches fresh
        $resp.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
        $resp.Headers.Add("Pragma", "no-cache")
        $resp.Headers.Add("Expires", "0")
        $resp.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $resp.StatusCode = 404
        $msg  = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rawPath")
        $resp.OutputStream.Write($msg, 0, $msg.Length)
    }
    $resp.OutputStream.Close()
}
