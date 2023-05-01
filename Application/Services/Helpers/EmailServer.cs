using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Application.Exceptions;
//using MailKit.Net.Smtp;
using MimeKit;

namespace Application.Services.Helpers
{
    // public class EmailServer
    // {
    //     // private string _from { get; set; }
    //     // private string _displayName { get; set; }
    //     // private string _to { get; set; }
    //     // private string _subject { get; set; }
    //     // private string _body { get; set; }
    //     // private string _mailServer { get; set; }
    //     // private int _port { get; set; }
    //     // private bool _isUseSsl { get; set; }
    //     // private string _userName { get; set; }
    //     // private string _password { get; set; }

    //     public EmailServer(
    //         // string To = "marcus@nostopti.com.br", string From = "marcus@nostopti.com.br", string DisplayName = "Sonny System",
    //         // string Subject = "Test Subject", string Body = "Test", string MailServer = "smtp.nostopti.com.br",
    //         // int Port = 587, bool IsUseSsl = false, string UserName = "marcus@nostopti.com.br", string Password = "Nsti@2023"
    //         )
    //     {
    //         // _from = From;
    //         // _displayName = DisplayName;
    //         // _to = To;
    //         // _subject = Subject;
    //         // _body = Body;
    //         // _mailServer = MailServer;
    //         // _port = Port;
    //         // _isUseSsl = IsUseSsl;
    //         // _userName = UserName;
    //         // _password = Password;
    //     }

    //     public async Task Send(string To = "marcus@nostopti.com.br", string From = "marcus@nostopti.com.br", string DisplayName = "Sonny System",
    //         string Subject = "Test Subject", string Body = "Test", string MailServer = "smtp.nostopti.com.br",
    //         int Port = 587, bool IsUseSsl = false, string UserName = "marcus@nostopti.com.br", string Password = "Nsti@2023")
    //     {
    //         var Message = new MimeMessage();

    //         Message.From.Add(new MailboxAddress(DisplayName, From));
    //         Message.To.Add(new MailboxAddress("", To));
    //         Message.Subject = Subject;
    //         Message.Body = new TextPart("plain")
    //         {
    //             Text = @Body
    //         };

    //         using (var client = new SmtpClient())
    //         {
    //             client.ServerCertificateValidationCallback = (s, c, h, e) => true;
    //            await client.ConnectAsync(MailServer, Port, IsUseSsl);
    //            await client.AuthenticateAsync(UserName, Password);
    //            await client.SendAsync(Message);
    //            await client.DisconnectAsync(true);
    //         };
    //     }







    // }


    public class EmailServer{
           // private string _from { get; set; }
        // private string _displayName { get; set; }
        // private string _to { get; set; }
        // private string _subject { get; set; }
        // private string _body { get; set; }
        // private string _mailServer { get; set; }
        // private int _port { get; set; }
        // private bool _isUseSsl { get; set; }
        // private string _userName { get; set; }
        // private string _password { get; set; }

        public EmailServer(
            // string To = "marcus@nostopti.com.br", string From = "marcus@nostopti.com.br", string DisplayName = "Sonny System",
            // string Subject = "Test Subject", string Body = "Test", string MailServer = "smtp.nostopti.com.br",
            // int Port = 587, bool IsUseSsl = false, string UserName = "marcus@nostopti.com.br", string Password = "Nsti@2023"
            )
        {
            // _from = From;
            // _displayName = DisplayName;
            // _to = To;
            // _subject = Subject;
            // _body = Body;
            // _mailServer = MailServer;
            // _port = Port;
            // _isUseSsl = IsUseSsl;
            // _userName = UserName;
            // _password = Password;
        }

        public async Task Send(string To = "marcus@nostopti.com.br", string From = "marcus@nostopti.com.br", string DisplayName = "Sonny System",
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