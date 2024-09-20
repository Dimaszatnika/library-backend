<?php
function kata_terpanjang($sentence)
{
    $words = explode(' ', $sentence);
    $longest = '';

    foreach ($words as $word) {
        if (strlen($word) > strlen($longest)) {
            $longest = $word;
        }
    }

    return $longest . ": " . strlen($longest) . " karakter";
}

echo kata_terpanjang("Saya sangat senang mengerjakan soal algoritma");

// Maka Outputnya: 
//mengerjakan: 11 karakter
