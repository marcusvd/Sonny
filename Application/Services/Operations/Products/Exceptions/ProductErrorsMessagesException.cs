namespace Application.Exceptions
{

    public static class ProductErrorsMessagesException
    {
        //Adding Product
        public static readonly string AvailableQuantity = "300.0|Available quantity cannot be less than 1.";
        public static readonly string ProductStatus = "300.1|status should be available.";
        public static readonly string AddProductSoldDate = "300.2|when adding a product, the sale date must be empty.";
        public static readonly string AddProductIsReserved = "300.3|When adding a product, the field IsReserved must be empty";
        public static readonly string AddProductWarranty = "300.4|when adding a product warranty cannot be longer than five years.";
        public static readonly string AddProductEntryDate1 = "300.5|When adding product entrydate field cannot be empty.";
        public static readonly string AddProductEntryDate2 = "300.6|When adding the product entry date field, it cannot be less than 15 days from the current date.";
        public static readonly string AddProductEntryDate3 = "300.7|When adding the product entry date field, it cannot be more than 15 days from the current date.";

        //Updating product

    }
}














