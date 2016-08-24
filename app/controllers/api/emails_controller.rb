class Api::EmailsController < ApplicationController

  def invitational_email
    first_field = params["emailParams"].values[0]
    accum_start = {first_field["name"] => first_field["value"]}

    massaged_params = params["emailParams"].values[1..-1].inject(accum_start) {|accum, field| accum.merge!({field["name"] => field["value"]}) }
    invitation = FormInvitationMailer.invitation_email(massaged_params["email"],
                                          massaged_params["recipient"],
                                          massaged_params["sender"],
                                          massaged_params["custom_message"],
                                          massaged_params["path"])
    if !/\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.match(massaged_params["email"])
      render json: {email: "invalid"}, status: 400
    elsif invitation.deliver
      render json: {email: "delivered", recipient: massaged_params["email"]}
    else
      render json: {email: "failure"}, status: 500
    end
  end

end
