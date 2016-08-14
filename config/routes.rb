Rails.application.routes.draw do

  root to: 'static_pages#root'
  post 'api/invitation/', to: 'api/emails#invitational_email', format: :json

  namespace :api do
    resources :users, only: [:create], format: :json
    resource :session, only: [:create, :destroy], format: :json
    resources :forms, except: [:new, :edit], format: :json
    resources :fields, only: [:destroy], format: :json
    resources :choices, only: [:destroy], format: :json
    resources :responses, only: [:create, :show, :index], format: :json
  end


end
