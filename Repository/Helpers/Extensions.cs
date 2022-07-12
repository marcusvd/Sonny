using System.Globalization;
using System.Text;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Helpers
{
    public static class Extensions
    {

        public static string RemoveAccents(this string text)
        {
            StringBuilder sbReturn = new StringBuilder();
            var arrayText = text.Normalize(NormalizationForm.FormD).ToCharArray();
            foreach (char letter in arrayText)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(letter) != UnicodeCategory.NonSpacingMark)
                    sbReturn.Append(letter);
            }
            
            return sbReturn.ToString();
        }

    }
}

// public static string RemoveAccents(this string text){   
//     StringBuilder sbReturn = new StringBuilder();   
//     var arrayText = text.Normalize(NormalizationForm.FormD).ToCharArray();
//     foreach (char letter in arrayText){   
//         if (CharUnicodeInfo.GetUnicodeCategory(letter) != UnicodeCategory.NonSpacingMark)
//             sbReturn.Append(letter);   
//     }   
//     return sbReturn.ToString();   
// } 