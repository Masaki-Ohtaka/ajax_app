function check() {
  const posts = document.querySelectorAll(".post");//index.html.erbの７から１４行目を発火させたいのでそこの要素.post指定
  posts.forEach(function (post) { 
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {//『クリック』した際に動作するイベント駆動」を設定
      const postId = post.getAttribute("data-id");//date-id取得
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);//リクエストの詳細を指定しましょう
      XHR.responseType = "json";//レスポンスの形式設定(json式)
      XHR.send();//リクエストを送信
      XHR.onload = () => {
        if (XHR.status != 200) {//HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;//レスポンス処理にあたる15行目以降を実行させない為          
        }
        const item = XHR.response.post;
        if (item.checked === true) {//レスポンスがあった時の処理
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
