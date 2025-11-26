package com.nasaPod.nasapod.Configuration;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "nasa.api")
public class NasaApiProperties {
    private String baseUrl;
    private String key;
}