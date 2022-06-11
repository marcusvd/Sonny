using System.Threading.Tasks;
using Domain.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


namespace Repository.Data.Operations
{
    // public class SSonnyRepository : ISonnyRepository
    // {
    //     private readonly SonnyDbContext _CONTEXT;
    //     public SonnyRepository(SonnyDbContext CONTEXT)
    //     {
    //         _CONTEXT = CONTEXT;
    //     }
    //     public void Add<T>(T entity) where T : class
    //     {
    //         _context.Add(entity);
    //     }
    //     public void AddRange<T>(T[] entities) where T : class
    //     {
    //         _context.AddRange(entities);
    //     }

    //     public void Update<T>(T entity) where T : class
    //     {
    //         var Entity = _context.Update<T>(entity);
    //         Entity.State = EntityState.Modified;

    //         _context.Update<T>(entity); // .State = EntityState.Modified;
    //         //_context.Entry(entity).State = EntityState.Modified;
    //     }


    //     public async Task<bool> SaveChangesAsync()
    //     {
    //         if (await _context.SaveChangesAsync() > 0)
    //         {
    //             return true;
    //         }
    //         else
    //         {
    //             return false;
    //         }

    //     }
    //     public void Delete<T>(T entity) where T : class
    //     {
    //         var Entity = _context.Remove(entity);
    //         Entity.State = EntityState.Deleted;
    //         _context.Remove(entity);
    //     }
    //     public void DeleteRange<T>(T[] entities) where T : class
    //     {
    //         _context.RemoveRange(entities);
    //     }
    //     public Task<Address> GetAddressByIdAsync(int id)
    //     {
    //         throw new System.NotImplementedException();
    //     }
    //     public Task<Address[]> GetAllAddressesAsync()
    //     {
    //         throw new System.NotImplementedException();
    //     }
    //     // public async Task<ClientEntity[]> GetAllClientsAsync()
    //     // {
    //     //     IQueryable<ClientEntity> query = _context.Clients
    //     //     .AsNoTracking()
    //     //     .Include(_address => _address.Address)
    //     //     .Include(_contact => _contact.Contact)
    //     //     .Include(_networkDevices => _networkDevices.NetWorkDevices)
    //     //     .ThenInclude(_img => _img.Images);

    //     //     query = query.OrderBy(_name => _name.Name);
    //     //     return await query.ToArrayAsync();
    //     // }
    //     // public async Task<ClientEntity> GetClientByIdAsync(int id)
    //     // {
    //     //     IQueryable<ClientEntity> query = _context.Clients
    //     //     .AsNoTracking()
    //     //     .Include(_net => _net.NetWorkDevices)
    //     //     .Include(_address => _address.Address)
    //     //     .Include(_contact => _contact.Contact)
    //     //     .ThenInclude(_socialNetwork => _socialNetwork.socialnetworks);

    //     //     ClientEntity client = await query.AsNoTracking().FirstOrDefaultAsync(_client => _client.Id == id);

    //     //     return client;
    //     // }
    //     public async Task<Contact[]> GetAllContactAsync()
    //     {
    //         IQueryable<Contact> query = _context.Contacts
    //         .AsNoTracking()
    //          .Include(_networkDevices => _networkDevices.socialnetworks);
    //         query = query.OrderBy(_name => _name.Email);
    //         return await query.ToArrayAsync();
    //     }
    //     public async Task<Contact> GetContactByIdAsync(int id)
    //     {
    //         IQueryable<Contact> query = _context.Contacts
    //         .AsNoTracking()
    //         .Include(_net => _net.socialnetworks);

    //         Contact contact = await query.AsNoTracking().FirstOrDefaultAsync(_contact => _contact.Id == id);

    //         return contact;
    //     }
    //     // public  async Task<SocialNetwork[]> GetsocialnetworksByIdContactAsync(int id)
    //     // {
    //     //     IQueryable<SocialNetwork> query = _context.socialnetworks.
    //     //     AsNoTracking();

    //     //     SocialNetwork[] socialnetworks = await query.Select(_socialnetworks => _socialnetworks. == id);
    //     //     return socialnetworks;
    //     // }
    //     public async Task<NetworkDevices[]> GetAllNetworkDevicesAsync()
    //     {
    //         IQueryable<NetworkDevices> query = _context.NetworkDevices
    //         .AsNoTracking().Include(img => img.Images);

    //         query = query.OrderBy(manufacturer => manufacturer.Manufacturer);

    //         return await query.ToArrayAsync();

    //     }
    //     public async Task<NetworkDevices> GetNetworkDevicesByIdAsync(int id)
    //     {
    //         IQueryable<NetworkDevices> query = _context.NetworkDevices
    //         .AsNoTracking()
    //         .Include(img => img.Images);

    //         NetworkDevices networkDevices = await query.SingleAsync(_id => _id.Id == id);

    //         return networkDevices;
    //     }
    //     public async Task<TypePayment[]> GetAllTypePaymentAsync()
    //     {
    //         IQueryable<TypePayment> query = _context.TypesPayments
    //         .AsNoTracking();
    //         return await query.ToArrayAsync();
    //     }
    //     public async Task<SocialNetwork[]> GetSocialNetworkByIdAsync(int Id)
    //     {
    //         IQueryable<SocialNetwork> query = _context.socialnetworks
    //         .AsNoTracking();
    //         return await query.ToArrayAsync();
    //     }
    //     public Task<SupplierTypePayment[]> GetSupplierTypePaymentBySupplierIdAsync(int Id)
    //     {
    //         IQueryable<SupplierTypePayment> query = _context.SuppliersTypesPayments
    //         .AsNoTracking();

    //         IQueryable<SupplierTypePayment> result = query.Where(_id => _id.SupplierId == Id)

    //         .Include(_sup => _sup.TypePayment);

    //         return result.ToArrayAsync();

    //     }
    //     // public Task<Supplier[]> GetAllSuppliers()
    //     // {
    //     //     IQueryable<Supplier> query = _context.Suppliers
    //     //     .AsNoTracking()
    //     //     .Include(_pay => _pay.SuppliersTypesPayments)
    //     //     .OrderBy(_name => _name.Name);

    //     //     return query.ToArrayAsync();
    //     // }
    //     // public async Task<Supplier> GetSupplierAsyncById(int Id, bool include)
    //     // {

    //     //     IQueryable<Supplier> Result = _context.Suppliers.AsNoTracking();
    //     //     if (include)
    //     //     {
    //     //         Result = Result
    //     //         .Include(_add => _add.Address)
    //     //         .Include(_d => _d.SuppliersTypesPayments)
    //     //         .Include(_ctc => _ctc.Contact)
    //     //         .ThenInclude(_SocialNet => _SocialNet.socialnetworks);
    //     //     }

    //     //     return await Result.FirstOrDefaultAsync(_id => _id.Id == Id);
    //     // }
    //     public async Task<Inventory[]> GetAllInventoriesAsync()
    //     {
    //         IQueryable<Inventory> query = _context.Inventories
    //         .Include(_category => _category.Category)
    //         .AsNoTracking()
    //         .OrderBy(_CAT => _CAT.Category.Name);

    //         return await query.ToArrayAsync();

    //     }
    //     public async Task<Category[]> GetAllCategoryAsync()
    //     {
    //         IQueryable<Category> query = _context.Categories
    //         .AsNoTracking()
    //         .OrderBy(_category => _category.Name);
    //         return await query.ToArrayAsync();
    //     }
    //     // public async Task<Partner[]> GetAllPartner()
    //     // {
    //     //     IQueryable<Partner> query = _context.Partners
    //     //     .AsNoTracking()
    //     //     .Include(_contact => _contact.Contact)
    //     //     .ThenInclude(_socialNet => _socialNet.socialnetworks)
    //     //     .OrderBy(_partner => _partner.Name);
    //     //     return await query.ToArrayAsync();
    //     // }

    //     // public async Task<Partner> GetPartnerAsyncById(int Id, bool include)
    //     // {
    //     //     IQueryable<Partner> query = _context.Partners
    //     //     .AsNoTracking();

    //     //     if (include)
    //     //     {
    //     //         query = query
    //     //     .Include(_address => _address.Address)
    //     //     .Include(_contact => _contact.Contact)
    //     //     .ThenInclude(_socialNet => _socialNet.socialnetworks);
    //     //     }

    //     //     return await query.SingleAsync(_id => _id.Id == Id);

    //     // }


    // }
}