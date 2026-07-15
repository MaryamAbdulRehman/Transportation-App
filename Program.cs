var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "TransportationAPI";
    config.Title = "TransportationAPI v1";
    config.Version = "v1";
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "TransportationAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapGet("/", () => "Hello World!");

//  Insert a new Route
app.MapPost("/CreateRoute", (Route route) =>
DbOperations.CreateRoute(route)
);


// Get all Routes

app.MapGet("/GetRoute ", () => DbOperations.GetRoutes());

// Remove a Route by Id

app.MapDelete("/RemoveRoute/{id}", (int id ) => DbOperations.RemoveRoute(id));

// update a Route by id

app.MapPut("/UpdateRoute/{id}", (int id ,Route newRoute) => DbOperations.UpdateRoute(id ,newRoute));





app.Run();
