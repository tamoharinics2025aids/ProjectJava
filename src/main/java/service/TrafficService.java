package service;

import entity.TrafficEntity;
import repository.TrafficRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrafficService {

    private final TrafficRepository repository;

    public TrafficService(TrafficRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public TrafficEntity createTraffic(TrafficEntity traffic) {
        return repository.save(traffic);
    }

    // READ ALL
    public List<TrafficEntity> getAllTraffic() {
        return repository.findAll();
    }

    // READ BY ID
    public TrafficEntity getTrafficById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Traffic record not found with ID: " + id));
    }

    // UPDATE
    public TrafficEntity updateTraffic(Long id, TrafficEntity traffic) {

        TrafficEntity existingTraffic = getTrafficById(id);

        existingTraffic.setDensityLevel(traffic.getDensityLevel());
        existingTraffic.setVehicleCount(traffic.getVehicleCount());

        return repository.save(existingTraffic);
    }

    // DELETE
    public void deleteTraffic(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Traffic record not found with ID: " + id);
        }

        repository.deleteById(id);
    }
}
