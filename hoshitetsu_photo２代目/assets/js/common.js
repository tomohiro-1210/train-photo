// headerのハンバーガーメニュー
$(".l-header__hamburger").click(function () {
    $(this).toggleClass('open');
    $(".hamburger").toggleClass('open');
    $(".l-sp-menu").toggleClass('open');
});
$(".hamburger").click(function () {
    $(this).toggleClass('open');
    $(".l-header__hamburger").toggleClass('open');
    $(".l-sp-menu").toggleClass('open');
});

// fvスライダー
$('.top-fv__slider').slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
  });

// header-train
document.addEventListener('DOMContentLoaded', function() {
    var ball = document.getElementById('header-train');
    ball.style.bottom = '0';
    ball.style.left = '0';
  });
// header-train
document.addEventListener('DOMContentLoaded', function() {
    var ball = document.getElementById('footer-train');
    ball.style.bottom = '0';
    ball.style.left = '0';
  });