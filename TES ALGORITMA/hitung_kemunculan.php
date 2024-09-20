<?php
function hitung_kemunculan($input, $query)
{
    $output = [];

    foreach ($query as $q) {
        $output[] = count(array_keys($input, $q));
    }

    return $output;
}

$input = ['xc', 'dz', 'bbb', 'dz'];
$query = ['bbb', 'ac', 'dz'];

$output = hitung_kemunculan($input, $query);
print_r($output); 

// Maka Outputnya: [1, 0, 2]
