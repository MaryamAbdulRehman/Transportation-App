using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    // private readonly TransportationDb _context;

    // public IndexModel(TransportationDb context)

    private readonly TransportationContext _context;
public IndexModel(TransportationContext context)
    {
        _context = context;
    }

    public IList<Route> Routes { get; set; } = default!;
    public IList<Fleet> Fleets { get; set; } = default!;

    public void OnGet()
    {
        Routes = _context.Routes.ToList();
        Fleets = _context.Fleets.ToList();
    }

    public string GetRouteName(int routeId)
    {
        var route = Routes.FirstOrDefault(r => r.Id == routeId);
        return route?.Name ?? "N/A";
    }

    public double GetTotalDistance()
    {
        return Routes.Sum(r => r.Distance);
    }
}
