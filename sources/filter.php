<?php
if (!defined('SOURCES')) die("Error");

$category = (!empty($_GET['category'])) ? htmlspecialchars($_GET['category']) : 0;
$brand = (!empty($_GET['brand'])) ? htmlspecialchars($_GET['brand']) : 0;
$price = (!empty($_GET['price'])) ? htmlspecialchars($_GET['price']) : 0;

$where = "";
$where = "type = ? and find_in_set('hienthi',status)";
$params = array($type);

$filterSelected = array(
    'category' => explode(',', $category),
    'brand' => explode(',', $brand),
    'price' => explode(',', $price)
);
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


$curPage = $getPage;
$perPage = 20;
$startpoint = ($curPage * $perPage) - $perPage;
$limit = " limit " . $startpoint . "," . $perPage;
$sql = "select * from #_product where $where order by numb,id desc $limit";
$product = $d->rawQuery($sql, $params);
$sqlNum = "select count(*) as 'num' from #_product where $where order by numb,id desc";
$count = $d->rawQueryOne($sqlNum, $params);
$total = (!empty($count)) ? $count['num'] : 0;
$url = $func->getCurrentPageURL();
$paging = $func->pagination($total, $perPage, $curPage, $url);

/* breadCrumbs */
if (!empty($titleMain)) $breadcr->set('san-pham', $titleMain);
$breadcrumbs = $breadcr->get();
