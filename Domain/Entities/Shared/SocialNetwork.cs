namespace Domain.Entities.Shared
{
    public class SocialNetwork
    {
        public SocialNetwork()
        {

        }
        public SocialNetwork(string name, string url)
        {
            Name = name;
            Url = url;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public bool Deleted { get; set; }
        public int ContactId { get; set; }
        public Contact Contact { get; set; }

    }
}