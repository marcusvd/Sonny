namespace Domain.Entities
{
    public class SupplierTypePayment
    {
        // public int Id { get; set;}
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public int TypePaymentId { get; set; }
        public TypePayment TypePayment { get; set; }

    }
}