package entity;

import jakarta.persistence.*;

@Entity
@Table(name = "traffic_density")
public class TrafficEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String densityLevel;

    private Integer vehicleCount;

    // Default constructor
    public TrafficEntity() {
    }

    // Get ID
    public Long getId() {
        return id;
    }

    // Get density level
    public String getDensityLevel() {
        return densityLevel;
    }

    // Set density level
    public void setDensityLevel(String densityLevel) {
        this.densityLevel = densityLevel;
    }

    // Get vehicle count
    public Integer getVehicleCount() {
        return vehicleCount;
    }

    // Set vehicle count
    public void setVehicleCount(Integer vehicleCount) {
        this.vehicleCount = vehicleCount;
    }
}
