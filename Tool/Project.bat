dotnet new sln --name Sonny.Web


dotnet new webapi --auth none -o Sonny.WebApi


dotnet new classlib -o Sonny.Domain
dotnet new classlib -o Sonny.Repository


dotnet sln add Sonny.Domain\Sonny.Domain.csproj
dotnet sln add Sonny.Repository\Sonny.Repository.csproj
dotnet sln add Sonny.WebApi\Sonny.WebApi.csproj


dotnet add Sonny.Repository\Sonny.Repository.csproj reference Sonny.Domain\Sonny.Domain.csproj
dotnet add Sonny.WebApi\Sonny.WebApi.csproj reference Sonny.Domain\Sonny.Domain.csproj
dotnet add Sonny.WebApi\Sonny.WebApi.csproj reference Sonny.Repository\Sonny.Repository.csproj


dotnet add Sonny.Repository\Sonny.Repository.csproj package Pomelo.EntityFrameworkCore.MySql
dotnet add Sonny.Repository\Sonny.Repository.csproj package Microsoft.EntityFrameworkCore.Tools

dotnet tool install --global dotnet-ef

start angular.bat

ng new Views
pause
npm install bootstrap --save
npm i @fortawesome/fontawesome-free --save 
npm install ngx-bootstrap --save