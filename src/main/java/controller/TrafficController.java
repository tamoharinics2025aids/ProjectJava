package controller;

import entity.TrafficEntity;
import service.TrafficService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traffic")
public class TrafficController {

    private final TrafficService service;

    public TrafficController(TrafficService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public TrafficEntity createTraffic(@RequestBody TrafficEntity traffic) {
        return service.createTraffic(traffic);
    }

    // READ ALL
    @GetMapping
    public List<TrafficEntity> getAllTraffic() {
        return service.getAllTraffic();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public TrafficEntity getTrafficById(@PathVariable Long id) {
        return service.getTrafficById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public TrafficEntity updateTraffic(
            @PathVariable Long id,
            @RequestBody TrafficEntity traffic) {

        return service.updateTraffic(id, traffic);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteTraffic(@PathVariable Long id) {

        service.deleteTraffic(id);

        return "Traffic record deleted successfully";
    }
}
