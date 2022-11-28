using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using System.Net;
using Web_api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("Sql")));

//adds a jwt to the atorization in api, so oly autorized and valid jwt can make POST reguest
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(x =>
    {
        //h�r m�ste vi tala om vad som �r v�ran athotiry (dom�n) & vilken som �r v�ran audiens. Vi vill ha samma oaut0 som i recat projectet
        //vilken autority som anv�nds vid openid connect
        x.Authority = builder.Configuration["Auth0:Domain"];
        x.Audience = builder.Configuration["Auth0:Audience"];
        //
    });

builder.Services.AddCors(x =>
{
    //x.AddDefaultPolicy(policy =>
    //{
    //    policy.AllowAnyHeader();
    //    policy.AllowAnyMethod();
    //    policy.AllowAnyOrigin();
    //});

    //add a cors policy that makes only a specifik webbsite to access the api rout that a enable with this policy
    x.AddPolicy("react", policy =>
    {
        policy.WithHeaders("*");
        policy.WithMethods("POST", "GET", "PUT", "DELETE", "OPTIONS");
        policy.WithOrigins("http://localhost:3000");
    });
});
//builder.Services.Configure<CookiePolicyOptions>(x =>
//{
//    x.CheckConsentNeeded = context => true;
//    x.MinimumSameSitePolicy = SameSiteMode.None;

//});
var app = builder.Build();

//Kommer g� mot react, beh�ver d� godk�nna, annars funkar det inte
app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



//app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseHttpsRedirection();

//l�gg till autentication ovanf�r authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
