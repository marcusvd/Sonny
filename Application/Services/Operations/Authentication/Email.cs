using System.Net.Mail;
using System.Net;
using Application.Exceptions;

namespace Authentication.Services.Operations
{
    public class Email
    {
        public Email()
        {

        }


        public void SendEmail(string to, string subject, string body)
        {
           

            SmtpClient SmtpClient = new SmtpClient("smtp.nostopti.com.br")
            {
                Port = 587,
                Credentials = new NetworkCredential("marcus@nostopti.com.br", "Nsti@2023"),
            };
            try
            {
                SmtpClient.Send("marcus@nostopti.com.br", to, subject, body);

            }
            catch (SmtpFailedRecipientException ex)
            {
                 throw new EmailException($"{EmailErrosMessagesException.InvalidDomain} - {ex}");
            }
        }


    }
}
