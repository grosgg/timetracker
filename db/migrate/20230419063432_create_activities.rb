class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.string :activity_type
      t.datetime :start
      t.datetime :end
      t.string :title

      t.timestamps

      t.references :user, null: false, sforeign_key: true
    end
  end
end
