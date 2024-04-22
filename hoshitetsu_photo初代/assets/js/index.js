
$(function(){
    // スライダー
    $('.p-greeting__single').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        asNavFor: '.p-greeting__slider',
    });
    $('.p-greeting__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.p-greeting__single',
        dots: true,
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        autoplay: true,
    });
    

    // ハンバーガーメニュー
    $('.l-header__menuTrigger').on('click', function(){
        $(this).toggleClass('is-active');
        $('.l-header__nav').toggleClass('is-active');
    });

    // 押したとき解除
    $('.l-header__menuLink').on('click', function(){
        $('.l-header__menuTrigger').removeClass('is-active');
        $('.l-header__nav').removeClass('is-active');
    });

    // スクロールしたときの動き
    $(window).on('scroll', function(){
        // スクロールしたときのヘッダー表示
        if($(window).scrollTop() > 100){
            $('.l-header').addClass('sticky');
        } else {
            $('.l-header').removeClass('sticky');
        }

        // フェードイン
        $('[data-fadein]').each(function(index, el){
            if( $(window).scrollTop() > ( $(el).offset().top - $(window).height() -800 ) ){
                $(el).addClass('is-over');
            }
        });
    });

    // アコーディオンメニュー
    $('[data-accordion="menuOuter"]').on('click', function() {
        $(this).toggleClass('is-active');
        $(this).next().slideToggle();
    });

    // モーダル
    $('.modal-open').each(function(){
        $(this).on('click',function(){
            var target = $(this).data('target');
            var modal = document.getElementById(target);
            $(modal).addClass('active');
            return false;
        });
    });
    $('.p-TrainPictures__modal__close').on('click',function(){
        $('.p-TrainPictures__modal').removeClass('active');
        return false;
    }); 

});

// each:スクロールするたびに指定したclassやdataを見に行ってくれる
// scrollTop:スクロールの位置を取得できる
// offset;HTML要素が配置されている座標