<div class="title-main"><span><?= (!empty($titleCate)) ? $titleCate : @$titleMain ?></span>
    <div class="animate-border m-auto"></div>
</div>
<div class="content-main">
    <div class="row">
        <div class="col-md-12 mgb-res">
            <div class="filter">
                <p class="filter__title">Bộ lọc</p>
                <div class="filter__list">
                    <div class="filter__item filter__item-all">
                        <button class="filter__btn filter__btn-open">
                            <i class="fa-solid fa-filter"></i>
                            <span>Bộ lọc</span>
                            <span class="filter-selected__total" hidden></span>
                        </button>
                        <div class="filter__select">
                            <div class="filter__select-body filter__select-all-list">
                                <?php foreach ($filter as $klist => $vlist) { ?>
                                    <div class="filter__select-all-item filter__item-panel" data-type="<?= $klist ?>">
                                        <p class="filter__item-name"><?= $vlist['name'] ?></p>
                                        <div class="filter__select-list">
                                            <?php foreach ($vlist['data'] as $kitem => $vitem) { ?>
                                                <div class="<?= !empty($filterSelected[$klist] && in_array($vitem['id'], $filterSelected[$klist])) ? 'filter__select-item active' : 'filter__select-item' ?>" data-id="<?= $vitem['id'] ?>"><?= $vitem['name' . $lang] ?></div>
                                            <?php } ?>
                                        </div>
                                    </div>
                                <?php } ?>
                            </div>
                            <div class="filter__select-footer">
                                <button class="filter__btn filter__btn-clear filter__btn-clear-all">Bỏ chọn</button>
                                <button class="filter__btn filter__btn-execute">Xem <span class="filter__result-count" hidden></span> kết quả</button>
                            </div>
                        </div>
                    </div>
                    <?php foreach ($filter as $klist => $vlist) { ?>
                        <div class="filter__item">
                            <button class="filter__btn filter__btn-open">
                                <span><?= $vlist['name'] ?></span>
                                <i class="fa-solid fa-caret-down arrow"></i>
                            </button>
                            <div class="filter__select filter__item-panel" data-type="<?= $klist ?>">
                                <div class="filter__select-body">
                                    <div class="filter__select-list">
                                        <?php foreach ($vlist['data'] as $kitem => $vitem) { ?>
                                            <div class="<?= !empty($filterSelected[$klist] && in_array($vitem['id'], $filterSelected[$klist])) ? 'filter__select-item active' : 'filter__select-item' ?>" data-id="<?= $vitem['id'] ?>"><?= $vitem['name' . $lang] ?></div>
                                        <?php } ?>
                                    </div>
                                </div>
                                <div class="filter__select-footer">
                                    <button class="filter__btn filter__btn-clear">Bỏ chọn</button>
                                    <button class="filter__btn filter__btn-execute">Xem <span class="filter__result-count" hidden></span> kết quả</button>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                </div>
                <div id="filter-selected" hidden>
                    <p class="filter-selected__title">Đã chọn: </p>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <?php if ($com == 'tim-kiem') { ?>
                <div class="mb-3">Tìm thấy (<?= $total ?>) kết quả: <span>"<?php echo $tukhoa_show; ?>"</span></div>
            <?php } ?>
            <div class="grid-product">
                <?php /*Giao diện thay đổi trong libraries/sample/product*/ ?>
                <?php if (!empty($product)) {
                    foreach ($product as $k => $v) {
                        $proSale = $func->getProSale($v['id']);
                        $v['name'] = $v['name' . $lang];
                        $v['href'] = $v[$sluglang];
                        $v['regular_price'] = $v['regular_price'];
                        $v['sale_price'] = $v['sale_price'];
                        $v['discount'] = $v['discount'];
                        $v['showCart'] = true;
                        $v['showQuickView'] = (!empty($config['LQD']['quickview']));
                        /* Lấy màu */
                        $productColor = $d->rawQuery("select id_color from #_product_sale where id_parent = ?", array($v['id']));
                        $productColor = (!empty($productColor)) ? $func->joinCols($productColor, 'id_color') : array();
                        $v['rowColor'] = [];
                        if (!empty($productColor)) {
                            $v['rowColor'] = $d->rawQuery("select id from #_color where type='" . $type . "' and id in ($productColor) and find_in_set('hienthi',status) order by numb,id desc");
                        }
                        /* Lấy size */
                        $productSize = $d->rawQuery("select id_size from #_product_sale where id_parent = ?", array($v['id']));
                        $productSize = (!empty($productSize)) ? $func->joinCols($productSize, 'id_size') : array();
                        $v['rowSize'] = [];
                        if (!empty($productSize)) {
                            $v['rowSize'] = $d->rawQuery("select id, name$lang from #_size where type='" . $type . "' and id in ($productSize) and find_in_set('hienthi',status) order by numb,id desc");
                        }

                ?>
                        <?= $func->getProductItem($v) ?>
                    <?php }
                } else { ?>
                    <div class="gr-100">
                        <div class="alert alert-warning w-100" role="alert">
                            <strong><?= khongtimthayketqua ?></strong>
                        </div>
                    </div>
                <?php } ?>
            </div>
            <div class="gr-100">
                <div class="pagination-home w-100"><?= (!empty($paging)) ? $paging : '' ?></div>
            </div>
        </div>
    </div>
</div>