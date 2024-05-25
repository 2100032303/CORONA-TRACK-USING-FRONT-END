import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import Pikaday from 'pikaday';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomColor = () => {
        return `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, 0.2)`;
    };

    const generateData = () => {
        const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
        const data = [];
        const barColors = [];
        states.forEach(state => {
            const cases = getRandomInt(5000, 10000);
            const cured = getRandomInt(4000, 7000);
            const deaths = getRandomInt(2000, 4000);
            const vaccinated = getRandomInt(6000, 8000);
            data.push({ state, cases, cured, deaths, vaccinated });
            barColors.push(getRandomColor());
        });
        return { data, barColors };
    };

    const updateTable = (data) => {
        const tableBody = document.querySelector('#covidTable tbody');
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = `<tr>
                            <td>${item.state}</td>
                            <td class="orange">${item.cases}</td>
                            <td class="green">${item.cured}</td>
                            <td class="red">${item.deaths}</td>
                            <td class="yellow">${item.vaccinated}</td>
                        </tr>`;
            tableBody.innerHTML += row;
        });
    };

    const updateCharts = (data, barColors) => {
        const labels = data.map(item => item.state);
        const casesData = data.map(item => item.cases);
        const vaccinatedData = data.map(item => item.vaccinated);
        const deathsData = data.map(item => item.deaths);

        const barChart = new Chart(document.getElementById('barChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cases',
                    data: casesData,
                    backgroundColor: barColors,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        const pieChart = new Chart(document.getElementById('pieChart').getContext('2d'), {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Vaccinated',
                    data: vaccinatedData,
                    backgroundColor: barColors,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            }
        });

        const histogram = new Chart(document.getElementById('histogram').getContext('2d'), {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Deaths',
                    data: deathsData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    const refreshData = () => {
        if (selectedDate) {
            const { data, barColors } = generateData();
            updateTable(data);
            updateCharts(data, barColors);
        } else {
            alert("Please select a date first.");
        }
    };

    // Initialize Pikaday datepicker with today's date
    const picker = new Pikaday({
        field: document.getElementById('datepicker'),
        format: 'YYYY-MM-DD',
        onSelect: (date) => {
            setSelectedDate(date);
            document.getElementById('detailBtn').disabled = false;
        }
    });

    return (
        <div>
            <h2>COVID-19 Data</h2>
            <input type="text" id="datepicker" />
            <button id="detailBtn" onClick={refreshData} disabled>Detail</button>
            <br />
            <table id="covidTable">
                <thead>
                    <tr>
                        <th>State</th>
                        <th className="orange">Cases</th>
                        <th className="green">Cured</th>
                        <th className="red">Deaths</th>
                        <th className="yellow">Vaccinated</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Data will be dynamically generated here */}
                </tbody>
            </table>
            <h2>THE GRAPHICAL REPRESENTATION OF COVID STATE-WISE</h2>
            <canvas id="barChart" width="400" height="400"></canvas>
            <canvas id="pieChart" width="400" height="400"></canvas>
            <canvas id="histogram" width="400" height="400"></canvas>
        </div>
    );
};

export default Home;
