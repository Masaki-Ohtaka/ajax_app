class PostsController < ApplicationController 
  
  def index
    @posts = Post.all.order(id: "DESC")  # 全レコードを@postsに代入〜新しいメモが一番上に表示させる様にする
  end

  #def new 投稿する機能がない為削除
  #end

  def create
    Post.create(content: params[:contet])
    redirect_to action: :index
  end
  
  def checked
    post = Post.find(params[:id])
    if post.checked #既読であるか否かの判定
      post.update(checked: false)#既読を解除するためfalseへ
    else
      post.update(checked: true)#既読にするためtrueへ変更
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end
