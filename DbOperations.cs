public class DbOperations
{
    public static TransportationContext db = new TransportationContext();
    public static Route CreateRoute(Route route)
    {
        db.Routes.Add(route);
        db.SaveChanges();
        return route;
    }

    // Get all Routes
    public static List<Route> GetRoutes()
    {
        return db.Routes.ToList();
    }

    // Remove a Route By Id

    public static Route? RemoveRoute(int id)
    {
        var route = db.Routes.Find(id);
        if (route != null)
        {
            db.Routes.Remove(route);
            db.SaveChanges();
            return route;
        }
        return route;
    }
    // Update a Route by Id

    public static Route? UpdateRoute(int id, Route newRoute)
    {
        var existingRoute = db.Routes.Find(id);
        if (existingRoute != null)
        {
            existingRoute.Name = newRoute.Name;
            db.SaveChanges();
            return existingRoute;
        }
        return existingRoute;
}
 
}