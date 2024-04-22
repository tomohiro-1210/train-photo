$(() => {
    class Chat {
        constructor(){
            this.count = 0;//何問目かのカウント
            this.logs = [];//ユーザーがクリックした履歴
        }
        output(){
            if( this.count < questions.length ){
                this.textPush(questions[this.count]['title']);
                setTimeout(() => {
                    questions[this.count]['list'].forEach((text, index) => {
                        $('#select-list').append(`<li data-number="${index+1}">${text}</li>`).removeClass('slideOut');
                    });
                },600);
            }else{
                this.result();
            }
        }
        init(){
            this.output();
            this.answer();
        }
        textPush(text){
            $('#chat-ul').append(`<li>${text}</li>`);
        }
        answer(){
            $('body').on('click','#select-list li', (e) => {
                this.textPush($(e.target).text());
                this.logs[this.count] = Number($(e.target).attr('data-number'));
                $('#select-list').addClass('slideOut');
                this.count++;
                $('#select-list li').remove();
                setTimeout(() => {
                    this.output();
                    this.positionning();
                },1000);
            });
        }
        positionning(){
            $('#chat-field').animate({
                scrollTop:$('#chat-ul').height()
            }, 800, 'swing');
        }
        get total(){
            return this.logs.reduce((a,x) => a+=x , 0);
        }
        result(){
            let message = '';
            if( this.total <= 6 ){
                message = 'アナタの選択は素晴らしい！';
            }else if( this.total <= 17 ){
                message = 'まだまだこれからです！！';
            }else{
                message = 'あなたは逃げてばかりですね！！';
            }
            this.textPush(message);
        }
    }

    const chat = new Chat();
    chat.init();


});