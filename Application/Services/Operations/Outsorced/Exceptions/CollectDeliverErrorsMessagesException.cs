namespace Application.Exceptions
{

    public static class CollectDeliverErrorsMessagesException
    {
        //Adding Product
        public static readonly string AvailableQuantity = "300.0|Available quantity cannot be less than 1.";
        public static readonly string ProductStatus = "300.1|status should be available.";
        public static readonly string AddProductSoldDate = "300.2|when adding a product, the sale date must be empty.";
        public static readonly string AddProductIsReserved = "300.3|When adding a product, the field IsReserved must be empty";
        public static readonly string AddProductWarranty = "300.4|when adding a product warranty cannot be longer than five years.";
        public static readonly string AddProductEntryDate1 = "300.5|When adding the product entry date field, it cannot be longer than current date.";
        public static readonly string AddProductEntryDate2 = "300.6|When adding the product entry date field, it cannot be more than 15 days from the current date.";
        //Updating product
        public static readonly string UpdateProductIsReserved1 = "300.7|If the isreserved field is not empty, the user ID must be informed.";
        public static readonly string UpdateProductIsReserved2 = "300.8|If the isreserved field is not empty, the Customer ID must be informed.";
        public static readonly string UpdateProductIsReserved3 = "300.9|If the isreserved field is not empty, the IsReserved field must be longer than current date.";
        public static readonly string UpdateProductIsReserved4 = "300.10| Field cannot be longer than 8 days from current date.";
        public static readonly string UpdateProduct = "300.11|If the data is not empty, the user ID must be informed.";
        public static readonly string UpdateProductSoldDate1 = "300.12|If the SoldDate field is not empty, the Customer ID must be informed.";
        public static readonly string UpdateProductSoldDate2 = "300.13|SoldDate field cannot be different from current date.";
        public static readonly string UpdateProductSoldDate3 = "300.14|SoldDate field cannot be longer than 7 days from current date.";
        public static readonly string UpdateProductWarrantyEnd1 = "300.15|WarrantyEnd field cannot be longer than or equal current field EntryDate.";
        public static readonly string UpdateProductWarrantyEnd2 = "300.16|WarrantyEnd field cannot be longer than five years from field EntryDate.";
        public static readonly string UpdateProductEntryDate1 = "300.17|Product Entrydate field cannot be empty.";
        public static readonly string UpdateProductEntryDate2 = "300.18|Product EntryDate field, it cannot be less than 15 days from the EntryDate field.";
        public static readonly string UpdateProductEntryDate3 = "300.19| Product EntryDate field, it cannot be more than 15 days from the current date.";


    }
}














