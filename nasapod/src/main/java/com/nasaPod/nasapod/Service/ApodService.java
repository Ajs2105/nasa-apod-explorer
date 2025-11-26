package com.nasaPod.nasapod.Service;


import com.nasaPod.nasapod.Configuration.NasaApiProperties;
import com.nasaPod.nasapod.Model.ApodDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApodService {

    private final NasaApiProperties nasaApiProperties;
    private final RestTemplate restTemplate = new RestTemplate();
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Cacheable(value = "apodCache", key = "'today'")
    public ApodDTO getTodayApod() {
        log.info("Fetching today's APOD from NASA API");
        String url = buildUrl(null);
        return fetchApod(url);
    }

    @Cacheable(value = "apodCache", key = "#date")
    public ApodDTO getApodByDate(String date) {
        log.info("Fetching APOD for date: {}", date);
        String url = buildUrl(date);
        return fetchApod(url);
    }

    public List<ApodDTO> getRecentApods(int count) {
        log.info("Fetching {} recent APODs", count);
        List<ApodDTO> apods = new ArrayList<>();
        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < count; i++) {
            LocalDate targetDate = currentDate.minusDays(i);
            String dateString = targetDate.format(DATE_FORMATTER);

            try {
                ApodDTO apod = getApodByDate(dateString);
                if (apod != null) {
                    apods.add(apod);
                }
            } catch (Exception e) {
                log.warn("Failed to fetch APOD for date: {}", dateString, e);
            }
        }

        return apods;
    }

    private String buildUrl(String date) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(nasaApiProperties.getBaseUrl())
                .queryParam("api_key", nasaApiProperties.getKey());

        if (date != null && !date.isEmpty()) {
            builder.queryParam("date", date);
        }

        return builder.toUriString();
    }

    private ApodDTO fetchApod(String url) {
        try {
            ApodDTO apod = restTemplate.getForObject(url, ApodDTO.class);
            log.info("Successfully fetched APOD: {}", apod != null ? apod.getTitle() : "null");
            return apod;
        } catch (Exception e) {
            log.error("Error fetching APOD from NASA API", e);
            throw new RuntimeException("Failed to fetch APOD: " + e.getMessage(), e);
        }
    }
}
