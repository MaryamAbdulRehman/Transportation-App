using Microsoft.EntityFrameworkCore;

public class TransportationContext : DbContext
{
    public DbSet<Route> Routes { get; set; }
    public DbSet<Fleet> Fleets { get; set; }

    public string DbPath { get; }

    public TransportationContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "Transportation.db");
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}