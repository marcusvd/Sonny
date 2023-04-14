using System.Collections.Generic;
using System.IO;
namespace Application.Exceptions
{

    public static class ErrorsMessagesException 
    {
        //ACCOUNTS
        public static readonly string EmailIsNotConfirmed = "Email precisa ser confirmado! Acesse seus emails, caso não o encontre na caixa de entrada olhe na caixa de spam. Obrigado!";
        public static readonly string EmailAlreadyRegisterd = "Email ja cadastrado.";
        public static readonly string UserNameAlreadyRegisterd = "Nome de usuário ja cadastrado.";
        public static readonly string IsEmailConfirmed = "Email já foi confirmado.";
        public static readonly string InvalidUserNameOrPassword = "Usuário ou senha incorreto.";
        public static readonly string ErrorIdUpdateUserAccount = "Dados inválidos. id's não coincidem.";
        public static readonly string UserAccountNotFound = "Usuário não encontrado.";
        public static readonly string ErrorWhenRegisterUserAccount = "Não foi possível cadastrar o usuário, verifique os dados e tente novamente, obrigado!";
        public static readonly string ErrorWhenTryUpdateUserAccount = "Erro ao tentar atualizar.";
        public static readonly string ErrorWhenGenerateEmailLink  = "O link não pode ser gerado.";
        public static readonly string UnknownError  = "O link não pode ser gerado.";

        //GENERAL MESSAGES
        public static readonly string ObjectIsNull = "Objeto era nulo.";
        public static readonly string TokenGenerationProvider = "Provedor era nulo.";
        public static readonly string ExpiredTokenOrInvalid = "Token expirado ou inválido.";
    }
}