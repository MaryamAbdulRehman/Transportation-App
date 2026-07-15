using Microsoft.EntityFrameworkCore;

class TransportationDb : DbContext
{
    public TransportationDb(DbContextOptions<TransportationDb> options)
        : base(options) { }

    public DbSet<Route> Routes => Set<Route>();
    public DbSet<Fleet> Fleets => Set<Fleet>();

}