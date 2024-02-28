using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Application.Exceptions;
//using MailKit.Net.Smtp;
using MimeKit;

namespace Application.Services.Operations.Authentication
{

    public class EmailServer
    {
        public void Send(string To = "marcus@nostopti.com.br", string From = "marcus@nostopti.com.br", string DisplayName = "Sonny System",
        string Subject = "Test Subject", string Body = "Test", string MailServer = "smtp.nostopti.com.br",
         int Port = 587, bool IsUseSsl = false, string UserName = "marcus@nostopti.com.br", string Password = "Nsti@2023")
        {
            var message = new MailMessage("marcus@nostopti.com.br", To, Subject, Body);
            SmtpClient SmtpClient = new SmtpClient(MailServer)
            {
                Port = 587,
                Credentials = new NetworkCredential(UserName, Password),
            };
            SmtpClient.SendCompleted += (s, e) =>
           {
               SmtpClient.Dispose();
               message.Dispose();
           };
            try
            {
                SmtpClient.SendAsync(message, null);

            }
            catch (SmtpFailedRecipientException ex)
            {
                throw new EmailException($"{EmailErrosMessagesException.InvalidDomain} - {ex}");
            }
        }

    }


}