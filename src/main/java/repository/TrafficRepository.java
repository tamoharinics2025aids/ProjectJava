package repository;

import entity.TrafficEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficRepository extends JpaRepository<TrafficEntity, Long> {
}
