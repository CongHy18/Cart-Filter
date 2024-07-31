<?php
include "config.php";

$category = (!empty($_GET['category'])) ? htmlspecialchars($_GET['category']) : 0;
$brand = (!empty($_GET['brand'])) ? htmlspecialchars($_GET['brand']) : 0;
$price = (!empty($_GET['price'])) ? htmlspecialchars($_GET['price']) : 0;
$where = "type = 'san-pham'";

if ($category) {
    $where .= " and id_list in ($category)";
}
if ($brand) {
    $where .= " and id_brand in ($brand)";
}
if ($price) {
    $getRange = $d->rawQuery("select range_start, range_end from #_news where id in ({$price}) and type = 'filter-price' and find_in_set('hienthi',status)");

    foreach ($getRange as $k => $v) {
        $range['range_start'][] = $v['range_start'];
        $range['range_end'][] = $v['range_end'];
    }
    $range['range_start'] = min($range['range_start']);
    $range['range_end'] = max($range['range_end']);
    if ($range) {
        $where .= " and (CASE WHEN sale_price > 0 THEN sale_price>={$range['range_start']} && sale_price<={$range['range_end']} ELSE regular_price>={$range['range_start']} && regular_price<={$range['range_end']} END)";
    }
}

$items = $d->rawQueryOne("select count(id) as total from #_product where $where and find_in_set('hienthi',status)");

echo json_encode($items);
