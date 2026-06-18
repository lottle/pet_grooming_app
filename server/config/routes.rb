Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      post   "auth/register", to: "auth#register"
      post   "auth/login",    to: "auth#login"
      delete "auth/logout",   to: "auth#logout"
      get    "auth/me",       to: "auth#me"

      resources :dogs
      resources :bookings, only: [:index, :show, :create, :destroy]
      resources :services, only: [:index, :show]

      namespace :business do
        resources :services
        resources :bookings, only: [:index, :show, :update, :destroy]
      end
    end
  end
end
