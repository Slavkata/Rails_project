require 'test_helper'

class PotionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @potion = potions(:one)
  end

  test "should get index" do
    get potions_url
    assert_response :success
  end

  test "should get new" do
    get new_potion_url
    assert_response :success
  end

  test "should create potion" do
    assert_difference('Potion.count') do
      post potions_url, params: { potion: { bonus_health.integer: @potion.bonus_health.integer, bonus_power.integer: @potion.bonus_power.integer, owner.string: @potion.owner.string, used.integer: @potion.used.integer } }
    end

    assert_redirected_to potion_url(Potion.last)
  end

  test "should show potion" do
    get potion_url(@potion)
    assert_response :success
  end

  test "should get edit" do
    get edit_potion_url(@potion)
    assert_response :success
  end

  test "should update potion" do
    patch potion_url(@potion), params: { potion: { bonus_health.integer: @potion.bonus_health.integer, bonus_power.integer: @potion.bonus_power.integer, owner.string: @potion.owner.string, used.integer: @potion.used.integer } }
    assert_redirected_to potion_url(@potion)
  end

  test "should destroy potion" do
    assert_difference('Potion.count', -1) do
      delete potion_url(@potion)
    end

    assert_redirected_to potions_url
  end
end
