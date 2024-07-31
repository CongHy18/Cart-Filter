<?php
// Filter
$filter = array(
    'category' => array(
        'name' => 'Danh mục',
        'data' => $cache->get("select id, name$lang from #_product_list where type = ? and find_in_set('hienthi',status) order by numb,id desc", array('san-pham'), 'result', 7200)
    ),
    'brand' => array(
        'name' => 'Hãng',
        'data' => $cache->get("select id, name$lang from #_product_brand where type = ? and find_in_set('hienthi',status) order by numb,id desc", array('san-pham'), 'result', 7200)
    ),
    'price' => array(
        'name' => 'Khoảng giá',
        'data' => $cache->get("select id, name$lang from #_news where type = ? and find_in_set('hienthi',status) order by numb,id desc", array('filter-price'), 'result', 7200)
    ),
);
