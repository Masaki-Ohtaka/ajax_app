function memo() {
  const submit = document.getElementById("submit");//投稿するボタンの情報を取得し、submit変数を定義し代入。
  submit.addEventListener("click", (e) => {//投稿するボタンを「click」した場合に実行される関数を定義
    const formData = new FormData(document.getElementById("form"));//フォームの情報をformData変数に代入し生成
    const XHR = new XMLHttpRequest();//非同期通信を実装させる為に、XMR変数にオブジェクトを生成
    XHR.open("POST", "/posts", true);//フォームデータを送るときなのでHTTPメソッドはPOST,パスの指定はposts,非同期の通信はオンなのでtrue
    XHR.responseType = "json";//返却されるデータ形式はJSONなので指定
    XHR.send(formData);//フォームのデータを送信
    XHR.onload = () => {//既読機能の実装時と同じように200以外のHTTPステータスが返却された場合の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;//レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");//HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content");//メモの入力フォームを取得,なぜなら送信後に入力フォームの文字列を削除するため
      const HTML = `
        <div class="post" data-id=${item.id}> 
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);//listという要素に対してHTMLを追加
      formText.value = "";//空の文字列に上書きされるような仕組み
    };
    e.preventDefault();//イベントを阻止させるメソッドを使用する事により処理の重複を防ぐ
  });
}
window.addEventListener("load", memo);//ページを読み込んだ後に実行