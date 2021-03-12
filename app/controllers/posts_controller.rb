class PostsController < ApplicationController 
  
  def index
    @posts = Post.all  # すべてのレコードを@postsに代入
  end

  def new
  end
end
