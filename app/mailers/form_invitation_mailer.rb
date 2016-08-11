class FormInvitationMailer < ApplicationMailer
  default from: "invitations@formu.herokuapp.com"


  def invitation_email(email, recipient, sender, custom_message, path)
    @recipient = recipient
    @custom_message = custom_message
    @sender = sender
    @form_path = path
    @email = email;
    mail(to: @email, subject: "Hi #{recipient}, #{sender} has invited you to fill out a form!")
  end
end
