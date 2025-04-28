
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Services.Operations.RemoteCmd.Dtos;

public class ResultExecutedCommandDto

{
    [JsonPropertyName("FilesPath")]
    public List<string> FilesPath { get; set; } = new();
    
    [JsonPropertyName("Subject")]
    public string Subject { get; set; } = string.Empty;

    [JsonPropertyName("Body")]
    public string Body { get; set; } = string.Empty;
}