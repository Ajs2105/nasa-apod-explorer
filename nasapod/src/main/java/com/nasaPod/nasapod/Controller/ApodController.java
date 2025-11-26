package com.nasaPod.nasapod.Controller;


import com.nasaPod.nasapod.Model.ApodDTO;
import com.nasaPod.nasapod.Service.ApodService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/apod")
@RequiredArgsConstructor
public class ApodController {

    private final ApodService apodService;

    @GetMapping("/today")
    public ResponseEntity<ApodDTO> getTodayApod() {
        log.info("GET /api/apod/today");
        try {
            ApodDTO apod = apodService.getTodayApod();
            return ResponseEntity.ok(apod);
        } catch (Exception e) {
            log.error("Error fetching today's APOD", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/date")
    public ResponseEntity<ApodDTO> getApodByDate(@RequestParam String date) {
        log.info("GET /api/apod/date?date={}", date);
        try {
            ApodDTO apod = apodService.getApodByDate(date);
            return ResponseEntity.ok(apod);
        } catch (Exception e) {
            log.error("Error fetching APOD for date: {}", date, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ApodDTO>> getRecentApods(
            @RequestParam(defaultValue = "10") int count) {
        log.info("GET /api/apod/recent?count={}", count);
        try {
            List<ApodDTO> apods = apodService.getRecentApods(Math.min(count, 30));
            return ResponseEntity.ok(apods);
        } catch (Exception e) {
            log.error("Error fetching recent APODs", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("NASA APOD Explorer API is running!");
    }
}
