const question = [
    ["ballgif", "Q1.",
        "鉄球の質量を測ろうとしたところ、全て落としてしまいました。総重量を画面から読み取り、鉄球１つあたりの質量を答えなさい。",
        "", "", 
        "", "", "2.25", "2.35", "2.55","2.6", 2],

    ["nazotokiback", "Q2.",
        "",
        "( 残り時間 20秒・10秒 で【ヒント】が出現 )","【Hint.】", "➊ 色を英単語で表す", 
        "➋ 英単語の〇番目の文字", "虹", "兎", "戻","再", 1],
    
        ["hanabigif", "Q3.",
        "画面上の赤・青・黄・緑の４色の花火のうち、黄色の花火は「 何ヶ所 」から表示されているか答えなさい。",
        "","", "", "", "3ヶ所", "4ヶ所", "5ヶ所","6ヶ所", 4],
];


let countDownTime = 30; //制限時間
let successFlag = false; //最後まで回答したか
let successCount = 0; //正答数
let questionCount = 0; //問題数


const ansStartbutton = document.getElementById("ansStartbutton")
const ansArea = document.getElementById("ansArea")
const countDown = document.getElementById("countDown")


const image = document.getElementById("image")
const gamegamenbox = document.getElementById("gamegamenbox")
const mainbox = document.getElementById("mainbox")


const sbutton_box = document.getElementById("sbutton_box")
const rebutton_box = document.getElementById("rebutton_box")
const mainunder_box = document.getElementById("mainunder_box")
const progress_box = document.getElementById("progress_box")
const qcount_area = document.getElementById("qcount_area")
const qcountdown_area = document.getElementById("qcountdown_area")
const qselect_area = document.getElementById("qselect_area")


const loadbutton = document.getElementById("loadbutton")




window.onload = () => {
    classAdd();
}

// ロード時に一瞬の黒
const classAdd = () => {
    const snipper = document.getElementById('loading');
    snipper.classList.add('loaded');
}



// プログレスバーの進捗値
let val;
// 一定間隔で処理を行うintervalのIDを保持
let intervalID;



//最初はボタンだけを表示(ゲージoff・問題文・選択肢・回答ボタンoff・タイマーoff)
progress_box.style.visibility = "hidden"
mainunder_box.style.visibility = "hidden"
qcount_area.style.visibility = "hidden"
qcountdown_area.style.visibility = "hidden"
qselect_area.style.visibility = "hidden"


// & リセットボタンは1200以上なら最初触れないように
//   1200以下なら最初は表示させない。

let width = window.innerWidth
  if (width < 1200) {
    loadbutton.style.visibility = "hidden"
  } else {
    loadbutton.disabled = "disabled";
  }




//問題を解くボタンを押して、スタート！
const ansStart = () => {

    //問題解くボタンoff、 ゲージon・問題文・選択肢・回答ボタンon・タイマーon
    sbutton_box.style.visibility = "hidden";
    progress_box.style.visibility = "visible"
    mainunder_box.style.visibility = "visible"
    qcount_area.style.visibility = "visible"
    qcountdown_area.style.visibility = "visible"
    qselect_area.style.visibility = "visible"

    // & リセットボタンを1200以上なら出現、1200以下なら機能するよう改変

    if (width < 1200) {
        loadbutton.style.visibility = "visible"
        loadbutton.classList.add("button-shadow2-2")
        loadbutton.innerHTML = "<h2>←</h2>";
      } else {
        loadbutton.disabled = null;
        loadbutton.classList.add("button-shadow2-2")
        loadbutton.innerHTML = "<h2>Click<br>To Replay</h2>";
      }



    //下で定義するそれぞれの関数起動
    countDownTimer();

    gamenresset();

    viewQuestion();

    hintAppear1();



    //下二つはプログレスバーの記述
    //初期値の設定
    val = 0;

    // 50msおきにプログレスバーを更新する
    intervalID = setInterval("updateProgress()", 150);
}



// プログレスバーを更新する
function updateProgress() {

    // プログレスバーの進捗値を更新し、プログレスバーに反映させる
    val += 1;
    document.getElementById("myProgress").value = val;
    document.getElementById("myProgress").innerText = val + "%";
    console.log("progress:", val, "%");

    // 最大値まで達したら終了
    if (val == 200) {
        clearInterval(intervalID);
    }
}



//制限時間の関数
const countDownTimer = () => {

    if (successFlag == false) {

        if (countDownTime > 20) {

            if (width < 769) {
                countDown.innerHTML = `<span class="pattern_a">${countDownTime}秒</span>`;
              } else {
                countDown.innerHTML = `残り時間<br> <span class="pattern_a">${countDownTime}秒</span>`;
              }

        } else if ((countDownTime >= 11) && (countDownTime <= 20)) {

            if (width < 769) {
                countDown.innerHTML = `<span class="pattern_b">${countDownTime}秒</span>`;
              } else {
                countDown.innerHTML = `残り時間<br> <span class="pattern_b">${countDownTime}秒</span>`;
              }

        } else if ((countDownTime >= 6) && (countDownTime <= 10)) {
            
            if (width < 769) {
                countDown.innerHTML = `<span class="pattern_f">${countDownTime}秒</span>`;
              } else {
                countDown.innerHTML = `残り時間<br> <span class="pattern_f">${countDownTime}秒</span>`;
              }

        } else if (countDownTime <= 5) {
            
            if (width < 769) {
                countDown.innerHTML = `<span class="pattern_c">${countDownTime}秒</span>`;
              } else {
                countDown.innerHTML = `残り時間<br> <span class="pattern_c">${countDownTime}秒</span>`;
              }
        }


        if (!countDownTime == 0) {
            setTimeout(() => {
                countDownTime = countDownTime - 1;
                countDownTimer();
            }, 1000);
        }

        else {
            setTimeout(() => {

                alert("時間切れ");

                //カウントをリセットする
                countDownTime = 10;


                //正答数及び問題数のリセット
                questionCount = 0;
                successCount = 0;


                //ゲージoff・問題文・選択肢・回答ボタンoff・タイマーoff
                progress_box.style.visibility = "hidden"
                mainunder_box.style.visibility = "hidden"
                qcountdown_area.style.visibility = "hidden"
                qselect_area.style.visibility = "hidden"


                //問題数の表示内容を「TIME UP」にして背景色をなしに
                if (width < 565) {
                    qcount_area.style.backgroundColor = "transparent"
                    document.getElementById("questionnum").innerHTML = `<span class="pattern_c">TIME UP<span class="pattern_b"></span>`

                  } else {
                    qcount_area.style.backgroundColor = "transparent"
                    document.getElementById("questionnum").innerHTML = `<span class="pattern_c">TIME<br>UP<span class="pattern_b"></span>`
                  }
                

                //内側背景のリセット
                backgroundresset();


                //ゲーム画面背景の削除＆ゲームオーバー背景の追加
                gamegamenbox.classList.remove("gamestartback")
                gamegamenbox.classList.add("gameoverback")

            }, 500)
        }
    }

}



//問題文を表示する関数
const viewQuestion = () => {

    //背景gif画像表示
    mainbox.classList.add(question[questionCount][0])

    //問題文表示
    document.getElementById("question").innerHTML = question[questionCount][1];
    document.getElementById("question_sentence").innerHTML = question[questionCount][2];
    document.getElementById("hint_sentence").innerHTML = question[questionCount][3];

    //選択肢表示
    document.getElementById("ans1").innerHTML = question[questionCount][4];
    document.getElementById("ans2").innerHTML = question[questionCount][5];
    document.getElementById("ans3").innerHTML = question[questionCount][6];

    //回答表示
    document.getElementById("ansButton1").innerHTML = question[questionCount][7];
    document.getElementById("ansButton2").innerHTML = question[questionCount][8];
    document.getElementById("ansButton3").innerHTML = question[questionCount][9];
    document.getElementById("ansButton4").innerHTML = question[questionCount][10];

    //問題数の表示
    document.getElementById("questionnum").innerHTML = `全${question.length}問中<br>第<span class="pattern_b">${questionCount + 1}</span>問`

}



//回答ボタンを押したときの関数
const ansButton = (e) => {

    hintReject1();

    if (e == question[questionCount][11]) {

        alert("正解！")

        //正答数のカウントを増やす
        successCount = successCount + 1; // or successCount++;

    } else {

        alert("ざんねん！！")
    
    }


    //問題数のカウントを増やす
    questionCount++;  // or questionCount = questionCount + 1;

    //ゲージのリセット
    val = 0;

    //カウントダウンをリセットする
    countDownTime = 31;

    
    //二問目の変更項目
    if (questionCount == question.length - 2) {
        document.getElementById("ans1").style.top = "55%";
        document.getElementById("ans1").style.left = "5%";
        document.getElementById("ans2").style.top = "70%";
        document.getElementById("ans2").style.left = "5%";
        document.getElementById("ans3").style.top = "80%";
        document.getElementById("ans3").style.left = "5%";

        hintAppear2();

    } else {

        hintReject2();
    
    }


    //問題がすべて終わったら～の処理
    if (questionCount == question.length) {

        if (questionCount == successCount) {
            document.getElementById("answer").innerHTML = `おめでとうございます！<br><span class="pattern_e">全問正解</span> です！！`;
            gamegamenbox.classList.add("finhanabiback")

        } else if (successCount == 0) {
            document.getElementById("answer").innerHTML = `次は頑張りましょう。<br><span class="pattern_c">全問不正解</span> です。`;
            gamegamenbox.classList.add("finsakuraback")

        } else {
            document.getElementById("answer").innerHTML = `お疲れさまでした。<br>全${questionCount}問中 <span class="pattern_d">${successCount}問</span> 正解です。`;
            gamegamenbox.classList.add("finkamihubukiback")
        }


        mainbox.style.visibility = "hidden"
        progress_box.style.visibility = "hidden"
        mainunder_box.style.visibility = "hidden"
        qcount_area.style.visibility = "hidden"
        qcountdown_area.style.visibility = "hidden"
        qselect_area.style.visibility = "hidden"


        //問題数の表示の記述を変更
        // document.getElementById("questionnum").innerHTML = "おわり"

        successFlag = true;

    } else {

        viewQuestion();
    
    }

}



//問題gif背景画像のリセット関数
const backgroundresset = () => {

    let i = 0
    for (i; i <= question.length - 1; i++) {

        mainbox.classList.remove(question[i][0])

    }
}



//黒画面と「gameover」背景のリセット関数
const gamenresset = () => {
    gamegamenbox.classList.remove("gameoverback")
    gamegamenbox.classList.add("gamestartback")
}



//一問目のヒントを出す関数
const hintAppear1 = () =>{
    document.getElementById("ans1").classList.add("hint_appearance1");
    document.getElementById("ans2").classList.add("hint_appearance2");
    document.getElementById("ans3").classList.add("hint_appearance3");
}

//一問目のヒント消す関数
const hintReject1 = () =>{
    document.getElementById("ans1").classList.remove("hint_appearance1");
    document.getElementById("ans2").classList.remove("hint_appearance2");
    document.getElementById("ans3").classList.remove("hint_appearance3");
}



//二問目のヒント出す関数
const hintAppear2 = () =>{
    document.getElementById("ans1").classList.add("hint_appearance1");
    document.getElementById("ans2").classList.add("hint_appearance2");
    document.getElementById("ans3").classList.add("hint_appearance3");
}

//二問目のヒント消す関数
const hintReject2 = () =>{
    document.getElementById("ans1").classList.remove("hint_appearance1");
    document.getElementById("ans2").classList.remove("hint_appearance2");
    document.getElementById("ans3").classList.remove("hint_appearance3");
}




// リロードボタン
const Reload = () => {
    location.reload();
}
