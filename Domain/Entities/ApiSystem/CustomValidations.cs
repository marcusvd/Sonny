using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.ApiSystem
{
    public class RequiredIfAttribute : ValidationAttribute
    {
        // public string PropertyName { get; set; }
        // public object Value { get; set; }

        // public RequiredIfAttribute(string errorMessage)
        // {
        //     // string propertyName,
        //     // PropertyName = propertyName;
        //     ErrorMessage = errorMessage;
        //     // Value = value;
        // }

        public override bool IsValid(object value)
        {
            var Comments = (string)value;
            if (Comments == null || Comments == "")
                {return false;}
                else{return true;}

            // var type = instance.GetType();
                // var propertyValue = (bool)type.GetProperty(PropertyName).GetValue(instance);
                // if (propertyValue == true && (decimal)value == 0)
                // {
                //     return new ValidationResult(ErrorMessage);
                // }
                // return new ValidationResult(ErrorMessage);

                // return new ValidationResult("Date of Birth is required.");
        }
    }
}