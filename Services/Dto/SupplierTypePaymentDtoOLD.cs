namespace Services.Dto
{
    public class SupplierTypePaymentDto
    {
        public int? SupplierId { get; set; }
        public SupplierDto Supplier { get; set; }
        public int? TypePaymentId { get; set; }
        public TypePaymentDto TypePayment { get; set; }
    }
}