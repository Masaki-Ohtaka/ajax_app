Rails.application.routes.draw do
  root to: 'posts#index' #⇦編集トップページにアクセルする様に設定した
  #投稿完了しましたという機能をがない為、ページは不要なので削除⇨get 'posts/new',to: 'posts#new'
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked'
end
