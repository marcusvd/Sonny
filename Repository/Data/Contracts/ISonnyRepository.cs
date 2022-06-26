using System.Threading.Tasks;
using Domain.Entities;

namespace Repository.Data.Contracts
{
    public interface IISonnyRepository
    {
        //Geral
        void Add<T>(T entity) where T : class;
        void AddRange<T>(T[] entities) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entities) where T : class;
        void Update<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        //GETS
        //Clients
        // Task<ClientEntity[]> GetAllClientsAsync();
        // Task<ClientEntity> GetClientByIdAsync(int id);

        //Address
        Task<Address[]> GetAllAddressesAsync();
        Task<Address> GetAddressByIdAsync(int id);

        //Contact
        Task<Contact[]> GetAllContactAsync();
        Task<Contact> GetContactByIdAsync(int id);
        //Task<SocialNetwork[]> GetSocialNetWorksByIdContactAsync(int id);
        //Contact
        Task<NetworkDevice[]> GetAllNetworkDevicesAsync();
        Task<NetworkDevice> GetNetworkDevicesByIdAsync(int id);
        Task<SocialNetwork[]> GetSocialNetworkByIdAsync(int Id);
        //Internal
        //Financial
        Task<TypePayment[]> GetAllTypePaymentAsync();
        // Task<Supplier[]> GetAllSuppliers();
        // Task<Supplier> GetSupplierAsyncById(int Id, bool include);
        // Task<Partner[]> GetAllPartner();
        // Task<Partner> GetPartnerAsyncById(int Id,  bool include);
        Task<Inventory[]> GetAllInventoriesAsync();
        Task<Category[]> GetAllCategoryAsync();
        Task<SupplierTypePayment[]> GetSupplierTypePaymentBySupplierIdAsync(int Id);

    }
}