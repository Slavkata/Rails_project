require 'test_helper'

class GadgetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @gadget = gadgets(:one)
  end

  test "should get index" do
    get gadgets_url
    assert_response :success
  end

  test "should get new" do
    get new_gadget_url
    assert_response :success
  end

  test "should create gadget" do
    assert_difference('Gadget.count') do
      post gadgets_url, params: { gadget: { bonus_health.integer: @gadget.bonus_health.integer, bonus_power.integer: @gadget.bonus_power.integer, name.string: @gadget.name.string, owner.string: @gadget.owner.string } }
    end

    assert_redirected_to gadget_url(Gadget.last)
  end

  test "should show gadget" do
    get gadget_url(@gadget)
    assert_response :success
  end

  test "should get edit" do
    get edit_gadget_url(@gadget)
    assert_response :success
  end

  test "should update gadget" do
    patch gadget_url(@gadget), params: { gadget: { bonus_health.integer: @gadget.bonus_health.integer, bonus_power.integer: @gadget.bonus_power.integer, name.string: @gadget.name.string, owner.string: @gadget.owner.string } }
    assert_redirected_to gadget_url(@gadget)
  end

  test "should destroy gadget" do
    assert_difference('Gadget.count', -1) do
      delete gadget_url(@gadget)
    end

    assert_redirected_to gadgets_url
  end
end
