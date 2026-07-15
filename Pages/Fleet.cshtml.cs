using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

public class FleetModel : PageModel
{
    // private readonly TransportationDb _context;

    // public FleetModel(TransportationDb context)

    private readonly TransportationContext _context;
public FleetModel(TransportationContext context)
    {
        _context = context;
    }

    public IList<Fleet> Fleets { get; set; } = default!;
    public IList<Route> Routes { get; set; } = default!;

    [BindProperty]
    public Fleet Fleet { get; set; } = default!;

    public void OnGet()
    {
        Fleets = _context.Fleets.ToList();
        Routes = _context.Routes.ToList();
    }

    public string GetRouteName(int routeId)
    {
        var route = Routes.FirstOrDefault(r => r.Id == routeId);
        return route?.Name ?? "N/A";
    }

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        _context.Fleets.Add(Fleet);
        _context.SaveChanges();

        return RedirectToPage();
    }

    public IActionResult OnDeleteAsync(int id)
    {
        var vehicle = _context.Fleets.Find(id);
        if (vehicle != null)
        {
            _context.Fleets.Remove(vehicle);
            _context.SaveChanges();
        }

        return RedirectToPage();
    }
}
