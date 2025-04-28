
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Entities.RemoteCmd.ReturnResults;

public class ResultExecutedCommand
{
    [JsonPropertyName("Id")]
    public int Id { get; set; }

    [JsonPropertyName("FilesPath")]
    public List<string> FilesPath { get; set; } = new();

    [JsonPropertyName("Subject")]
    public string Subject { get; set; } = string.Empty;

    [JsonPropertyName("Body")]
    public string Body { get; set; } = string.Empty;

    [JsonPropertyName("TargetId")]
    public int TargetId { get; set; }  

    [JsonPropertyName("Target")]  
    public Target Target { get; set; }    
}