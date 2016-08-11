class Api::EmailsController < ApplicationController

  def invitational_email
    first_field = params["emailParams"].values[0]
    accum_start = {first_field["name"] => first_field["value"]}
    messaged_params = params["emailParams"].values[1..-1].inject(accum_start) {|accum, field| accum.merge!({field["name"] => field["value"]}) }
    invitation = FormInvitationMailer.invitation_email(messaged_params["email"],
                                          messaged_params["recipient"],
                                          messaged_params["sender"],
                                          messaged_params["custom_message"],
                                          params["path"])
    if invitation.deliver
      render json: {email: "delivered"}
    else
      render json: {email: "not delivered!"}, status: 500
    end
  end

end
