Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api do
    resources :users, only: [:create], format: :json
    resource :session, only: [:create, :destroy], format: :json
    resources :forms, except: [:new, :edit], format: :json
  end


end
