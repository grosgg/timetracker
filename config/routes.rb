Rails.application.routes.draw do
  devise_for :users

  root to: redirect('/activities')

  get 'activities', to: 'site#index'
  get 'activities/new', to: 'site#index'
  get 'activities/:id', to: 'site#index'
  get 'activities/:id/edit', to: 'site#index'

  namespace :api do
    resources :activities, only: %i[index show create destroy update]
  end
end
