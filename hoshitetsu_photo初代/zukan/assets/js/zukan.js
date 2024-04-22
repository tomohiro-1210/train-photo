
    // ローダー
$(window).on('load',function(){
    $(".loading").delay(2000).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
});

$(function(){

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

    // アコーディオンメニュー
    $('[data-accordion="menuOuter"]').on('click', function() {
        $(this).toggleClass('is-active');
        $(this).next().slideToggle();
    });

    // urlから配列を取得
    const param_key = location.search.substring(1).split('=')[0];
    const param_value = location.search.substring(1).split('=')[1];

    // 会社別リスト
    const companys = ['hanshin', 'sanyo'];

    // contentsからidを取得
    const page_type = $('.contents').attr('id');


    // 電車リストの生成
    function createTrain(trains){
        let html_train_data = '';
        trains.forEach(function(train, index){
            html_train_data += `<div class="p-trainList__item" >
                <img src="./assets/img/zukan/${train['company_en']}/${train['series_en']}_1.jpg" alt="" class="p-trainList__img">
                <div class="p-trainList__wrap">
                    <p class="p-trainList__series">
                        <span>${train['company_ja']}${train['series']}</span><br>
                        <span>${train['colors']}</span>
                    </p>
                    <div class="c-btn">
                        <a href="./zukan_trainDetail.html?series_en=${train['series_en']}">${train['company_ja']}${train['series']}を見る！</a>
                    </div>
                </div>
            </div>`;
        });
        return html_train_data;
        // ↑返したいデータを最初にreturnで書くのも良い。
    }


        // ピックアップシャッフル
        function pickupShuffle(train_data){
            let trains = [];
            let random_check = [];
            for( let i = 0; i < 9; i++ ){
                let j = Math.floor(Math.random() * train_data.length);
                if (random_check.indexOf(j) !== -1 ){
                    i--;
                    continue;
                    // 上
                }else{
                    random_check.push(j);
                    trains.push(train_data[j]);
                }
            }
            return trains;
        }
        let train_list_pickup = createTrain(pickupShuffle(train_data));
    
        // ピックアップ出力
        $('[data-train-list="pickup"]').append(train_list_pickup);
    
    //図鑑TOPページコード 
    if( page_type == 'zukanTop' ){
        // スライダー右回り
        $(".slider").slick({
            autoplay: true,
            autoplaySpeed: 0,
            speed: 5000,
            cssEase: "linear",
            slidesToShow: 4,
            arrows: false,
            pauseOnHover:false,
            pauseOnFocus:false,
            PauseOnDotsHover:false,
            responsive:[
                {
                    breakpoint:901,
                    settings:{
                        slidesToShow:2,
                        slidesToScroll:1,
                        speed: 3000,
                    }
                },
            ]
        });
        // スライダー左回り
        $(".slider-reverse").slick({
            autoplay: true,
            autoplaySpeed: 0,
            speed: 5000,
            cssEase: "linear",
            slidesToShow: 4,
            arrows: false,
            rtl:true,
            pauseOnHover:false,
            pauseOnFocus:false,
            PauseOnDotsHover:false,
            responsive:[
                {
                    breakpoint:901,
                    settings:{
                        slidesToShow:2,
                        slidesToScroll:1,
                        speed: 3000,

                    }
                },
            ]
        });
    };

    // 会社別コード
    if( page_type == 'company'){
            // データ取得
        function getTrainList(key, value = null){
            // urlまたは
            const search_value = value ? value : param_value;
            const trains = train_data.filter(function(train, index){
                switch(key){
                    // 会社別にフィルタリング
                    case 'company_en':
                        return train[key] == search_value;
                        break;
                }
            });
            return trains;
        }

        // 会社別出力
        companys.forEach(function(company){
            let train_list_company = getTrainList('company_en', company);
            train_list_company = createTrain(train_list_company);
            $(`[data-train-list="${company}"]`).append(train_list_company);
        })

        // 会社別ページに出力
        const company_train_list = createTrain(getTrainList(param_key));
        $('.companyList').append(company_train_list);
    
        
        // param_valueのデータをフィルタリング
        function getTrainList2(key){
            const trains = train_data.filter(function(train){
                switch(key){
                    // 会社別にフィルタリング
                    case 'company_en':
                        return train[key] == param_value;
                        break;
                }
            });
            return trains;
        }

        // param_valueからバナー画像と会社名を出力する
        let train_list_company2 = getTrainList2('company_en', param_value);
            const trainSingle = train_list_company2[0];
            const company_type = trainSingle['company_type'];
            $('body').toggleClass(company_type);
            Object.keys(trainSingle).forEach(function(key){
                $(`[data-train-list="${key}"]`).text(trainSingle[key]);
            });
            

        // バナー画像取得 
        $('#bannerImg').attr('src', `./assets/img/banner/${param_value}_banner.png`);
        
    };

    // 電車詳細Pのコード
    if( page_type == 'Detail'){
        
        // スライダー
        $(".p-trainImg__list").slick({
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 2000,
            cssEase: "linear",
            slidesToShow: 1,
            arrows: false,
            pauseOnHover:false,
            pauseOnFocus:false,
            PauseOnDotsHover:false,
        });

        // 電車の１つのデータ取得
        function getTrainSingle() {
            const train_single = train_data.find(function(train){
                return train['series_en'] == param_value;
            });
            return train_single;
        }

        // 詳細ページ出力
        const train_detail = getTrainSingle();
        Object.keys(train_detail).forEach(function(key){
            $(`[data-train-parts="${key}"]`).text(train_detail[key]);
        });

        // 画像取得
        $('.p-trainImg__image_1').attr('src', `./assets/img/zukan/${train_detail['company_en']}/${train_detail['series_en']}_1.jpg`);
        $('.p-trainImg__image_2').attr('src', `./assets/img/zukan/${train_detail['company_en']}/${train_detail['series_en']}_2.jpg`);
        $('.p-trainImg__image_3').attr('src', `./assets/img/zukan/${train_detail['company_en']}/${train_detail['series_en']}_3.jpg`);

        // モーダル画像取得
        $('.modal-img1').attr('src', `./assets/img/modal/${train_detail['company_en']}/${train_detail['series_en']}_1.jpg`);
        $('.modal-img2').attr('src', `./assets/img/modal/${train_detail['company_en']}/${train_detail['series_en']}_2.jpg`);
        $('.modal-img3').attr('src', `./assets/img/modal/${train_detail['company_en']}/${train_detail['series_en']}_3.jpg`);
        $('.modal-img4').attr('src', `./assets/img/modal/${train_detail['company_en']}/${train_detail['series_en']}_4.jpg`);

        
        
        // リンクルート会社名表示
        $('#company_name').attr('href', `./zukan_company.html?company_en=${train_detail['company_en']}`);

        // bodyクラス付与
        $('body').toggleClass(`${train_detail['company_type']}`);

        // モーダル
        $('.modal-open').each(function(){
            $(this).on('click',function(){
                var target = $(this).data('target');
                var modal = document.getElementById(target);
                $(modal).addClass('active');
                return false;
            });
        });
        $('.p-img__modal').on('click',function(){
            $('.p-img__modal').removeClass('active');
            return false;
        }); 

        let number = [];
        let random_check = [];
        const numbers = [1,2,3,4,5,6];
        for( let a = 0; a < 4; a++ ){
            let b = Math.floor(Math.random() * numbers.length);
            if (random_check.indexOf(b) !== -1 ){
                a--;
                continue;
                // 上
            }else{
                
                random_check.push(b);
                number.push(numbers[b]);
            }
        }

    };
    

});

