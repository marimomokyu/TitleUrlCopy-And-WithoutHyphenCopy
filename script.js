(function(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
})(function(){
    function canselEvent(e){
        e.stopPropagation();
        e.preventDefault();
        return false;
    }
    function toClipBoard(text){
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "0";
        ta.style.top = "0";

        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.parentElement.removeChild(ta);  
    }
    var arrayTime = [];
    var arrayKey = [];
    var pressedKeys = [];
    var PageTitle = document.title;
    var PageURL = location.href;


    

    document.addEventListener("keydown", function(e) {

        var selecttext = window.getSelection().toString().replace(/ /g, '');
        if(selecttext == ""){
            //選択されたテキストがない状態でCtrl+cが押下されたらタイトル+URLをコピーする
            
            switch(e.keyCode){
                case 67: //c
                    pressedKeys[0] = true;
                    break;
                case 91: //ctrl
                    pressedKeys[1] = true;
                    break;
                default:
                    break;
            }
            if(pressedKeys[0] && pressedKeys[1]){
                //タイトル+URLをクリップボードに小p＠いー

                //初期化
                pressedKeys[0] = false;
                pressedKeys[1] = false;
                //alert('Ctrl+C!!!!!!!!!!!!!!!!!!!');
                //alert(PageTitle + '\n' + PageURL);
                toClipBoard(PageTitle + '\n' + PageURL);
            }


            return;
        }

            switch(e.which){
                
                    case 91:                 // *: キーコードを指定
                        var now = new Date();
                        
                        if(arrayTime.length < 2){
                            //普通に追加
                            arrayTime.push(now.getFullYear() + '/'  + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
                            arrayKey.push(e.which);
                        }
                        //一番古いデータを削除してから配列に追加(画面が開かれて最初のクリックの際は配列が2つなので削除しない)
                        if(arrayTime.length > 2){
                            arrayTime.shift();
                            arrayKey.shift();
                        }
                        //一番古いデータを削除してから配列に追加
                        arrayTime.shift();
                        arrayKey.shift();
                        arrayTime.push(now.getFullYear() + '/'  + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
                        arrayKey.push(e.which);   
                        

                        //canselEvent(e);     // イベント伝播をキャンセル
                        break;
                    case 67:
                        var now = new Date();
                        
                        if(arrayTime.length < 2){
                            //普通に追加
                            arrayTime.push(now.getFullYear() + '/'  + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
                            arrayKey.push(e.which);
                        }
                        //一番古いデータを削除してから配列に追加(画面が開かれて最初のクリックの際は配列が2つなので削除しない)
                        if(arrayTime.length > 2){
                            arrayTime.shift();
                            arrayKey.shift();
                        }
                        arrayTime.push(now.getFullYear() + '/'  + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
                        arrayKey.push(e.which);
                            
                        //Ctrl → c → cの順番なら通知
                        if(arrayKey[0] ==91 && arrayKey[1] ==67 && arrayKey[2] ==67 ){
                            
                            //間隔が短ければ
                            if(now.getTime() - Date.parse(arrayTime[1]) < 2000){
                                //ハイフンを除いてコピーする
                                var selectionText = window.getSelection().toString();
                                
                                var markdown = selectionText.replace(/-/g, '');
                                toClipBoard(markdown);
                            }
                        }
                        

                        //canselEvent(e);     // イベント伝播をキャンセル
                        break;
                    default:
                        
                        var now = new Date();
                        if(arrayTime.length < 2){
                            //普通に追加
                            arrayTime.push(now.getFullYear() + '/'  + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
                            arrayKey.push(e.which);
                        }
                        //一番古いデータを削除してから配列に追加(画面が開かれて最初のクリックの際は配列が2つなので削除しない)
                        if(arrayTime.length > 2){
                            arrayTime.shift();
                            arrayKey.shift();
                        }
                        //一番古いデータを削除してから配列に追加
                        arrayTime.shift();
                        arrayKey.shift();
                        arrayTime.push(now.getFullYear() + '/'  + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
                        arrayKey.push(e.which);   

                        //canselEvent(e);     // イベント伝播をキャンセル
                        break;
                }
        });
    
    document.addEventListener("keyup",function(e) {
        var selecttext = window.getSelection().toString().replace(/ /g, '');
        if(selecttext !== ""){
            //選択状態の場合はタイトル+URLをコピーしない
            return;
        }
		switch(e.keyCode){
            case 67: //c
                pressedKeys[0] = false;
                //alert('67 keyup');
                break;
            case 91: //ctrl
                pressedKeys[1] = false;
                //alert('91 keyup');
                break;
            default:
                break;
		}
    });
});