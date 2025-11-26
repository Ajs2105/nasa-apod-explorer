package com.nasaPod.nasapod.Model;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApodDTO implements Serializable {
    private String date;
    private String explanation;

    @JsonProperty("hdurl")
    private String hdUrl;

    @JsonProperty("media_type")
    private String mediaType;

    @JsonProperty("service_version")
    private String serviceVersion;

    private String title;
    private String url;
    private String copyright;
}
