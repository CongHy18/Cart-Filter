<!-- Js Config -->
<script type="text/javascript">
var NN_FRAMEWORK = NN_FRAMEWORK || {};
var CONFIG_BASE = '<?= $configBase ?>';
var ASSET = '<?= ASSET ?>';
var WEBSITE_NAME = '<?= (!empty($setting['name' . $lang])) ? addslashes($setting['name' . $lang]) : '' ?>';
var TIMENOW = '<?= date("d/m/Y", time()) ?>';
var SHIP_CART = <?= (!empty($config['order']['ship'])) ? 'true' : 'false' ?>;
var SOURCEWEB = '<?=$source?>';
var CONFIG_TOC = <?= (!empty($config['LQD']['toc'])&&( $config['LQD']['tocvip'] == false)) ? 'true' : 'false' ?>;
var CONFIG_SHOWCONTENT = <?= (!empty($config['LQD']['showcontent'])) ? 'true' : 'false' ?>;
var CONFIG_SHINER = <?= (!empty($config['LQD']['shinerlogo'])) ? 'true' : 'false' ?>;
var CART = <?= (!empty($config['LQD']['cart'])) ? 'true' : 'false' ?>;
var CART_ADVANCED = <?= (!empty($config['LQD']['cartadvanced'])) ? 'true' : 'false' ?>;
var LINK_FILTER = '<?= (!empty($linkFilter)) ? $linkFilter : '' ?>';
var QUICKVIEW = <?= (!empty($config['LQD']['quickview'])) ? 'true' : 'false' ?>;
var RECAPTCHA_ACTIVE = <?= (!empty($config['googleAPI']['recaptcha']['active'])) ? 'true' : 'false' ?>;
var RECAPTCHA_SITEKEY = '<?= $config['googleAPI']['recaptcha']['sitekey'] ?>';
var GOTOP = ASSET + 'assets/images/top.png';
var LANG = {
    'no_keywords': '<?= chuanhaptukhoatimkiem ?>',
    'delete_product_from_cart': '<?= banmuonxoasanphamnay ?>',
    'no_products_in_cart': '<?= khongtontaisanphamtronggiohang ?>',
    'ward': '<?= phuongxa ?>',
    'back_to_home': '<?= vetrangchu ?>',
};
</script>

<!-- Js Files -->
<?php
$js->set("js/jquery.min.js");
$js->set("js/lazyload.min.js");
$js->set("bootstrap/bootstrap.js");
$js->set("js/wow.min.js");
$js->set("confirm/confirm.js");
$js->set("holdon/HoldOn.js");
// $js->set("mmenu/mmenu.js");
$js->set("easyticker/easy-ticker.js");
$js->set("fotorama/fotorama.js");
$js->set("owlcarousel2/owl.carousel.js");
$js->set("magiczoomplus/magiczoomplus.js");
if (isset($config['LQD']['slick']) && $config['LQD']['slick'] == true) {
    $js->set("slick/slick.js");
}
$js->set("fancybox3/jquery.fancybox.js");
$js->set("photobox/photobox.js");
$js->set("simplenotify/simple-notify.js");
$js->set("fileuploader/jquery.fileuploader.min.js");
$js->set("datetimepicker/php-date-formatter.min.js");
$js->set("datetimepicker/jquery.mousewheel.js");
$js->set("datetimepicker/jquery.datetimepicker.js");
$js->set("js/functions.js");
$js->set("js/arcontactus.js");
$js->set("js/aos.js");


// $js->set("js/comment.js");
if ((isset($config['LQD']['toc']) && $config['LQD']['toc'] == true)&&( $config['LQD']['tocvip'] == false)) {
    $js->set("toc/toc.js");
}
$js->set("js/placeholderTypewriter.js");
if (isset($config['LQD']['shinerlogo']) && $config['LQD']['shinerlogo'] == true) {
    $js->set("js/jquery.pixelentity.shiner.min.js");
}
if (isset($config['LQD']['tocvip']) && $config['LQD']['tocvip'] == true) {
    $js->set("toc/ftoc.min.js");
}
$js->set("js/apps.js");
echo $js->get();
?>

<?php if (!empty($config['googleAPI']['recaptcha']['active'])) { ?>
<!-- Js Google Recaptcha V3 -->
<script type="text/javascript">
     $(document).ready(function($) {
        $('#email-newsletter, #fullname-contact').click(function(event) {
            $.getScript(
                'https://www.google.com/recaptcha/api.js?render=<?= $config['googleAPI']['recaptcha']['sitekey'] ?>',
            function() {
                grecaptcha.ready(function() {
                    /* Newsletter */
                    <?php if ($source == 'index') { ?>
                        generateCaptcha('Newsletter', 'recaptchaResponseNewsletter');
                    <?php } ?>
                    <?php if ($source == 'contact') { ?>
                    /* Contact */
                    generateCaptcha('contact', 'recaptchaResponseContact');
                    <?php } ?>
                });
            });
        });
    });
</script>
<?php } ?>



<script>
        var arCuMessages = [];
        var arCuLoop = false;
        var arCuCloseLastMessage = false;
        var arCuPromptClosed = false;
        var _arCuTimeOut = null;
        var arCuDelayFirst = 2000;
        var arCuTypingTime = 2000;
        var arCuMessageTime = 4000;
        var arCuClosedCookie = 0;
        var arcItems = [];
        window.addEventListener('load', function() {
            jQuery('#arcontactus').on('arcontactus.init', function() {
                if (arCuClosedCookie) {
                    return false;
                }
                arCuShowMessages();

            });
            jQuery('#arcontactus').on('arcontactus.openMenu', function() {
                clearTimeout(_arCuTimeOut);
                arCuPromptClosed = true;
                jQuery('#contact').contactUs('hidePrompt');
                arCuCreateCookie('arcu-closed', 1, 30);
            });
            jQuery('#arcontactus').on('arcontactus.hidePrompt', function() {
                clearTimeout(_arCuTimeOut);
                arCuPromptClosed = true;
                arCuCreateCookie('arcu-closed', 1, 30);
            });
            var arcItem = {};
            arcItem.id = 'msg-item-1';
            arcItem.class = 'msg-item-facebook-messenger';
            arcItem.title = 'Messenger';
            arcItem.icon =
                '<svg xmlns="//www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"></path></svg>';
            arcItem.href = '<?=$optsetting['fanpage']?>';
            arcItem.color = '#02a2ff';
            arcItems.push(arcItem);

            var arcItem = {};
            arcItem.id = 'msg-item-9';
            arcItem.class = 'msg-item-telegram-plane';
            arcItem.title = 'Zalo Chat';
            arcItem.icon =
                "<svg id='Layer_1' xmlns='//www.w3.org/2000/svg' viewBox='0 0 460.1 436.6'><path fill='currentColor' class='st0' d='M82.6 380.9c-1.8-.8-3.1-1.7-1-3.5 1.3-1 2.7-1.9 4.1-2.8 13.1-8.5 25.4-17.8 33.5-31.5 6.8-11.4 5.7-18.1-2.8-26.5C69 269.2 48.2 212.5 58.6 145.5 64.5 107.7 81.8 75 107 46.6c15.2-17.2 33.3-31.1 53.1-42.7 1.2-.7 2.9-.9 3.1-2.7-.4-1-1.1-.7-1.7-.7-33.7 0-67.4-.7-101 .2C28.3 1.7.5 26.6.6 62.3c.2 104.3 0 208.6 0 313 0 32.4 24.7 59.5 57 60.7 27.3 1.1 54.6.2 82 .1 2 .1 4 .2 6 .2H290c36 0 72 .2 108 0 33.4 0 60.5-27 60.5-60.3v-.6-58.5c0-1.4.5-2.9-.4-4.4-1.8.1-2.5 1.6-3.5 2.6-19.4 19.5-42.3 35.2-67.4 46.3-61.5 27.1-124.1 29-187.6 7.2-5.5-2-11.5-2.2-17.2-.8-8.4 2.1-16.7 4.6-25 7.1-24.4 7.6-49.3 11-74.8 6zm72.5-168.5c1.7-2.2 2.6-3.5 3.6-4.8 13.1-16.6 26.2-33.2 39.3-49.9 3.8-4.8 7.6-9.7 10-15.5 2.8-6.6-.2-12.8-7-15.2-3-.9-6.2-1.3-9.4-1.1-17.8-.1-35.7-.1-53.5 0-2.5 0-5 .3-7.4.9-5.6 1.4-9 7.1-7.6 12.8 1 3.8 4 6.8 7.8 7.7 2.4.6 4.9.9 7.4.8 10.8.1 21.7 0 32.5.1 1.2 0 2.7-.8 3.6 1-.9 1.2-1.8 2.4-2.7 3.5-15.5 19.6-30.9 39.3-46.4 58.9-3.8 4.9-5.8 10.3-3 16.3s8.5 7.1 14.3 7.5c4.6.3 9.3.1 14 .1 16.2 0 32.3.1 48.5-.1 8.6-.1 13.2-5.3 12.3-13.3-.7-6.3-5-9.6-13-9.7-14.1-.1-28.2 0-43.3 0zm116-52.6c-12.5-10.9-26.3-11.6-39.8-3.6-16.4 9.6-22.4 25.3-20.4 43.5 1.9 17 9.3 30.9 27.1 36.6 11.1 3.6 21.4 2.3 30.5-5.1 2.4-1.9 3.1-1.5 4.8.6 3.3 4.2 9 5.8 14 3.9 5-1.5 8.3-6.1 8.3-11.3.1-20 .2-40 0-60-.1-8-7.6-13.1-15.4-11.5-4.3.9-6.7 3.8-9.1 6.9zm69.3 37.1c-.4 25 20.3 43.9 46.3 41.3 23.9-2.4 39.4-20.3 38.6-45.6-.8-25-19.4-42.1-44.9-41.3-23.9.7-40.8 19.9-40 45.6zm-8.8-19.9c0-15.7.1-31.3 0-47 0-8-5.1-13-12.7-12.9-7.4.1-12.3 5.1-12.4 12.8-.1 4.7 0 9.3 0 14v79.5c0 6.2 3.8 11.6 8.8 12.9 6.9 1.9 14-2.2 15.8-9.1.3-1.2.5-2.4.4-3.7.2-15.5.1-31 .1-46.5z'></path></svg>";
            arcItem.href = 'https://zalo.me/<?=preg_replace('/[^0-9]/','',$optsetting['zalo']);?>';
            arcItem.color = '#0180c7';
            arcItems.push(arcItem);



            var arcItem = {};
            arcItem.id = 'msg-item-8';
            arcItem.class = 'msg-item-phone';
            arcItem.title = 'Call <?=$func->parsePhone($optsetting['hotline'])?>';
            arcItem.icon =
                '<svg xmlns="//www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>';
            arcItem.href = 'tel:<?=preg_replace('/[^0-9]/','',$optsetting['hotline']);?>';
            arcItem.color = '#4EB625';
            arcItems.push(arcItem);


            var arcItem = {};
            arcItem.id = 'msg-item-10';
            arcItem.class = 'msg-item-maps';
            arcItem.title = 'Maps';
            arcItem.icon =
                '<img src="assets/images/icon-t5.png.webp">';
                '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M560.02 32c-1.96 0-3.98.37-5.96 1.16L384.01 96H384L212 35.28A64.252 64.252 0 0 0 191.76 32c-6.69 0-13.37 1.05-19.81 3.14L20.12 87.95A32.006 32.006 0 0 0 0 117.66v346.32C0 473.17 7.53 480 15.99 480c1.96 0 3.97-.37 5.96-1.16L192 416l172 60.71a63.98 63.98 0 0 0 40.05.15l151.83-52.81A31.996 31.996 0 0 0 576 394.34V48.02c0-9.19-7.53-16.02-15.98-16.02zM224 90.42l128 45.19v285.97l-128-45.19V90.42zM48 418.05V129.07l128-44.53v286.2l-.64.23L48 418.05zm480-35.13l-128 44.53V141.26l.64-.24L528 93.95v288.97z"/></svg>';
            arcItem.href = '<?=$optsetting['link_map'];?>';
            arcItem.color = '#4EB625';
            arcItems.push(arcItem);



            var arcItem = {};
            arcItem.id = 'msg-item-9';
            arcItem.class = 'msg-item-youtube';
            arcItem.title = 'Youtube';
            arcItem.icon = '<img src="https://img.icons8.com/color/72/youtube-play.png">';
            arcItem.href = 'https://www.youtube.com/channel/UC0jtTO0it3OeLQuFzEKfxgg';
            arcItem.color = '#fff';
            arcItems.push(arcItem);


            jQuery('#arcontactus').contactUs({
                items: arcItems
            });
        });
</script>


<?php if (!empty($config['oneSignal']['active'])) { ?>
<!-- Js OneSignal -->
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script type="text/javascript">
var OneSignal = window.OneSignal || [];
OneSignal.push(function() {
    OneSignal.init({
        appId: "<?= $config['oneSignal']['id'] ?>"
    });
});
</script>
<?php } ?>

<!-- Js Structdata -->
<?php include TEMPLATE . LAYOUT . "strucdata.php"; ?>

<!-- Js Addons -->
<?= $addons->set('script-main', 'script-main', 2); ?>
<?= $addons->get(); ?>

<!-- Js Body -->
<?= $func->decodeHtmlChars($setting['bodyjs']) ?>

<script type="text/javascript">
    var placeholderText = ["Nhập từ khóa..."];
    $('#keyword,#keyword-res').placeholderTypewriter({
        text: placeholderText
    });
</script>
<!-- Google translate -->
<?php if (isset($config['LQD']['translate']) && $config['LQD']['translate'] == true) {?>
    <script type="text/javascript">    
        function GoogleLanguageTranslatorInit() {new google.translate.TranslateElement({pageLanguage: 'vi', autoDisplay: false }, 'google_language_translator');}
    </script>
    <script type="text/javascript" src="http://translate.google.com/translate_a/element.js?cb=GoogleLanguageTranslatorInit" async defer></script>
    <script type='text/javascript' src='assets/js/flags.js'></script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<?php } ?>