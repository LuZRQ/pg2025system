<?php
$root = __DIR__;
$exts = ['php','js','ts','vue','css','scss','html','blade.php'];
$sum = 0;
$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root));
foreach ($it as $file) {
    if (!$file->isFile()) continue;
    $name = $file->getPathname();
    $lower = strtolower($name);
    if (preg_match('#[\\/](vendor|node_modules|storage|public|bootstrap[\\/]cache|\\.git)[\\/]#',$lower)) continue;
    if (preg_match('#resources[\\/]views[\\/]auth#',$lower) || preg_match('#app[\\/]http[\\/]controllers[\\/]auth#',$lower) || preg_match('#routes[\\/]auth#',$lower)) continue;
    // extensión blade.php
    if (preg_match('/\\.blade\\.php$/', $name)) $ext = 'blade.php';
    else $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    if (!in_array($ext, $exts)) continue;
    // contar líneas sin cargar todo el archivo
    $lines = 0;
    $h = @fopen($name, 'r');
    if ($h) {
        while (!feof($h)) {
            fgets($h);
            $lines++;
        }
        fclose($h);
    }
    echo "$name:$lines\n";
    $sum += $lines;
}
echo "TOTAL:$sum\n";