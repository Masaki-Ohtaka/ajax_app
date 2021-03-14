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
    if post.checked 
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end

end
