class Api::ActivitiesController < ApplicationController
  before_action :check_authentication
  before_action :set_activity, only: %i[show update destroy]

  def index
    @activities = current_user.activities
    render json: @activities
  end

  def show
    render json: @activity
  end

  def create
    @activity = current_user.activities.new(activity_params)

    if @activity.save
      render json: @activity, status: :ok
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  def update
    if @activity.update(activity_params)
      render json: @activity, status: :ok
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @activity.destroy
  end

  private

  def check_authentication
    puts current_user
    puts user_signed_in?
    render(json: {}, status: 401) unless user_signed_in?
  end

  def set_activity
    @activity = current_user.activities.find(params[:id])
  end

  def activity_params
    params.require(:activity).permit(
      :activity_type,
      :start,
      :end,
      :title
    )
  end
end