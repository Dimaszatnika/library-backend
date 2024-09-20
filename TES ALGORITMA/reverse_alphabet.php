<?php
function reverse_alphabet($string)
{
    // kode ini memisahkan alphabet dan angka
    $alphabets = preg_replace('/[^a-zA-Z]/', '', $string);
    $number = preg_replace('/[^0-9]/', '', $string);

    // Ini akan mereverse alphabet
    $reversed = strrev($alphabets) . $number;

    return $reversed;
}

echo reverse_alphabet("NEGIE1"); 

// Maka Outputnya: EIGEN1
