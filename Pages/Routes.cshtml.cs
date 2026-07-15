using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class RoutesModel : PageModel
{
    // private readonly TransportationDb _context;

    // public RoutesModel(TransportationDb context)

    private readonly TransportationContext _context;
public RoutesModel(TransportationContext context)
    {
        _context = context;
    }

    public IList<Route> Routes { get; set; } = default!;
    [BindProperty]
    public Route Route { get; set; } = default!;

    public void OnGet()
    {
        Routes = _context.Routes.ToList();
    }

    public IActionResult OnPostAdd()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        _context.Routes.Add(Route);
        _context.SaveChanges();

        return RedirectToPage();
    }

    public IActionResult OnPostDelete(int id)
    {
        var route = _context.Routes.Find(id);
        if (route != null)
        {
            _context.Routes.Remove(route);
            _context.SaveChanges();
        }

        return RedirectToPage();
    }
}
