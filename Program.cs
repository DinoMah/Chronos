using Chronos.Data;
using Chronos.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;

Log.Logger = new LoggerConfiguration()
  .Enrich.FromLogContext()
  .WriteTo.Debug()
  .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
  .CreateLogger();

try
{
  var builder = WebApplication.CreateBuilder(args);

  var key = Encoding.ASCII.GetBytes(builder.Configuration["JWT:Key"] ?? "");
  builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
      };
    });
  builder.Services.AddAuthorization();

  var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";

  // Repositories
  builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
  builder.Services.AddScoped<ITaskRepository, TaskRepository>();

  // Services
  builder.Services.AddScoped<IUserService, UserService>();
  builder.Services.AddScoped<IAreaService, AreaService>();
  builder.Services.AddScoped<IProjectService, ProjectService>();
  builder.Services.AddScoped<IPeriodService, PeriodService>();
  builder.Services.AddScoped<ITaskService, TaskService>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<IAreaService, AreaService>();
    builder.Services.AddScoped<IRoleService, RoleService>();

  // Add services to the container.

  builder.Services.AddControllers();
  // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
  builder.Services.AddEndpointsApiExplorer();
  builder.Services.AddSwaggerGen();
  builder.Services.AddCors(options =>
  {
    options.AddPolicy("AllowVite", builder => {
      builder.WithOrigins("http://localhost:3000")
             .AllowAnyMethod()
             .AllowAnyHeader();
    });
  });
  builder.Services.AddSerilog();

  var app = builder.Build();

  // Configure the HTTP request pipeline.
  if (app.Environment.IsDevelopment())
  {
    app.UseSwagger();
    app.UseSwaggerUI();
  }

  app.UseHttpsRedirection();
  app.UseAuthentication();
  app.UseAuthorization();
  // Habilita CORS
  app.UseCors("AllowVite");
  // Sirve archivos estáticos desde wwwroot
  app.UseStaticFiles();
  // Ejemplo de endpoint
  app.MapGet("/api/hello", () => "Hello from .NET API!");
  app.MapControllers();
  app.Run();
}
catch (Exception ex)
{
  Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
  Log.CloseAndFlush();
}