namespace Domain.Entities.Shared
{
    public class SocialNetwork
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int ContactId { get; set; }
        public Contact Contact { get; set; }
        
    }
}