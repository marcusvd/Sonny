using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Application.Exceptions;
using Application.Services.Helpers;
using Domain.Entities.Authentication;
using Application.Services.Operations.Authentication.Dtos;

namespace Application.Services.Operations.Authentication
{
    public class AuthServices : IAuthServices
    {

        private readonly IAuthHelpersServices _iAuthHelpersServices;
        private readonly JwtHandler _jwtHandler;
        private readonly EmailServer _email;
        private readonly Email _email2;
        public AuthServices(
        IAuthHelpersServices iAuthHelpersServices,
         EmailServer email,
         Email email2,
        JwtHandler jwtHandler
        )
        {
            _iAuthHelpersServices = iAuthHelpersServices;
            _email = email;
            _email2 = email2;
            _jwtHandler = jwtHandler;
        }
        public async Task<UserToken> Login(MyUserDto user)
        {
            var myUser = await _iAuthHelpersServices.FindUserByNameOrEmailAsync(user.UserName);



            if (await _iAuthHelpersServices.IsLockedOutAsync(myUser))
            {
                await _iAuthHelpersServices.EmailIsNotConfirmedAsync(myUser);


                if (await _iAuthHelpersServices.CheckPasswordAsync(myUser, user.Password))
                {
                    if (await _iAuthHelpersServices.GetTwoFactorEnabledAsync(myUser))
                    {
                        var validator = await _iAuthHelpersServices.GetValidTwoFactorProvidersAsync(myUser);

                        if (validator.Contains("Email"))
                        {
                            var token = await _iAuthHelpersServices.GenerateTwoFactorTokenAsync(myUser, "Email");
                            _email.Send(To: myUser.Email, Subject: "SONNY: Autenticação de dois fatores", Body: "Código: Autenticação de dois fatores: " + token);

                            var returnUserToken = await _jwtHandler.GenerateUserToken(_iAuthHelpersServices.GetClaims(user, _iAuthHelpersServices.GetRoles(myUser)), user);

                            returnUserToken.Action = "TwoFactor";
                            return returnUserToken;
                        }
                    }


                    return await _jwtHandler.GenerateUserToken(_iAuthHelpersServices.GetClaims(user, _iAuthHelpersServices.GetRoles(myUser)), _iAuthHelpersServices.MyUserToMyUserDto(myUser));
                }
                throw new AuthServicesException("Erro desconhecido...");
            }

            var usrToken = new UserToken()
            {
                Authenticated = false,
                UserName = user.UserName,

            };

            return usrToken;
            // else
            // {
            //     _email.SendEmail(myUser.Email, "Sonny conta bloqueada.", "O número de dez tentativas de login foi esgotado e a conta foi bloqueada por atingir dez tentativas com senhas incorretas. Sugerimos troque sua senha. " + "Link para troca  de senha.");
            //     throw new AuthServicesException("Usuário está bloqueado.");
            // }

        }
        public async Task<UserToken> RegisterUser(MyUserDto user)
        {

            _iAuthHelpersServices.ObjIsNull(user);

            await _iAuthHelpersServices.EmailIsDuplicate(user.Email);

            await _iAuthHelpersServices.NameIsDuplicate(user.UserName);

            var myUser = _iAuthHelpersServices.User(user.Email, user.UserName, user.Company.Name);
            // myUser.LockoutEnabled = false;

            if (await _iAuthHelpersServices.RegisterUserAsync(myUser, user.Password))
            {
                string urlToken = await _iAuthHelpersServices.UrlEmailConfirm(myUser, "auth", "ConfirmEmailAddress");

                //    _email.Send(To:myUser.Email, Subject:"Sonny - Link para confirmação de e-mail", Body:"http://localhost:4200/confirm-email/" + urlToken);
                await _email.Send(To: myUser.Email, Subject: "Sonny - Link para confirmação de e-mail", Body: "http://localhost:4200/confirm-email/" + urlToken);
            }
            else
            {
                throw new AuthServicesException("Possível nome de usuario ou senha fora dos padrões.");
            }

            return await _jwtHandler.GenerateUserToken(_iAuthHelpersServices.GetClaims(user, _iAuthHelpersServices.GetRoles(myUser)), user);


        }

        public async Task<bool> RetryConfirmEmailGenerateNewToken(RetryConfirmPasswordDto retryConfirmPassword)
        {

            _iAuthHelpersServices.ObjIsNull(retryConfirmPassword);

            var myUser = await _iAuthHelpersServices.FindUserByEmailAsync(retryConfirmPassword.Email);

            _iAuthHelpersServices.EmailAlreadyConfirmed(myUser);



            string urlToken = await _iAuthHelpersServices.UrlEmailConfirm(myUser, "auth", "ConfirmEmailAddress");

            _email.Send(To: myUser.Email, Subject: "Sonny - Link para confirmação de e-mail", Body: "http://localhost:4200/confirm-email/" + urlToken);

            return true;
        }
        public async Task<bool> ForgotPassword(ForgotPasswordDto forgotPassword)
        {
            _iAuthHelpersServices.ObjIsNull(forgotPassword);

            var myUser = await _iAuthHelpersServices.FindUserByEmailAsync(forgotPassword.Email);

            string urlToken = await _iAuthHelpersServices.UrlPasswordReset(myUser, "auth", "Reset");

            _email.Send(To: myUser.Email, Subject: "Sonny - Link para reset de senha.", Body: "http://localhost:4200/reset-password/" + urlToken);

            return true;
        }
        public ResetPasswordDto ResetPassword(string token, string email)
        {
            return new ResetPasswordDto { Token = token, Email = email };
        }
        public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPassword)
        {
            return await _iAuthHelpersServices.ResetPasswordAsync(resetPassword);
        }
        public async Task<bool> ConfirmEmailAddress(ConfirmEmailDto confirmEmail)
        {
            var myUser = await _iAuthHelpersServices.FindUserByEmailAsync(confirmEmail.Email);

            if (myUser.EmailConfirmed)
                throw new AuthServicesException("Email já foi confirmado.");

            return await _iAuthHelpersServices.ConfirmingEmail(myUser, confirmEmail);
        }
        public async Task<UserToken> TwoFactor(T2FactorDto t2Factor)
        {
            var myUser = await _iAuthHelpersServices.FindUserByNameAsync(t2Factor.UserName);

            await _iAuthHelpersServices.VerifyTwoFactorTokenAsync(myUser, "Email", t2Factor);

            return await _jwtHandler.GenerateUserToken(
                                     _iAuthHelpersServices.GetClaims(_iAuthHelpersServices.MyUserToMyUserDto(myUser),
                                     _iAuthHelpersServices.GetRoles(myUser)),
                                     _iAuthHelpersServices.MyUserToMyUserDto(myUser));
        }

        public async Task<IdentityResult> CreateRole(RoleDto role)
        {
            _iAuthHelpersServices.ObjIsNull(role);

            return await _iAuthHelpersServices.CreateRole(role);

        }

        public async Task<string> UpdateUserRoles(UpdateUserRoleDto role)
        {
            _iAuthHelpersServices.ObjIsNull(role);

            return await _iAuthHelpersServices.UpdateUserRoles(role);

        }

        public async Task<IList<string>> GetRoles(MyUser user)
        {
            _iAuthHelpersServices.ObjIsNull(user);

            return await _iAuthHelpersServices.GetRoles(user);
        }
    }
}