<?php
function perbedaan_diagonal($matrix)
{
    $n = count($matrix);
    $primary_diagonal = 0;
    $secondary_diagonal = 0;

    for ($i = 0; $i < $n; $i++) {
        $primary_diagonal += $matrix[$i][$i];
        $secondary_diagonal += $matrix[$i][$n - $i - 1];
    }

    return abs($primary_diagonal - $secondary_diagonal);
}

$matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

echo perbedaan_diagonal($matrix); 
// Maka Outputnya: 3
