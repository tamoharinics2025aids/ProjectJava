const API_URL = "/api/traffic";


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });


    document.getElementById(sectionId).classList.add("active");


    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        item.classList.remove("active");
    });


    event.target.classList.add("active");


    if (sectionId === "dashboard" ||
        sectionId === "reports") {

        loadTraffic();
    }
}



// ==========================================
// LOAD TRAFFIC DATA FROM SPRING BOOT
// ==========================================

async function loadTraffic() {

    try {

        const response = await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Unable to connect to traffic API"
            );

        }


        const trafficData = await response.json();


        displayTrafficData(trafficData);


    } catch (error) {

        console.error(error);

        document.getElementById("trafficTable").innerHTML = `
            <tr>
                <td colspan="4">
                    Unable to load traffic data.
                    Please check whether Spring Boot is running.
                </td>
            </tr>
        `;
    }
}



// ==========================================
// DISPLAY TRAFFIC DATA
// ==========================================

function displayTrafficData(trafficData) {

    const table =
        document.getElementById("trafficTable");


    table.innerHTML = "";


    let highCount = 0;

    let mediumCount = 0;

    let lowCount = 0;

    let totalVehicles = 0;


    trafficData.forEach(traffic => {

        totalVehicles += traffic.vehicleCount;


        let status = "";

        let densityClass = "";


        if (traffic.densityLevel === "VERY_HIGH") {

            highCount++;

            status = "Critical";

            densityClass = "density-very-high";

        }

        else if (traffic.densityLevel === "HIGH") {

            highCount++;

            status = "High Congestion";

            densityClass = "density-high";

        }

        else if (traffic.densityLevel === "MEDIUM") {

            mediumCount++;

            status = "Moderate";

            densityClass = "density-medium";

        }

        else {

            lowCount++;

            status = "Normal";

            densityClass = "density-low";

        }


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${traffic.id}</td>

            <td class="${densityClass}">
                ${traffic.densityLevel}
            </td>

            <td>
                ${traffic.vehicleCount}
            </td>

            <td class="${densityClass}">
                ${status}
            </td>

        `;


        table.appendChild(row);

    });


    // Dashboard values

    document.getElementById("totalRecords")
        .textContent = trafficData.length;


    document.getElementById("highTraffic")
        .textContent = highCount;


    document.getElementById("mediumTraffic")
        .textContent = mediumCount;


    document.getElementById("lowTraffic")
        .textContent = lowCount;


    // Report values

    document.getElementById("reportTraffic")
        .textContent = trafficData.length;


    document.getElementById("totalVehicles")
        .textContent = totalVehicles;


    document.getElementById("reportHigh")
        .textContent = highCount;
}



// ==========================================
// ADD TRAFFIC RECORD
// ==========================================

document.getElementById("trafficForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const densityLevel =
            document.getElementById("densityLevel").value;


        const vehicleCount =
            Number(
                document.getElementById("vehicleCount").value
            );


        const message =
            document.getElementById("formMessage");


        try {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        densityLevel: densityLevel,

                        vehicleCount: vehicleCount

                    })
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to create traffic record"
                );

            }


            const result = await response.json();


            message.style.color = "#16a34a";

            message.textContent =
                "Traffic record added successfully. ID: "
                + result.id;


            document.getElementById("trafficForm")
                .reset();


            loadTraffic();


        } catch (error) {

            console.error(error);

            message.style.color = "#dc2626";

            message.textContent =
                "Failed to add traffic record.";

        }

    });



// ==========================================
// DYNAMIC TOLL CALCULATION
// ==========================================

function calculateToll() {

    const baseRate =
        Number(
            document.getElementById("baseRate").value
        );


    const density =
        document.getElementById("tollDensity").value;


    if (!baseRate || baseRate <= 0) {

        alert("Please enter a valid base toll rate.");

        return;
    }


    let multiplier = 1;


    if (density === "LOW") {

        multiplier = 1.0;

    }

    else if (density === "MEDIUM") {

        multiplier = 1.2;

    }

    else if (density === "HIGH") {

        multiplier = 1.5;

    }

    else if (density === "VERY_HIGH") {

        multiplier = 2.0;

    }


    const totalToll =
        baseRate * multiplier;


    document.querySelector(
        "#tollResult h3"
    ).textContent =
        "₹ " + totalToll.toFixed(2);


    document.querySelector(
        "#tollResult p"
    ).textContent =
        density +
        " Traffic | Multiplier: " +
        multiplier +
        "×";

}



// ==========================================
// LOAD DATA WHEN PAGE OPENS
// ==========================================

window.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTraffic();

    }
);